// 파일업로드 라이브러리
import multer from "multer";
// DB
import { connectDB } from "../../../utils/database";
// 구글 클라우드 스토리지
import { Storage } from "@google-cloud/storage";
import { createRouter } from "next-connect";

// path 라이브러리를 사용해서 확장명을 가져옴
import path from "path";

// 구글 스토리지 사용법
// https://cloud.google.com/appengine/docs/flexible/nodejs/using-cloud-storage?hl=ko

// 구글 스토리지
const storage = new Storage({
    projectId : process.env.GCS_PROJECTID,
    credentials : {
        client_email : process.env.GCS_CLIENT_EMAIL,
        private_key : process.env.GCS_PRIVATE_KEY?.split(String.raw`\n`).join("\n")
    }
});

// 구글 버킷
const bucket = storage.bucket(`${process.env.GCLOUD_STORAGE_BUCKET}`);

// nextConnect() 라는 모듈을 사용해서 미들웨어 넣기
const router = createRouter();

// multer 설정
const upload = multer({
    storage : multer.memoryStorage(),
    limits : {
        fieldSize : 5 * 1024 * 1024 // 5MB 제한
    }
})

router
.use(upload.single('file'))
.use((req,res,next)=>{

    // 파일이미지 URL    

    // 파일이 존재할경우
    if(req.file){

        const ext = path.extname(req.file.originalname);
        
        const now = Date.now();

        // 파일 업로드 지정하는 방법 경로/파일이름
        // 파일명 변경
        const blob = bucket.file(
            `sns/user/${path.basename(req.file.originalname,ext) + now + ext}`
        );
        
        // 파일 업로드 상태 생성
        const blobStream = blob.createWriteStream();
    
        // 에러가 발생했을경우
        blobStream.on('error',err=>{
            console.log(err);
            res.json({
                suc : false,
                msg : "사진 업로드하는데 오류가 발생했습니다."
            })
        })
    
        // 성공을 했을경우
        blobStream.on('finish', ()=>{

            let publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
            req.publicUrl = publicUrl;

            next();

        });
    
        blobStream.end(req.file.buffer);
    
    }else{

        next();

    }

})
.post(async (req,res)=>{


    // db연결
    const db = (await connectDB).db('sns');
    // db 컬렉션 연결
    const user = db.collection('user');

    /* 
        프론트에서 보내준 데이터 가져오기
        sns 이름 과 이메일을 보낸 이유는 나중에 체크를 위해서 
    */
    let {
        snsname,
        snsEmail,
        username,
        content,
        profileImage
    } = req.body;

    // username이 존재하는지 확인
    const get = await user.findOne({'username' : username});

    // 파일을 업로드 했을경우 파일주소를 업로드한 주소로 변경
    if(req.publicUrl != undefined){

        profileImage = req.publicUrl;

    }

    if(get === null){ // 유저가 없을경우

        const result =  await user.insertOne({
            snsname,
            snsEmail,
            username,
            content,
            profileImage
        });

        if(result){ 

            res.status(200).json({
                suc : true,
                msg : "가입이 완료 되었습니다.",
            })

        }

    }else{ // 유저가 존재할경우

        res.status(200).json({
            suc : false,
            msg : "이미 존재하는 유저명 입니다.",
            type : "userExist"
        })

    }

})




export default router.handler();

// bodyparser 를 꺼야 form-data 를 가져오기 쉬움
export const config = {
    api : {
        bodyParser : false
    }
}
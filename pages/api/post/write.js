import { Storage } from "@google-cloud/storage";
import multer from "multer";
import {createRouter} from "next-connect";
import { connectDB } from "../../../utils/database";
import path from "path";


// 구글 스토리지
const storage = new Storage({
    projectId : process.env.GCS_PROJECTID,
    credentials : {
        client_email : process.env.GCS_CLIENT_EMAIL,
        private_key : process.env.GCS_PRIVATE_KEY?.split(String.raw`\n`).join("\n")
    }
});

//  구글 버킷
const bucket = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET);

//  nextConnect() 라는 모듈을 이용
const router = createRouter();

// multer를 이용한 파일 업로드
const upload = multer({
    storage : multer.memoryStorage(),
    limits : {
        fieldSize : 5 * 1024 * 1024
    }
});

// 미들웨어를 편하게 사용하기 위해서 next-connect 라는 모듈이라는것을 발견해서 사용함
router
.use(upload.single('file'))
.use((req,res,next)=>{

    // 파일이 없을경우 오류 발생
    if(!req.file){
        return res.json({
            suc : false,
            msg : "사진을 업로드 해야합니다."
        })
    }

    // 파일명 변경
    const ext = path.extname(req.file.originalname);
    const now = Date.now();

    // 버킷에 파일 업로드
    const blob = bucket.file(
        `sns/post/${path.basename(req.file.originalname,ext) + now + ext}`
    );

    // 업로드 상태
    const blobStream = blob.createWriteStream();

    // 에러가 발생했을경우
    blobStream.on('error',err=>{
        console.log(err);
        res.json({
            suc : false,
            msg : "사진 업로드하는데 오류가 발생했습니다."
        })
    });

    blobStream.on('finish',()=>{
        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;

        // 파일명 전송
        req.publicUrl = publicUrl;

        next();
    });

    blobStream.end(req.file.buffer);

})
.post( async (req,res)=>{

    try {
        //  DB
        const db = (await connectDB).db('sns');
        const post = await db.collection('post');
        const user = await db.collection('user');

        let {username,content,filter} = req.body;

        const resultUser = await user.findOne({username : username});

        const result = await post.insertOne({
            username : resultUser.username,
            desc : content,
            imgURL : req.publicUrl,
            filter,
            like : 0,
            write : new Date()
        });

        if(result){
            res.status(200).json({
                suc : true,
                msg : "게시글이 등록 되었습니다."
            })
        }
    }
    catch(e){
        console.log(e);
        res.status(500).json({
            suc : false,
            msg : "오류가 발생했습니다."
        })
    }

});

export default router.handler();

// NextJS에서 파일업로드를 할때 bodyParser 를 꺼줘야 제대로 작동함
export const config = {
    api: {
      bodyParser: false, // Disallow body parsing, consume as stream
    },
};

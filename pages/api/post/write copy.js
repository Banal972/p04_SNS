import { Storage } from "@google-cloud/storage";
import multer from "multer";

//  DB

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

// multer를 이용한 파일 업로드
const upload = multer({
    storage : multer.memoryStorage(),
    limits : {
        fieldSize : 5 * 1024 * 1024
    }
});

// NEXTJS에서 multer 같은 파일 업로드용 라이브러리를 사용할때 bodyParser 미들웨어를 막고 직접요청을 처리함
export const config = {
    api: {
        bodyParser: false,
    },
};

// 업로드는 성공했는데 bodyParser를 막아서 formData를 가져오기 힘듬.. 다른걸 생각해봐야할것 같음
export default async function handler(req,res){

    if( req.method == "POST" ){

        try {
            await new Promise((resolve,reject)=>{
                upload.single("file")(req,res,(err)=>{
                    if(err) return reject(err);
                    resolve();
                })
            });

            const blob = bucket.file(req.file.originalname);
            const blobStream = blob.createWriteStream();

            blobStream.on('error',err=>{
                console.error(err);
            });

            blobStream.on('finish',()=>{
                const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;

                res.status(200).json({
                    suc : true,
                    path : publicUrl,
                })

            });

            blobStream.end(req.file.buffer);

        } catch (err){
            console.log(err);
            res.status(500).json({
                suc : false,
                error : "서버 오류 발생"
            })
        }

    }


}
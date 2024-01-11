import { Storage } from "@google-cloud/storage";
import multer from "multer";
import {createRouter} from "next-connect";
import { connectDB } from "../../../utils/database";


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
.post( async (req,res)=>{

    //  DB
    const db = (await connectDB).db('sns');
    const post = await db.collection('post');

    const blob = bucket.file(req.file.originalname);
    const blobStream = blob.createWriteStream();

    blobStream.on('error',err=>{
        console.log(err);
    });

    blobStream.on('finish',()=>{
        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;

        const {content,filter} = req.body;

        post.insertOne({
            user_id : session.user.name,
            like : 0,
            desc : content,
            imgURL : publicUrl,
            filter,
            write : new Date()
        })

        res.status(200).json({
            suc : true,
            msg : "게시글이 등록 되었습니다."
        })

    });

    blobStream.end(req.file.buffer);

});

export default router.handler();

// NextJS에서 파일업로드를 할때 bodyParser 를 꺼줘야 제대로 작동함
export const config = {
    api: {
      bodyParser: false, // Disallow body parsing, consume as stream
    },
};

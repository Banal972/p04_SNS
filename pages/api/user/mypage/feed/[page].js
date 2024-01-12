import { connectDB } from "../../../../../utils/database";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]";


export default async function handler(req,res) {

    // 페이지
    let {page} = req.query;
    page = parseInt(page);

    // 로그인 세션 가져오기
    let session = await getServerSession(req,res,authOptions);

    // db 연결
    let db = (await connectDB).db('sns');
    // 세션을 이용해서 user 이름 가져오기
    let user = await db.collection('user').findOne({snsname : session.user.name, snsEmail : session.user.email});

    if(req.method === "GET"){

        try {

            // feed 가져오기
            let feed = await db.collection('post').find({username : "Kim Ji Yu"}).sort({_id : -1}).skip((page - 1) * 9).limit(9).toArray();

            // feed를 가져오면
            if(feed){

                // 내보내기
                res.status(200).json({
                    suc : true,
                    data_result : feed,
                    user : user,
                });

            }else{

                // 데이터 오류
                res.status(400).json({
                    suc : false,
                    msg : "데이터를 가져오는데 실패했습니다."
                });

            }

        }catch(e){
            console.log(e);
            res.status(404).json({
                suc : false,
                msg : "에러가 발생했습니다."
            });
        }

    }
    

    
}
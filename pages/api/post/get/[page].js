// next-auth 에서 세션을 가져옵니다.
import { getServerSession } from "next-auth";
// DB
import { connectDB } from "../../../../utils/database";
// NextAuth 옵션 기능 가져옵니다.
import { authOptions } from "../../auth/[...nextauth]";

export default async function handler(req,res){

    let {page} = req.query;
    page = parseInt(page); // 문자열을 숫자열로 변경

    // 지금 로그인되어있는 session 가져오기
    let session = await getServerSession(req,res,authOptions);

    // db 연결
    const db =  (await connectDB).db('sns');
    // 값 가져오기
    let result = await db.collection('post').find().sort({_id : -1}).skip((page - 1) * 5).limit(5).toArray(); // 5개씩 불러올거라서 page 가 1 페이지 일경우 skip 할거 0개 2페이지일경우 skip할거 5개
    // 유저 데이터 가져오기
    let user_result = await db.collection('user').find().toArray();

    if(req.method == "GET"){

        try {

            if(result){

                /* 
                    post 의 데이터를 가져와서 user 의 데이터와 비교해 같은 username 일경우
                    user의 profileImage를 post 객체에 저장해서 return 해줍니다.
                */
                result = result.map((a)=>{ 

                    user_result.map(b=>{

                    if(a.username == b.username){

                        a.profileImage = b.profileImage;
                        return b;

                    }

                    });

                    // objectId 라는 클래스 안에 들어있어 그것을 문자열로 수정해서 return
                    a._id = a._id.toString();

                    return a;
                    
                });

                let loginUser = null
                if(session){
                    loginUser = await db.collection('user').findOne({username : session.user.name});
                }  


                res.status(200).json({
                    suc : true,
                    data_result : result,
                    username : loginUser ? loginUser.username : loginUser
                });

            }else{
                res.status(400).json({
                    suc : false,
                    msg : "데이터를 가져오는데 실패하였습니다."
                });
            }

        }
        catch(e){
            console.log(e);
            res.status(404).json({
                suc : false,
                msg : "오류가 발생했습니다."
            });
        }


    }

}
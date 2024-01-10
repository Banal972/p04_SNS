import { connectDB } from "../../../utils/database";

export default async function handler(req,res) {

    // db연결
    const db = (await connectDB).db('sns');
    // db 컬렉션 연결
    const user = db.collection('user');

    //method 가 post 일 경우
    if(req.method === "POST"){

        // 프론트에서 보내준 데이터 가져오기

        // sns 이름 과 이메일을 보낸 이유는 나중에 체크를 위해서
        const {
            snsname,
            snsEmail,
            username,
            content,
            profileImage
        } = req.body;

        // username이 존재하는지 확인
        const get = await user.findOne({'username' : username});

        if(get === null){

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

        }else{

            res.status(200).json({
                suc : false,
                msg : "이미 존재하는 유저명 입니다.",
                type : "userExist"
            })

        }




    }


}
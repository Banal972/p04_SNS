import mysql from "mysql2/promise";
import { cookies } from "next/headers";

export async function GET(){

    try {

        const cookieStore = await cookies();
        const saveid = await cookieStore.get('saveid');

        if(saveid){
            return Response.json(saveid.value);
        }else{
            return Response.json("");
        }

    }
    catch(e){
        console.error(e);
    }

}

export async function POST(request) {

    const bcrypt = require('bcrypt');

    try {

        // DB 연결
        const db = await mysql.createConnection({
            host : process.env.DB_HOST,
            user : process.env.DB_USER,
            password : process.env.DB_PW,
            database : process.env.DB_DATABASE
        });

        // 데이터 가져옴
        const res = await request.json();

        const [result] = await db.query('SELECT * from user_table where userid = ?',res.ids);

        if(result.length <= 0 && !result){
            return Response.json({
                suc : false,
                msg : "아이디 혹은 비밀번호가 다릅니다."
            });
        }

        const getData = result[0];

        const match = await bcrypt.compare(res.pw,getData.userpw);

        if(match){

            const userData = {
                id : getData.userid,
                name : getData.name,
                icon : getData.icon
            }

            if(res.check){
                cookies().set(
                    'saveid',
                    getData.userid,
                    {secure: true}
                )
            }

            cookies().set(
                "sns_u",
                JSON.stringify(userData),
                {secure : true}
            )

            return Response.json({
                suc : true,
                msg : "로그인 되었습니다."
            });

        }else{

            return Response.json({
                suc : false,
                msg : "아이디 혹은 비밀번호가 다릅니다"
            });

        }

    }catch(e){
        console.log(e);
    }


}
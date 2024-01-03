import mysql from "mysql2/promise";

export async function POST(request){

    const bcrypt = require('bcrypt');

    try {
        // DB 연결
        const db = await mysql.createConnection({
            host : process.env.DB_HOST,
            user : process.env.DB_USER,
            password : process.env.DB_PW,
            database : process.env.DB_DATABASE
        });

        const {pw,seq} = await request.json();

        const hash_pw = await bcrypt.hash(pw,10);

        const [result] = await db.query("update user_table set userpw = ? where seq = ?",[hash_pw,seq]);

        if(result){

            return Response.json({
                suc : true,
                msg : "비밀번호가 변경되었습니다"
            })

        }else{

            return Response.json({
                suc : false,
                msg : "비밀번호에 실패하였습니다"
            })

        }

    }
    catch(e){
        console.error(e);

        return Response.json({
            suc : false,
            msg : "에러가 발생했습니다"
        })

    }

}
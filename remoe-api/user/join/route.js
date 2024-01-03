import mysql from "mysql2/promise";

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

        // 데이터 가져오기
        const res = await request.json();


        // 아이디 찾기
        const [idCount] = await db.query('SELECT userid from user_table where userid = ?',res.id);
        
        if(idCount.length > 0 && idCount){

            return Response.json({
                suc : false,
                msg : "아이디가 이미 존재합니다."
            });

        }

        const pw_hash = await bcrypt.hash(res.pw, 10);

        const data = {
            userid : res.id,
            userpw : pw_hash,
            email : res.email,
            name : res.name
        };
        
        // SQL 연결
        const [results] = await db.query('insert into user_table set ?',data);

        if(results){
            return Response.json({
                suc : true,
                msg : "회원가입에 완료되었습니다."
            });
        }

    }
    catch(e){
        console.error(e);
    }

}
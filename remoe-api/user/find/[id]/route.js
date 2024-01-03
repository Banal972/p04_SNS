import mysql from "mysql2/promise";

export async function POST(request,{ params }) {

    try {

        // DB 연결
        const db = await mysql.createConnection({
            host : process.env.DB_HOST,
            user : process.env.DB_USER,
            password : process.env.DB_PW,
            database : process.env.DB_DATABASE
        });

        if(params.id == "id"){

            const {name, email} = await request.json();

            const [result] = await db.query('select userid from user_table where name = ? and email = ?',[name,email]);

            if(result.length > 0 && result){
                const {userid} = result[0];
                return Response.json({
                    suc : true,
                    msg : `아이디는 ${userid} 입니다`
                });
            }else{
                return Response.json({
                    suc : false,
                    msg : `계정이 존재하지 않습니다`
                });
            }

        }else{

            const {ids, email} = await request.json();

            const [result] = await db.query('select seq from user_table where userid = ? and email = ?',[ids,email]);

            if(result.length > 0 && result){
                
                return Response.json({
                    suc : true,
                    info : result[0].seq
                });

            }else{

                return Response.json({
                    suc : false,
                    msg : `계정이 존재하지 않습니다`
                });

            }
            
        }

    }
    catch(e){
        console.error(e);
    }

}
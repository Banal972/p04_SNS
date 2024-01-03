import mysql from "mysql2/promise";

export async function GET(){

    try {
        
        // DB 연결
        const db = await mysql.createConnection({
            host : process.env.DB_HOST,
            user : process.env.DB_USER,
            password : process.env.DB_PW,
            database : process.env.DB_DATABASE
        });

        const [data] = await db.query('SELECT * from data_table limit 0 , 10');
        return Response.json(data);

    }
    catch(e){
        console.error(e);
    }

}
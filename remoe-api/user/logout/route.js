import { cookies } from "next/headers";

export async function POST() {

    try {

        cookies().delete('sns_u');

        return Response.json({
            suc : true,
            msg : "로그아웃 되었습니다"
        })

    }catch(e){
        console.log(e);
    }


}
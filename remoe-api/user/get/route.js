import { cookies } from "next/headers";

export async function GET(){

    const cookieStore = cookies();
    const data = cookieStore.get('sns_u');

    if(data){
        return Response.json(data);
    }else{
        return Response.json("");
    }

}
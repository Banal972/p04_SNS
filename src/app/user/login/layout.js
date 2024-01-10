import { getServerSession } from "next-auth";
import { authOptions } from "../../../../pages/api/auth/[...nextauth]";
import { redirect } from "next/navigation";
import { connectDB } from "../../../../utils/database";

export default async function layout({children}){

    let session = await getServerSession(authOptions);

    if(session){

      let db = (await connectDB).db('sns');
      let reulst = await db.collection('user').findOne({username : session?.user.name});

      if(reulst == null){

        redirect('/user/join');

      }else{

        redirect('/user/mypage');

      }

    }

  return (
    <>
        {children}
    </>
  )
}

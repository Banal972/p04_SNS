import { getServerSession } from "next-auth";
import { authOptions } from "../../../pages/api/auth/[...nextauth]";
import { connectDB } from "../../../utils/database";
import { redirect } from "next/navigation";

export default async function layout({children}) {

    let session = await getServerSession(authOptions);

    if(!session){
        redirect('/user/login');
    }

  return (
    <>
        {children}
    </>
  )
}

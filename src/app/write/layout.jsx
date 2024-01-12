// 세션데이터
import { getServerSession } from "next-auth";
// 세션 옵션
import { authOptions } from "../../../pages/api/auth/[...nextauth]";
// 리다이렉트
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

// 세션데이터
import { getServerSession } from "next-auth";
// 세션 옵션
import { authOptions } from "../../../pages/api/auth/[...nextauth]";
// 리다이렉트
import { redirect } from "next/navigation";

export default async function layout({children}) {

    // 세션가져오기
    let session = await getServerSession(authOptions);

    // 세션이 없으면 리다이렉트
    if(!session){
        redirect('/user/login');
    }

  return (
    <>
        {children}
    </>
  )
}

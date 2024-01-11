import Post from "../../client/main/Post";
// DB
import { connectDB } from "../../utils/database";
// NextAuth 옵션 기능 가져옵니다.
import { authOptions } from "../../pages/api/auth/[...nextauth]";
// next-auth 에서 세션을 가져옵니다.
import { getServerSession } from "next-auth";

export default async function Home() {
  
  const db = (await connectDB).db('sns');
  // post 의 데이터를 가져옵니다
  let result = await db.collection('post').find().sort({"id": -1}).toArray();
  // user의 데이터를 가져옵니다
  let user_result = await db.collection('user').find().toArray();

  /* 
    post 의 데이터를 가져와서 user 의 데이터와 비교해 같은 username 일경우
    user의 profileImage를 post 객체에 저장해서 return 해줍니다.
  */
  result = result.map((a)=>{ 

    user_result.map(b=>{

      if(a.username == b.username){

        a.profileImage = b.profileImage;
        return b;

      }

    });

    // objectId 라는 클래스 안에 들어있어 그것을 문자열로 수정해서 return
    a._id = a._id.toString();

    return a;
    
  });
  
  // 지금 로그인되어있는 session 가져오기
  let session = await getServerSession(authOptions);

  return (
    <ul className="feed">

      {
        // 피드를 출력
        result.map((e,i)=><Post e={e} key={i} user={session?.user.name}/>)
      }

    </ul>
  )

}
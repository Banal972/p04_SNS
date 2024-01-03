import Post from "../../client/main/Post";
import { connectDB } from "../../utils/database";
import { authOptions } from "../../pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

export default async function Home() {
  
  const db = (await connectDB).db('sns');
  const reuslt = await db.collection('post').find().toArray();
  let session = await getServerSession(authOptions);

  return (
    <ul className="feed">

      {
        reuslt.map((e,i)=><Post e={e} key={i} session={session?.user}/>)
      }

    </ul>
  )
}



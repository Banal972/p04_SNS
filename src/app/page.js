import Post from "../../client/main/Post";
import { connectDB } from "../../utils/database";
import { authOptions } from "../../pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

export default async function Home() {
  
  const db = (await connectDB).db('sns');
  let result = await db.collection('post').find().sort({"id": -1}).toArray();
  result = result.map((a)=>{
    a._id = a._id.toString()
    return a
  })
  let session = await getServerSession(authOptions);

  return (
    <ul className="feed">

      {
        result.map((e,i)=><Post e={e} key={i} session={session?.user}/>)
      }

    </ul>
  )
}



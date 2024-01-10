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

  let user = await db.collection('user').findOne(
    {snsname : session.user.name, snsEmail : session.user.email },
    {_id : 1, snsname : 0, snsEmail : 0, username : 0, content : 0, profileImage : 0}
  );

  console.log(user);

  return (
    <ul className="feed">

      {
        result.map((e,i)=><Post e={e} key={i} user={user}/>)
      }

    </ul>
  )
}



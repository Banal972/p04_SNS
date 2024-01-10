import { getServerSession } from "next-auth"
import { authOptions } from "../../../../pages/api/auth/[...nextauth]"
import Logout from "../../../../client/Mypage/Logout";
import { connectDB } from "../../../../utils/database";
import Feed from "../../../../client/Mypage/Feed";

export default async function page() {

  let session = await getServerSession(authOptions);

  let db = (await connectDB).db('sns');
  let user = await db.collection('user').findOne({snsname : session.user.name, snsEmail : session.user.email});

  let feed = await db.collection('post').find({username : user.username}).toArray();

  return (
    <div className="mypage">

      <div className="profile">
        
        <div className="lbx">
          <div className="user-img" style={{backgroundImage : `url(${user?.profileImage})`}}></div>
          <div className="btn-box">
            <button>이미지 변경</button>
            <Logout/>
          </div>
        </div>
        
        <div className="rbx">
          
          <div className="input-box">
            <label htmlFor="name">유저명</label>
            <input type="text" name="name" defaultValue={user?.username}/>
          </div>
          
          <div className="input-box">
            <label htmlFor="content">소개</label>
            <textarea name="content" defaultValue={user?.content} />
          </div>

        </div>

      </div>

      <div className="change-btn">
        <button>프로필 수정</button>
      </div>

      <p className="feed-name">피드</p>
      <Feed feed={feed}/>

    </div>
  )
}

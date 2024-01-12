// DB
import Feed from "../../../../../client/Mypage/Feed";
import { connectDB } from "../../../../../utils/database";

export default async function page(props) {

  // username 를 decode 해서 보내기
  let {username} = props.params;
  username = decodeURIComponent(username);

  let db = (await connectDB).db('sns');
  let user = await db.collection('user').findOne({username : username});
  let feed = await db.collection('post').find({username : user.username}).toArray();

  return (
    <div className="mypage">

      <div className="profile">
        
        <div className="lbx">
          <div className="user-img" style={{backgroundImage : `url(${user?.profileImage})`}}></div>
        </div>
        
        <div className="rbx">
          
          <div className="input-box">
            <label htmlFor="name">유저명</label>
            <p>{user?.username}</p>
          </div>
          
          <div className="input-box">
            <label htmlFor="content">소개</label>
            <p>{user?.content}</p>
          </div>

        </div>

      </div>

      <p className="feed-name">피드</p>
      <Feed feed={feed}/>

    </div>
  )
}

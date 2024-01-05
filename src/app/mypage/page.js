import { getServerSession } from "next-auth"
import { authOptions } from "../../../pages/api/auth/[...nextauth]"
import Logout from "../../../client/Mypage/Logout";

export default async function page() {

  let session = await getServerSession(authOptions);

  return (
    <div className="mypage">

      <div className="profile">
        
        <div className="lbx">
          <div className="user-img" style={{backgroundImage : `url(${session?.user.image})`}}></div>
          <button>프로필 변경</button>
          <Logout/>
        </div>
        
        <div className="rbx">
          <div className="input-box">
            <label htmlFor="name">유저명</label>
            <input type="text" name="name" defaultValue={session?.user.name}/>
          </div>
          <div className="input-box">
            <label htmlFor="content">소개</label>
            <textarea name="content"></textarea>
          </div>
        </div>

      </div>

      <p className="feed-name">피드</p>
      <div className="feed">
        <div className="col"></div>
      </div>

    </div>
  )
}

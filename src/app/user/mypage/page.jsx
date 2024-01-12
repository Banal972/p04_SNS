"use client"

import Logout from "../../../../client/Mypage/Logout";
import Feed from "../../../../client/Mypage/Feed";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";


export default function page() {

  // 로그인 session 가져오기
  const [user,setUser] = useState({});

  const [feed,setFeed] = useState([]);
  const [page,setPage] = useState(1);
  const [end,setEnd] = useState(false);

  // ajax 
  useEffect(()=>{

    // 스크롤 이벤트 끄기
    setEnd(false);

    axios.get(`/api/user/mypage/feed/${page}`)
    .then(({data})=>{

      // ajax로 데이터 가져오기
      const {suc,data_result,msg,user} = data;

      // 성공하면
      if(suc){

        // 데이터 넣기
        const copy = [...feed,...data_result];
        setFeed(copy);

        // 페이지 수정
        setPage(page + 1);

        // 유저 가져오기
        setUser(user);

      // 실패하면
      }else{

        alert(msg);

      }

    })
    .catch(e=>{
      // console.log(e);
      alert('에러가 발생했습니다.');
    })

  },[end]);

  // 무한스크롤
  useEffect(()=>{

    const scrollHandler = ()=>{
      let offet = document.querySelector('.layout .overflow').scrollTop; // 스크롤
      let scrollHeight = document.querySelector('.layout .overflow').scrollHeight; // 스크롤 포함 높이
      let clientHeight = document.querySelector('.layout .overflow').clientHeight; // 원래 높이
        
        // 스크롤이 맨밑으로 내려갈경우
        if((offet + clientHeight) >= scrollHeight){
          
          // 스크롤상태 초기화
          setEnd(true);

        }

    }

    if(feed.length > 0){
  
      document.querySelector('.layout .overflow').addEventListener('scroll',scrollHandler)

    }

    // clean-up 함수 이벤트 한번 삭제해주기
    return ()=>{
      document.querySelector('.layout .overflow').removeEventListener('scroll',scrollHandler);
    }

  },[feed]);

  return (
    <div className="mypage">

      <div className="profile">
        
        <div className="lbx">
          <div className="user-img" style={{backgroundImage : `url(${user.profileImage})`}}></div>
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

"use client"

import axios from "axios";
import Post from "../../client/main/Post";
import { useEffect, useState } from "react";

export default function Home() {
  
  // 게시물 데이터
  const [result, setResult]  = useState([]);

  // 로그인된 유저명
  const [username,setUsername] = useState('');

  // 스크롤 맨밑으로 갔는지에 따라 ajax 실행
  const [end,setEnd] = useState(false);

  // 페이징
  const [page,setPage] = useState(1);

  // ajax를 이용해서 데이터를 가져오기
  useEffect(()=>{
    // 스크롤 상태 돌리기
    setEnd(false);
    
    axios.get(`/api/post/get/${page}`)
    .then(({data})=>{
      const {suc,msg,data_result,username} = data;
      if(suc){ // 성공하면
        
        const copy = [...result, ...data_result];

        // 데이터 넣어주기
        setResult(copy);

        // 유저 가져오기
        setUsername(username);

        // 페이지 1씩상승
        setPage(page+1);

      }else{
        alert(msg);
      }
    })
  },[end]);


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

    if(result.length > 0){
  
      document.querySelector('.layout .overflow').addEventListener('scroll',scrollHandler)

    }

    // clean-up 함수 이벤트 한번 삭제해주기
    return ()=>{
      document.querySelector('.layout .overflow').removeEventListener('scroll',scrollHandler);
    }

  },[result]);

  return (
    <ul className="feed">

      {
        // 피드를 출력
        result.map((e,i)=><Post e={e} key={i} user={username}/>)
      }

    </ul>
  )

}
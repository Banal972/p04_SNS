"use client"

import axios from "axios";
import { useEffect, useState } from "react";
// 아이콘
import { IoSearchSharp } from "react-icons/io5";

export default function page() {

    const [result,setResult] = useState([]);


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

        if(result.length > 0){
    
        document.querySelector('.layout .overflow').addEventListener('scroll',scrollHandler)

        }

        // clean-up 함수 이벤트 한번 삭제해주기
        return ()=>{
        document.querySelector('.layout .overflow').removeEventListener('scroll',scrollHandler);
        }

    },[result]);
    

    const onSubmit = (e)=>{
        e.preventDefault();


        // axios.get('/api/search/')


    }
    

  return (
    <div className='_search'>
        
        <form onSubmit={(e)=>onSubmit(e)}>
            <div className="search_box">
                <input type="text" placeholder='유저명 혹은 내용을 입력해주세요.' />
                <div className="icon">
                    <IoSearchSharp/>
                </div>
            </div>
        </form>

        <div className="random">
            <div className={`col hol`}>
                <div className='img'></div>
            </div>
        </div>

    </div>
  )
}

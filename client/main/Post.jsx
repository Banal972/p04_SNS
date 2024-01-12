"use client"

// ajax 라이브러리
import axios from "axios";

// 애니메이션 라이브러리
import gsap from "gsap";

// 날짜 라이브러리
import moment from "moment/moment";

// next 라이브러리
import { useRouter } from "next/navigation";

// react 라이브러리
import { useState } from "react";

// icon 라이브러리
import { FaHeart } from "react-icons/fa";

export default function Post({e,user}) {

    // 라우터
    const router = useRouter();

    // 해당 좋아요수 가져오기
    const [like,setLike] = useState(e.like);

    // 좋아요 애니메이션
    const addHandler = (target)=>{ // 클릭한 타겟

        gsap.timeline({})
        .fromTo(target.querySelector('.heart svg'),{
            y : 50,
            opacity : 0
        },{
            y : 0,
            opacity : 1
        })
        .fromTo(target.querySelector('.heart svg'),{
            scale : 0.9
        },{
            scale : 1.2
        },">-=50%")
        .to(target.querySelector('.heart svg'),{
            opacity : 0
        })

    }

    // 좋아요 기능
    const likeAdd = (target,e)=>{ // 클릭한 타겟, 이벤트

        axios.post('/api/post/like',{
            _id : e._id,
            user : user.name
        }).then(({data})=>{
            if(data.suc){

                if(data.type == "insert"){
                    addHandler(target); // 클릭한 타겟
                }

                setLike(data.like); // 좋아요 바꾸기
                router.refresh();
 
            }
        })

    }


    // 해당 유저로 이동
    const userClickHandler = (username)=>{
        router.push(`/user/mypage/${username}`);
    }

  return (
    <li>
        
        <div className="user" onClick={()=>userClickHandler(e.username)}>
            
            {/* 가져온 프로필 사진 출력 */}
            <div className="icon" style={{backgroundImage : `url(${e.profileImage})`}}></div>
            {e.username}

        </div>
        
        <div 
            className="imgbox"
            onDoubleClick={(dom)=>{

                // 로그인이 되어있으면
                if(user){
                    likeAdd(dom.currentTarget,e)
                }
        
            }}
        >
            <div 
                className={`img ${e.filter}`}
                style={
                    e.imgURL ?
                    {backgroundImage:`url(${e.imgURL})`}
                    : {background : "#000"}
                }>
            </div>
            <div className="heart">
                <FaHeart/>
            </div>
        </div>
        
        <div className="content">
            <div className="like">
                <FaHeart/>{like} Like
            </div>
            <div className="desc">
                <p> <span>{e.username}</span> {e.desc} </p>
                <p className="date">{moment(e.write).format("YYYY-MM-DD")}</p>
            </div>
        </div>

    </li>
  )
}

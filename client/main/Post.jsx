"use client"

import axios from "axios";
import gsap from "gsap";
import moment from "moment/moment";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaHeart } from "react-icons/fa";

export default function Post({e,user}) {

    // 라우터
    const router = useRouter();

    const [like,setLike] = useState(e.like);

    // 좋아요 애니메이션
    const addHandler = ()=>{

        gsap.timeline({})
        .fromTo('.heart svg',{
            y : 50,
            opacity : 0
        },{
            y : 0,
            opacity : 1
        })
        .fromTo('.heart svg',{
            scale : 0.9
        },{
            scale : 1.2
        },">-=50%")
        .to('.heart svg',{
            opacity : 0
        })

    }

    // 좋아요 기능
    const likeAdd = (e)=>{

        axios.post('/api/post/like',{
            _id : e._id,
            user : session.name
        }).then(({data})=>{
            if(data.suc){

                if(data.type == "insert"){
                    addHandler();
                }

                setLike(data.like); // 좋아요 바꾸기
                router.refresh();
 
            }
        })

    }

  return (
    <li onDoubleClick={()=>{
        if(session){
            likeAdd(e)
        }
    }}>
        
        <div className="user">
            {/* 가져온 프로필 사진 출력 */}
            <div className="icon" style={{backgroundImage : `url(${e.profileImage})`}}></div>
            {e.username}
        </div>
        
        <div 
            className="imgbox"
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

"use client"
import axios from "axios";
import gsap from "gsap";
import moment from "moment/moment";
import { useState } from "react";
import { FaHeart } from "react-icons/fa";

export default function Post({e,session}) {

    const [like,setLike] = useState(e.like);

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
            <div className="icon"></div>
            {e.user_id}
        </div>
        
        <div className="img" style={{background:'#000'}}>
            <div className="heart">
                <FaHeart />
            </div>
        </div>
        
        <div className="content">
            <div className="like">
                {like} Like
            </div>
            <div className="desc">
                <p> <span>{e.user_id}</span> {e.desc} </p>
                <p className="date">{moment(e.write).format("YYYY-MM-DD")}</p>
            </div>
        </div>

    </li>
  )
}

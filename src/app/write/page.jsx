"use client"

import { Swiper, SwiperSlide } from "swiper/react"
import 'swiper/css';
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react"

import axios from "axios";

export default function Write(){

    // 라우터 연결
    const router = useRouter();

    // 로그인 session 가져오기
    const {data,status} = useSession();

    // 핕터명 저장
    const filter = [
        '_1977','aden',
        'brannan','brooklyn',
        'clarendon','earlybird',
        'gingham','hudson',
        'inkwell','kelvin',
        'lark','lofi',
        'maven','mayfair',
        'moon','nashville',
        'perpetua','reyes',
        'rise','slumber',
        'stinson','toaster',
        'valencia','walden',
        'willow','xpro2'
    ]

    // ref
    const fileRef = useRef(null);
    
    // state
    const [file,setFile] = useState(null);
    const [img,setImg] = useState('');
    
    // 필터
    const [changeFilter,setChangeFilter] = useState('');
    const filterHandler = (e)=>{
        setChangeFilter(e);
    }

    const onSubmit = (e)=>{
        e.preventDefault();

        const content = e.target.content

        if(!file){
            alert('사진을 업로드 해주세요');
            return fileRef.current.click();
        }

        if(content.value.length > 200){
            alert('200자 이상 입력할수 없습니다.');
            return content.focus();
        }

        const formData = new FormData();
        formData.append("username",data.user.name);
        formData.append("content",content.value);
        formData.append("file",file);
        formData.append('filter',changeFilter);

        /* Array.from(file).forEach(e=>{
            formData.append("file",e); 
        }) */

        axios.post('/api/post/write',formData,{
            headers : {
                'Content-Type': 'multipart/form-data',
            }
        })
        .then(({data})=>{
            if(data.suc){
                alert(data.msg);
                router.push('/');
                router.refresh();
            }
        })
    }

    return (
        <form 
            onSubmit={(e)=>onSubmit(e)}
        >
            <div className="_write">

                <input 
                    ref={fileRef} 
                    type="file" 
                    style={{display : 'none'}}
                    accept="image/*"
                    onChange={(e)=>{
                        const file = e.target.files[0];
                        const imgBlob = URL.createObjectURL(file);
                        setFile(file);
                        setImg(imgBlob);
                    }}
                />

                {
                    <div 
                        className={
                            img ?
                            `bx-img file-img ${changeFilter}`
                            : "bx-img notImg"
                        }
                        onClick={()=>{
                            fileRef.current.click();
                        }}
                    >
                        {
                            img ?
                            <img src={img} alt="" />
                            :
                            <p>클릭해서 사진을 업로드 해주세요</p>
                        }
                    </div>
                }

                {
                    img &&
                    <Swiper 
                        className="slide"
                        slidesPerView={3.5}
                        spaceBetween={10}
                    >
                        <SwiperSlide>
                            <div className='imgbox' onClick={()=>filterHandler("")}>
                                <div 
                                    className={`img`} 
                                    style={{backgroundImage : `url(${img})`}}
                                ></div>
                            </div>
                        </SwiperSlide>
                        {
                            filter.map((e,i)=>(
                                <SwiperSlide key={i}>
                                    <div className='imgbox' onClick={()=>filterHandler(e)}>
                                        <div 
                                            className={`img ${e}`} 
                                            style={{backgroundImage : `url(${img})`}}
                                        ></div>
                                    </div>
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                }

                <div className="text">
                    <p>내용</p>
                    <textarea name="content" placeholder="내용을 적어주세요" maxLength={200}></textarea>
                </div>

                <button type="submit" className="submit">등록</button>

            </div>
        </form>
    )
}
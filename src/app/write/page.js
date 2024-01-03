"use client"

import { Swiper, SwiperSlide } from "swiper/react"
import 'swiper/css';

export default function Write(){
    return (
        <div className="_write">

            <h1 className="h1">새 게시물</h1>

            <div className="file-img">
                <img src="https://placehold.co/600x400" alt="" />
            </div>
  
            <Swiper 
                className="slide"
                slidesPerView={3.5}
                spaceBetween={10}
            >
                {
                    [0,1,2,3,4,5,6,7,8,9,10].map((e)=>(
                        <SwiperSlide key={e}>
                            <div 
                                className="img" 
                                style={{backgroundImage : "url(https://placehold.co/600x400)"}}
                            />
                        </SwiperSlide>
                    ))
                }
            </Swiper>

            <div className="text">
                <p>본문 내용</p>
                <textarea name="" id="" cols="30" rows="10" placeholder="본문 내용을 적어주세요"></textarea>
            </div>

        </div>
    )
}
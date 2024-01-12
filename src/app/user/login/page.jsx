"use client"

import { signIn } from "next-auth/react";

// 아이콘
import { RiKakaoTalkFill } from "react-icons/ri";
import { SiNaver } from "react-icons/si";
import { SiGithub } from "react-icons/si";


export default function Login() {

    return (
        <div className="_user _login">

            <div className="h1">
                <h1>소셜 로그인</h1>
                <p>지금은 소셜 로그인만 지원합니다.</p>
            </div>

            <div style={{marginTop:35}} className="btnlist">

                <button className="naver" onClick={()=>signIn('naver')}>
                    <div className="box">
                        <SiNaver/>
                    </div>
                    <p>네이버 로그인</p>
                </button>

                <button className="kakao" onClick={()=>signIn('kakao')}>
                    <div className="box">
                        <RiKakaoTalkFill/>
                    </div>
                    <p>카카오 로그인</p>
                </button>

                <button className="github" onClick={()=>signIn('github')}>
                    <div className="box">
                        <SiGithub/>
                    </div>
                    <p>깃허브 로그인</p>
                </button>

            </div>

        </div>
    )

}
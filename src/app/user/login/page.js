"use client"

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Login() {

    const router = useRouter();
    const [ids,setIds] = useState("");
    const [check,setCheck] = useState(false);

    useEffect(()=>{

        fetch('/api/user/login',{
            method : "GET"
        })
        .then(resp=>resp.json())
        .then(data=>{
            
            if(data){
                setIds(data);
                setCheck(true);
            }

        })

    },[]);

    const submit = (e)=>{
        e.preventDefault();

        const pw = e.target.pw.value;
        const check = e.target.chk.checked;

        if(ids == ""){
            e.target.id.focus();
            return alert('아이디를 입력해주세요');
        }

        if(pw == ""){
            e.target.pw.focus();
            return alert('비밀번호를 입력해주세요');
        }

        const option = {
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({ids,pw,check})
        }

        fetch("/api/user/login",option)
            .then(resp=>resp.json())
            .then(({suc,msg})=>{
                if(suc){
                    alert(msg);
                    router.push('/');
                    router.refresh();
                }else{
                    e.target.pw.focus();
                    e.target.pw.value = "";
                    alert(msg);
                }
            });

    }

    return (
        <div className="_user _login">

            <h1 className="h1">로그인</h1>

            <form onSubmit={submit}>

                <div style={{marginTop:35}}>

                    <div className="input-lay">
                        <label htmlFor="id">아이디</label>
                        <input 
                            type="text" 
                            name="id" 
                            id="id" 
                            autoComplete="off" 
                            value={ids}
                            onChange={e=>setIds(e.target.value)}
                        />
                    </div>

                    <div className="input-lay">
                        <label htmlFor="pw">비밀번호</label>
                        <input type="password" name="pw" id="pw" autoComplete="off"/>
                    </div>

                    <div className="fl">
                        <div className="check">                            
                            <input 
                                type="checkbox" 
                                name="chk" 
                                id="chk" 
                                checked={check}
                                readOnly
                                onClick={()=>setCheck(!check)}
                            />
                            <label htmlFor="chk">
                                <div className="ch-ui"></div>
                                아이디저장
                            </label>
                        </div>

                        <div className="btn">
                            <Link href='/user/find/id'>아이디 찾기</Link> | <Link href='/user/find/pw'>비밀번호 찾기</Link>
                        </div>
                    </div>

                </div>

                <button className="n-btn" type="submit">로그인</button>

                <div className="sign-list">
                    아이디가 없으신가요? <Link href="join">회원가입</Link>
                </div>
                
            </form>

        </div>
    )

}
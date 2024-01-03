
"use client"

import Link from "next/link"
import { useRouter } from "next/navigation";

export default function Find({params}) {

    const {id} = params;
    const router = useRouter();

    const submit = (e)=>{

        e.preventDefault();

        if(id == "id"){

            const name = e.target.name.value;
            const email = e.target.email.value;

            if(name == ""){
                e.target.name.focus();
                return alert('성함을 입력해주세요');
            }

            if(email == ""){
                e.target.email.focus();
                return alert('이메일을 입력해주세요');
            }

            const option = {
                method : "POST",
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify({name,email})
            }

            fetch(`/api/user/find/${id}`,option)
                .then(resp=>resp.json())
                .then(({suc,msg})=>{
                    if(suc){
                        alert(msg);
                    }else{
                        alert(msg);
                    }
                });

        }else{

            const ids = e.target.ids.value;
            const email = e.target.email.value;

            if(ids == ""){
                e.target.ids.focus();
                return alert('아이디를 입력해주세요');
            }

            if(email == ""){
                e.target.email.focus();
                return alert('이메일을 입력해주세요');
            }

            const option = {
                method : "POST",
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify({ids,email})
            }

            fetch(`/api/user/find/${id}`,option)
                .then(resp=>resp.json())
                .then(({suc,msg,info})=>{
                    if(suc){
                        router.push(`/user/find/reset/${info}`);
                    }else{
                        e.target.ids.value = "";
                        e.target.email.value = "";
                        alert(msg);
                    }
                });
        }

    }

  return (
    <div className="_find _user">

        <h1 className="h1">{id == "id" ? "아이디" : "비밀번호"} 찾기</h1>

        <div className="tap">
            <Link className={ id == "id" ? "act" : null } href='id'>아이디 찾기</Link>
            <Link className={ id == "pw" ? "act" : null } href='pw'>비밀번호 찾기</Link>
        </div>

        <form onSubmit={submit}>

            <div style={{marginTop:50}}>

                {
                    id == "id"
                    ?
                    <div className="input-lay">
                        <label htmlFor="name">가입시 작성했던 성함을 입력해주세요</label>
                        <input type="text" name="name" id="name" autoComplete="off"/>
                    </div>
                    :
                    <div className="input-lay">
                        <label htmlFor="ids">아이디를 입력해주세요</label>
                        <input type="text" name="ids" id="ids" autoComplete="off"/>
                    </div>
                }

                <div className="input-lay">
                    <label htmlFor="email">가입시 작성했던 이메일을 입력해주세요</label>
                    <input type="email" name="email" id="email" autoComplete="off"/>
                </div>

            </div>

            <button className="n-btn" type="submit">찾기</button>

        </form>

    </div>
  )
}
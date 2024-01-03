"use client"

import { useRouter } from "next/navigation";

export default function Join(){

    const router = useRouter();

    const submit = (e)=>{
        e.preventDefault();

        const pwReg = /^(?=.*[a-zA-Z])(?=.*[0-9]).{6,25}$/;

        const arg = e.target.arg.checked;
        const name = e.target.name.value;
        const id = e.target.id.value;
        const email = e.target.email.value;
        const pw = e.target.pw.value;
        const pwcheck = e.target.pwcheck.value;

        if(!arg){
            return alert('동의하기를 눌러주세요');
        }

        if(name == ""){
            e.target.name.focus();
            return alert('이름을 입력해주세요');
        }

        if(id == ""){
            e.target.id.focus();
            return alert('아이디를 입력해주세요');
        }

        if(email == ""){
            e.target.email.focus();
            return alert('이메일을 입력해주세요');
        }

        if(pw == ""){
            e.target.pw.focus();
            return alert('비밀번호를 입력해주세요');
        }

        if(!pwReg.test(pw)){
            e.target.pw.focus();
            return alert('영문 숫자 조합 6자리 이상 이여야 합니다.');
        }

        if(pwcheck == ""){
            e.target.pwcheck.focus();
            return alert('비밀번호 확인을 입력해주세요');
        }

        if(pw != pwcheck){
            return alert('비밀번호가 서로 다릅니다.');
        }

        const option = {
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({name,id,email,pw})
        }

        fetch("/api/user/join",option)
            .then(resp=>resp.json())
            .then(({suc,msg})=>{
                if(suc){
                    alert(msg);
                    router.push('/');
                }else{
                    e.target.id.focus();
                    alert(msg);
                }
            });

    }

    return (
        <div className="_user _join">

            <h1 className="h1">회원가입</h1>

            <form onSubmit={submit}>
                <div className="agree">
                    <div className="cont">
                        어쩌구 저쩌구어쩌구 저쩌구어쩌구 저쩌구어쩌구 저쩌구어쩌구 저쩌구어쩌구 저쩌구
                        어쩌구 저쩌구어쩌구 저쩌구어쩌구 저쩌구어쩌구 저쩌구어쩌구 저쩌구어쩌구 저쩌구어쩌구 저쩌구
                        어쩌구 저쩌구어쩌구 저쩌구어쩌구 저쩌구어쩌구 저쩌구어쩌구 저쩌구어쩌구 저쩌구
                        어쩌구 저쩌구어쩌구 저쩌구어쩌구 저쩌구어쩌구 저쩌구어쩌구 저쩌구어쩌구 저쩌구어쩌구 저쩌구
                    </div>
                    <label htmlFor="arg">
                        <input type="checkbox" name="arg" id="arg"/> 동의하기
                    </label>
                </div>

                <div className="icon-input">
                    <div className="img"></div>
                    <div className="edit"></div>
                    <p>프로필 이미지</p>
                </div>

                <div style={{marginTop:35}}>

                    <div className="input-lay">
                        <label htmlFor="name">회원이름</label>
                        <input type="text" name="name" id="name" style={{maxWidth: 150}} autoComplete="off"/>
                    </div>

                    <div className="input-lay">
                        <label htmlFor="id">아이디</label>
                        <input type="text" name="id" id="id" autoComplete="off"/>
                    </div>

                    <div className="input-lay">
                        <label htmlFor="email">이메일</label>
                        <input type="email" name="email" id="email" autoComplete="off"/>
                    </div>

                    <div className="input-lay">
                        <label htmlFor="pw">비밀번호</label>
                        <input type="password" name="pw" id="pw" autoComplete="off"/>
                    </div>

                    <div className="input-lay">
                        <label htmlFor="pwcheck">비밀번호 확인</label>
                        <input type="password" name="pwcheck" id="pwcheck" autoComplete="off"/>
                    </div>
                </div>

                <button className="n-btn" type="submit">회원가입</button>
            </form>

        </div>
    )
}
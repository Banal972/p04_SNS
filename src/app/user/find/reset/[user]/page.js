"use client"

import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function PassReset(){

    const {user} = useParams();
    const router = useRouter();

    const submit = (e)=>{
        e.preventDefault();

        // 비밀번호 정규식
        const pwReg = /^(?=.*[a-zA-Z])(?=.*[0-9]).{6,25}$/;
        
        const pw = e.target.pw;
        const pwcheck = e.target.pwcheck;

        if(pw.value == ""){
            pw.focus();
            return alert('비밀번호를 입력해주세요');
        }

        if(pwcheck.value == ""){
            pwcheck.focus();
            return alert('비밀번호 확인을 입력해주세요');
        }

        if(!pwReg.test(pw.value)){
            pw.focus();
            return alert('영문 숫자 조합 6자리 이상 이여야 합니다.');
        }

        fetch('/api/user/find/reset',{
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                pw : pw.value,
                seq : user
            })
        })
        .then(resp=>resp.json())
        .then(({suc,msg})=>{
            if(suc){
                alert(msg);
                router.push('/user/login');
            }else{
                return alert(msg);
            }
        })

    }

    return(
        <div className="_reset _user">
            <h1 className="h1">비밀번호 리셋</h1>

            <form onSubmit={submit}>

                <div style={{marginTop:50}}>

                    <div className="input-lay">
                        <label htmlFor="pw">변경할 비밀번호를 입력해주세요</label>
                        <input type="password" name="pw" id="pw" autoComplete="off"/>
                    </div>

                    <div className="input-lay">
                        <label htmlFor="pwcheck">비밀번호 확인</label>
                        <input type="password" name="pwcheck" id="pwcheck" autoComplete="off"/>
                    </div>

                </div>

                <button className="n-btn" type="submit">비밀번호 변경</button>

            </form>

        </div>
    )

}
"use client"

import axios from "axios";
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


// 아이콘
import { BiEdit } from "react-icons/bi";


export default function page() {

  // 라우터 연결
  const router = useRouter();

  // 로그인 session 가져오기
  const {data,status} = useSession();
  
  // 이미지주소
  const [imgURL,setImgURL] = useState('');

  // 이미지 첨부 데이터
  const [imgFile,setImgFile] = useState(null);

  // status가 수정되면 데이터 수정
  useEffect(()=>{

    if(status == "authenticated"){
      console.log(data);
      setImgURL(data.user.image);
    }

  },[status]);

  // 프로필 변경
  const profileHandler = (e)=>{
    const file = e.target.files[0];

    const url = URL.createObjectURL(file);

    setImgFile(file);
    setImgURL(url);

  }


  // form 이벤트
  const sumbitHandler = (e)=>{
    
    e.preventDefault(); // 이벤트 막기

    const chk = e.target.chk;
    const username = e.target.username;
    const content = e.target.content;

    if(!chk.checked){
      return alert('동의 하기를 눌러주세요.');
    }

    if(username.value == ""){
      alert('유저명을 입력해주세요.');
      return username.focus();
    }

    // formData 전송
    const formData = new FormData();
    formData.append('snsname', data.user.name);
    formData.append('snsEmail', data.user.email);
    formData.append('profileImage', data.user.image);

    formData.append('username', username.value);
    formData.append('content', content.value);
    formData.append('file', imgFile);

    axios.post('/api/user/join',formData,{
      headers : {
        "Content-Type" : "multipart/form-data"
      }
    })
    .then(({data})=>{
      const {suc,msg,type} = data;

      if(suc){
        alert(msg);

        return router.push('/user/mypage');

      }else{
        alert(msg);
        
        switch(type){
          case "userExist" :
            username.focus();
            break ;
        }

      }

    })
    .catch(e=>{
      console.log(e);
      alert('에러가 발생했습니다.');
    })

  }


  if(status == "loading"){

    return <img src="/images/loding.svg" alt="" />

  }

  return (
    <div className="_user _join">
        
        <form onSubmit={(e)=>sumbitHandler(e)}>

            <div className="agree">
              <div className="cont">
                본 사이트는 NextJS를 사용하며 GCP의 cloude Stroge로 이미지가 저장되고<br/>
                데이터는 MongoDB에 쌓입니다.<br/>
                본 사이트는 포트폴리오용으로 만들기위해 제작한 토이프로젝트 입니다. <br/>
                데이터는 남으며 언제든지 데이터가 삭제될 수 있고 <br/>
                본 사이트에서 사용하는 DB 데이터는 포트폴리용을 제외하고는 <br/>
                사용하지 않습니다.
              </div>
              <label htmlFor="chk" className="agree_input">
                <input type="checkbox" name="chk" id="chk"/>
                <div className="check"></div>
                동의 합니다.
              </label>
            </div>
            
            <div className="user-icon-box">
              <p>프로필</p>
              <label htmlFor="file" className="user-icon" style={{backgroundImage : `url(${imgURL})`}}>
                <div className="icon">
                  <BiEdit/>
                </div>
              </label>
              <input type="file" id="file" name="file" onChange={e=>profileHandler(e)} />
            </div>

            <div className="input-lay">
              <label htmlFor="username">유저명</label>
              <input type="text" name="username" id="username" defaultValue={data?.user.name} />
            </div>

            <div className="input-text">
              <label htmlFor="content">소개</label>
              <textarea name="content" id="content" placeholder="소개글을 적어주세요."></textarea>
            </div>

            <button type="submit" className="n-btn">가입하기</button>

        </form>

    </div>
  )
}

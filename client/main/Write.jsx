"use client"

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react'

export default async function Write({session}) {

    const router = useRouter();

    const onClick = ()=>{

        if(!session){
            alert('로그인을 해야합니다.');
            signIn();
        }else{
            router.push('/write');
        }

    }

  return (
    <div className="write-fixed">
        <button onClick={onClick}>작성하기</button>
    </div>
  )
}

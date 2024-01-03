"use client"

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export function Logout() {

  const router = useRouter();

  const logout = (e)=>{
    e.preventDefault();

    fetch('/api/user/logout',{
      method : "POST"
    })
    .then(resp=>resp.json())
    .then(({suc,msg})=>{
      
      if(suc){
        alert(msg);
        router.refresh();
      }

    });

  }

  return (
    <Link href='/' onClick={logout}>로그아웃</Link>
  );

}

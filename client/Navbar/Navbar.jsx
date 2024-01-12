"use client"

import Link from "next/link"
import { MdHome } from "react-icons/md";
import { IoCreateOutline } from "react-icons/io5";
import { IoMdSearch } from "react-icons/io";
import { LuUser2 } from "react-icons/lu";
import { signIn } from "next-auth/react";

export default function Navbar({session}) {

    /* const auth = (e)=>{
        if(!session){
            e.preventDefault();
            alert('로그인을 해야합니다.');
            signIn();
        }else{
            return;
        }
    }
 */
  return (
    <ul className="nav-bar">
        
        <li>
            <Link href="/"><MdHome /></Link>
        </li>

        <li>
            <Link href="/search"><IoMdSearch /></Link>
        </li>

        {/* 작성페이지 */}
        <li>
            <Link href="/write"><IoCreateOutline/></Link>
        </li>

        {/* 마이페이지 */}
        <li>
            <Link href="/user/login" ><LuUser2/></Link>
        </li>

    </ul>
  )
  
}

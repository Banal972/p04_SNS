"use client"

import { signOut } from "next-auth/react"

export default function Logout() {

  return (
    <button className="logout" onClick={(e)=>signOut({callbackUrl : '/'})}>로그아웃</button>
  )
}

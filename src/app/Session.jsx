// next-auth에서 SessionProvider를 설치
"use client"
import { SessionProvider } from "next-auth/react";

export default function Session({children}) {
  return (
    <SessionProvider>{children}</SessionProvider>
  )
}

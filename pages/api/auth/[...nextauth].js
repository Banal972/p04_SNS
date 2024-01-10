import NextAuth from "next-auth/next";
import GithubProvider from "next-auth/providers/github"
import KakaoProvider from "next-auth/providers/kakao"
import NaverProvider from "next-auth/providers/naver";

export const authOptions = {
    providers: [
      GithubProvider({
        clientId: process.env.GithubId,
        clientSecret: process.env.GithubPw,
      }),
      KakaoProvider({
        clientId: process.env.KAKAO_CLIENT_ID,
        clientSecret: process.env.KAKAO_CLIENT_SECRET
      }),
      NaverProvider({
        clientId: process.env.NAVER_CLIENT_ID,
        clientSecret: process.env.NAVER_CLIENT_SECRET
      })
    ],
    secret : process.env.authSecret
  };
  export default NextAuth(authOptions);
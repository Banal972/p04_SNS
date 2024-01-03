import NextAuth from "next-auth/next";
import GithubProvider from "next-auth/providers/github"

export const authOptions = {
    providers: [
      GithubProvider({
        clientId: process.env.GithubId,
        clientSecret: process.env.GithubPw,
      }),
    ],
    secret : process.env.authSecret
  };
  export default NextAuth(authOptions);
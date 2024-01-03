// SCSS
import './asset/scss/app.scss'

// 컴포넌트
import Header from "./component/Header";
import Footer from "./component/Footer";

// 모듈
import Link from "next/link";
import { getServerSession } from 'next-auth';
import { authOptions } from '../../pages/api/auth/[...nextauth]';
import Write from '../../client/main/Write';

export const metadata = {
  title: '토이프로젝트 - SNS',
  description: '김지유의 토이프로젝트 SNS 사이트 입니다.',
}


export default async function RootLayout({ children }) {

  let session = await getServerSession(authOptions);

  return (
    <html lang="ko">
      <body>

        <div className="_main">

          <Header/>
          
          <div className="layout">
            <div className="overflow">
              {children}
            </div>
          </div>

          {/* 작성버튼 */}
          <Write session={session}/>

          <Footer/>

        </div>

      </body>
    </html>
  )
}
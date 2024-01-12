// SCSS
import '../../asset/scss/app.scss';

// 컴포넌트
import Header from "../../component/Header";
import Footer from "../../component/Footer";
import Navbar from '../../client/Navbar/Navbar';

// 모듈
import Session from './Session'; // Next-auth 모듈

// metadata 수정
export const metadata = {
  title: 'SNS',
  description: '김지유의 토이프로젝트 SNS 사이트 입니다.',
}

export default async function RootLayout({ children }) {

  return (

    <html lang="ko">
      
      <body>

        {/* NextAuth SessionProvider 설치 */}
        <Session> 
          <div className="_main">

            {/* 헤더 */}
            <Header/>

            {/* 메인 출력 */}
            <div className="layout">
              <div className="overflow">
                {children}
              </div>
            </div>

            {/* Navbar 설치 */}
            <Navbar/>
            
            {/* 푸터 */}
            <Footer/>

          </div>
        </Session>

      </body>

    </html>

  )
}
// SCSS
import '../../asset/scss/app.scss';

// 컴포넌트
import Header from "./component/Header";
import Footer from "./component/Footer";
import Navbar from '../../client/Navbar/Navbar';

// 모듈
import { getServerSession } from 'next-auth';
import { authOptions } from '../../pages/api/auth/[...nextauth]';
import Session from './Session';

export const metadata = {
  title: '토이프로젝트 - SNS',
  description: '김지유의 토이프로젝트 SNS 사이트 입니다.',
}

export default async function RootLayout({ children }) {

  // let session = await getServerSession(authOptions);

  return (

    <html lang="ko">
      
      <body>

        {/* NextAuth SessionProvider 설치 */}
        <Session> 
          <div className="_main">

            <Header/>

            <div className="layout">
              <div className="overflow">
                {children}
              </div>
            </div>

            <Navbar/>
            
            <Footer/>

          </div>
        </Session>

      </body>

    </html>

  )
}
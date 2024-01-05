import Link from 'next/link';
import { authOptions } from '../../../pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import Login from '../../../client/header/Login';
import Right from '../../../client/header/Right';

export default async function Header() {

  let session = await getServerSession(authOptions);

  return (

    <header className="header">

      <div className="logo">
        <Link href='/'> <img src='/logo.svg' width={20}></img> SNS</Link>
      </div>

      {/* <div className="route">
        <Login session={session}/>
        <Right/>
      </div> */}
      
    </header>

  );

}
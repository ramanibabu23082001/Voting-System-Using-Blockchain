import { getSession } from 'next-auth/client';

import UserProfile from '../components/profile/user-profile';
import Layout from '../components/layout/layout';
function ProfilePage() {
  return (
 
  <UserProfile />
);
}

//getinitail probs working run buliding time start but not all incoming request
//so we use getServerSideProps in context where we get acccess to incoming request
export async function getServerSideProps(context) {//using this we authenticate users from backend 
  const session = await getSession({ req: context.req });//context will contain backend req and res 

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    };
  }

  return {//if session is there then only load the page
    props: { session },
  };
}

export default ProfilePage;

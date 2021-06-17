import React from 'react';
import Adlogin from '../../components/admin/adlogin';
import Appbar from '../../components/appbar';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/client';
import { useEffect, useState } from 'react';
function AdminLogin() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        router.replace('/admin/dashboard');
      } else {
        setIsLoading(false);
      }
    });
  }, [router]);

  if (isLoading) {
    return <center><p>Loading...</p></center>;
  }

  return (
    <>
    <Appbar/>
    <Adlogin />
   </>
  );
}

//getinitail probs working run buliding time start but not all incoming request
export default AdminLogin;
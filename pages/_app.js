//this page is used to wrap allpages inthe application
import { Provider } from 'next-auth/client';

import Layout from '../components/layout/layout';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      {/* {//use session will take place to authenticate the user from froendend so avoid this we set wrapper  */}
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
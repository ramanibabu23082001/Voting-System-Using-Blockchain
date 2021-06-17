//this page is used to wrap allpages inthe application
import { Provider } from 'next-auth/client';
import '../styles/globals.css';
 import '../public/assert/styles.css';
// import Head from "next/head";
// import Link from 'next/link';
import { ThemeProvider } from '@material-ui/core/styles';
 import '@material-ui/core/';
import '@material-ui/core';
import theme from './theme';
//import { Button } from '@material-ui/core';
function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme} >
    <Provider session={pageProps.session}>
      {/* {//use session will take place to authenticate the user from froendend so avoid this we set wrapper  */}
        <Component {...pageProps} />
        {/*  */}
    </Provider>
 
    </ThemeProvider>
  );
}

export default MyApp;

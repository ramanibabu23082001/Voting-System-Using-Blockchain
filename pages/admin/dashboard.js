import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '../../components/admin/drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import {Typography,Grid} from '@material-ui/core';
import { getSession } from 'next-auth/client';
function Dashboard() {
  const container={margin:'100px 10px 10px 10px'}
  const draw ={margin:'0px',width:'30%'}
  const content={margin:'0px 0px 0px 240px',width:'70%'}
  const useStyles = makeStyles((theme) => ({
    content: {
      flexGrow: 1,
      padding: '10px',
    },

  }));
  const classes = useStyles();
return (
<>   <Grid style={draw}>
    <Drawer  />
    </Grid>
    <Grid style={content} align="left">
    <AppBar position="fixed"  className={classes.appBar}>
        <Toolbar>

          <h1>sdfsaaa&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;     </h1>
         <h1> Vote Blocks</h1>        
        </Toolbar>
      </AppBar>
    <div style={container} >
    <main className={classes.content}>
       <h1 >Welcome to Dashboard</h1>
      </main>
      </div>
      </Grid>
      </>
  );
}
export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: '/admin/adminlogin',
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
//getinitail probs working run buliding time start but not all incoming request
// export async function getServerSideProps(context) {
//   console.log(context);
  
// }
// export default ({ url: { query: { name } } }) => (
  
// )

// export async function getServerSideProps(context){
//   console.log(context.resolvedUrl);
// }
export default Dashboard;
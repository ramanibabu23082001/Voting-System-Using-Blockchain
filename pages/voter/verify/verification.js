import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '../../../components/voter/voterdrawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Verify from '../../../components/voter/verify';
import {Typography,Grid} from '@material-ui/core';
function Verifyvoter(props) {
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
        <div className={classes.toolbar} />
      <Verify address={props.address} />
      </main>
      </div>
      </Grid>
      </>
  );
}
export async function getServerSideProps(context){
 
  var str = context.resolvedUrl;
  var res =str.split("/");
  let address;
  if(res[3].length>42)
  {
   var str1=res[3].split("=");
   address=str1[1];
   console.log("=")
  }
  else
  {
   address=res[3];
   console.log("star");
  }
  console.log(address);
  return {
    props:{address}
  }
}
//getinitail probs working run buliding time start but not all incoming request
export default Verifyvoter;
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '../../components/admin/drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { getSession } from 'next-auth/client';
import {Typography,Grid} from '@material-ui/core';
import StartorStop from '../../components/admin/startorstop';
function Start() {
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
    <Grid style={content}>
    <AppBar position="fixed"  className={classes.appBar}>
        <Toolbar>
        <h1>sdfsaaa&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;     </h1>
         <h1> Vote Blocks</h1>

        </Toolbar>
      </AppBar>
    <div style={container} >
    <main className={classes.content}>
       <StartorStop />
      </main>
      </div>
      </Grid>
      </>
  );
}

//getinitail probs working run buliding time start but not all incoming request
export default Start;
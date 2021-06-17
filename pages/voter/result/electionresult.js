import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '../../../components/voter/voterdrawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import {Typography,Grid} from '@material-ui/core';
import {useEffect,useState} from 'react';
import Result from '../../../components/voter/resultbar';
import Winnertable from '../../../components/voter/winnerlist';
import Winner from '../../../components/voter/winner';
import Election from '../../../ethereum/Election';
//import Victory from '../../../components/video/Victory.mp4';
function Dashboard(props) {
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
  const [finished,Setfinished] =useState(0);
  useEffect(() => {
    (async function fetchPairs() {
      try{
      const election = Election(props.address);
      const no2= await election.methods.isStoped().call(); 
      if(no2)
      {
        Setfinished(2);
      }
      }
      catch(err){
    console.log(err);
      }
    })();
  }, []);
if(finished==2)
{  
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
        <Grid container spacing={3}>
          <Grid item xs={8}>
<Result address={props.address} />
</Grid>
<Grid item xs={4}>
<Winner address={props.address}/>
</Grid>
</Grid>
<br/>


<video autoPlay loop muted
      
      style ={{
    //   width:"100%",
       left:"15%",
        top:"35%",
        height:"300px",
        width:"100%",
       //transform:"translate(-50%,-50%)",
        zIndex:"-1",
      }}
 >
     < source src="/Victory.mp4" type="video/mp4"></source>
      </video> 
<br/>

<Winnertable address={props.address}/>  

      </main>
      </div>
      </Grid>
      </>
  );
}
else{
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
            <Result address={props.address} />
          </main>
          </div>
          </Grid>
          </>
      );
    } 

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
export default Dashboard;
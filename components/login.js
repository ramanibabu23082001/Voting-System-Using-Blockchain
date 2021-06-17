import {useState} from 'react';
import React from 'react';
import clsx from 'clsx';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import { Grid,Paper, Avatar, TextField, Button, Typography,Link } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import { signIn,getProviders } from 'next-auth/client';
import {Router} from "../routes";
function Login({handleChange}) {//get probs from handle change in containerfrom index.js
   
   
const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      alignItems: 'center',
    },
    wrapper: {
      margin: theme.spacing(1),
      position: 'relative',
    },
    buttonSuccess: {
      backgroundColor: '#4fc3f7',
      '&:hover': {
        backgroundColor: '#4fc3f7',
      },
    },
 
    buttonProgress: {
      color: '#4fc3f7',
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginTop: -12,
      marginLeft: -12,
    },
  }));
   const classes = useStyles();
  
 
    const paperStyle={padding :20,height:'60vh',width:340, margin:"0 auto"}
    {/*73vh means 70% height of the page margin for  from top */}
    const avatarStyle={backgroundColor:'#4fc3f7'}
    {/*background color for avathar icon */}
        {/*want to make it center pput into grid make and give align center*/}
    const btnstyle={margin:'8px 0'}
    {/*gap between button use of margin*/}
    const [address,setAddress] =useState();
    const [email,setEmail] =useState();
    const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
  });
     async function submitHandle(event) {
    event.preventDefault();
        setSuccess(false);
        setLoading(true);  
    const result = await signIn('credentials', {
        redirect: false,
        email: email,
        address: address,
        person: "user"
      });
     console.log(result);

     setSuccess(true);
     setLoading(false);
      if (!result.error) {
  Router.replaceRoute('/voter/voterdashboard'); 
      }
  }

    
    return(
        <Grid>
            <Paper  style={paperStyle}>{/*paper for division purpose */}
                <Grid align='center'>
                     <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                    <h2>Sign In</h2>
                </Grid>
              
                <TextField 
                label='Address'
                 placeholder='Enter address'
                 value={address}
                 onChange={e => setAddress(e.target.value)}
                   fullWidth required/>
                <TextField 
                label='Email'
                 placeholder='Enter email'
                  type='email' 
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                    fullWidth required/>
                <FormControlLabel
                    control={
                    <Checkbox
                        name="checkedB"
                        color="primary"
                    />
                    }
                    label="Remember me"
                 />
                 {/*fullwidth make button next line */}
                <Button type='submit' color='primary' variant="contained" style={btnstyle} onClick={submitHandle}  className={buttonClassname}
          disabled={loading} fullWidth >Sign in</Button>
                {loading && <CircularProgress size={24} className={classes.buttonProgress} />}  
                <Typography > Do you have an account ?
                     <Link href="#" onClick={()=>handleChange("event",1)} >{/**call fun of container in that signin as 0 and signup as 1 so goto to 1  */}
                        Sign Up 
                </Link>
                </Typography>
            </Paper>
        </Grid>
    )
}

export default Login;
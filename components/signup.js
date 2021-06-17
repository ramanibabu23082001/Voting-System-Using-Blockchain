import {useState} from 'react'
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Grid,Paper, Avatar, TextField, Button, Typography,Link } from '@material-ui/core'
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import web3 from '../ethereum/web3';
import {Router} from "../routes";
import authinstance from '../ethereum/authenticationinstance';

function SignUped({handleChange}) {//get probs from handle change in containerfrom index.js
      
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
   const [loading, setLoading] = React.useState(false);
   const [success, setSuccess] = React.useState(false);
 
   const buttonClassname = clsx({
     [classes.buttonSuccess]: success,
   });
 
    const paperStyle={padding :20,height:'60vh',width:340, margin:"0 auto"}
    {/*73vh means 70% height of the page margin for  from top */}
    const avatarStyle={backgroundColor:'#4fc3f7'}
    {/*background color for avathar icon */}
        {/*want to make it center pput into grid make and give align center*/}
    const btnstyle={margin:'8px 0'}
    {/*gap between button use of margin*/}
    const [address,setAddress] =useState("");
    const [email,setEmail] =useState("");
    async function submitHandler(event) {
        try {
              
    setSuccess(false);
    setLoading(true);  
            const accounts = await web3.eth.getAccounts();
            console.log(accounts[0]);
            console.log(email);
            const result = await authinstance.methods.signup(email).send({
              from : accounts[0]
            });
            console.log(result);
            setSuccess(true);
            setLoading(false); 
            // setAddress("");
            // setEmail("");
            handleChange("event",0);
          } catch (error) {
            console.log(error);
          } 
      }
    
    return(
        <Grid>
            <Paper  style={paperStyle}>{/*paper for division purpose */}
                <Grid align='center'>
                     <Avatar style={avatarStyle}><AddCircleOutlineOutlinedIcon/></Avatar>
                    <h2>Signup</h2>
                    <Typography variant='caption' gutterBottom>Please fill this form to create an account !</Typography>
                </Grid>
               
                <TextField label='Address' placeholder='Enter address' value={address} onChange={e => setAddress(e.target.value)} fullWidth required/>
                <TextField label='Email' placeholder='Enter email' type='email' value={email} onChange={e => setEmail(e.target.value)} fullWidth required/>
                {/* <FormControlLabel
                        control={<Checkbox name="checkedA" color="primary" />}
                        label="I accept the terms and conditions."
                    /> */}
                 {/*fullwidth make button next line */}
                <Button type='submit' color='primary' variant="contained" style={btnstyle} onClick={submitHandler}  className={buttonClassname}
 disabled={loading} fullWidth>Sign Up</Button>
                {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                <Typography > Already have account ?
                     <Link href="#" onClick={()=>handleChange("event",0)} >{/**call fun of container in that signin as 0 and signup as 1 so goto to 1  */}
                        Login
                </Link>
                </Typography>

            </Paper>
        </Grid>
    )
}

export default SignUped;
import {useState} from 'react';
import { Grid,Paper, Avatar, TextField, Button, Typography,Link } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { signIn,getProviders } from 'next-auth/client';
import {Router} from "../../routes";
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
function rand() {
    return Math.round(Math.random() * 20) - 10;
  }
  
  function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
  const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));
export default function Adlogin({handleChange}) {//get probs from handle change in containerfrom index.js
    const paperStyle={padding :20,height:'60vh',width:340, margin:"100px auto"}
    {/*73vh means 70% height of the page margin for  from top */}
    const avatarStyle={backgroundColor:'#4fc3f7'}
    {/*background color for avathar icon */}
        {/*want to make it center pput into grid make and give align center*/}
    const btnstyle={margin:'8px 0'}
    {/*gap between button use of margin*/}
    const [address,setAddress] =useState();
    const [email,setEmail] =useState();

     async function submitHandle(event) {
    event.preventDefault();

    if(address=="0x35Fdb886cAcEa821FB1b01f2B7230550f762A2FD"&&email=="ragul@gmail.com")
      {
          const result = await signIn('credentials', {
        redirect: false,
        email: email,
        address: address,
        person: "admin"
      });
     console.log(result);
      if (!result.error) {
  Router.replaceRoute('/admin/dashboard'); 
      }
    }
    else
    {
     handleOpen();
    }
  }
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const classes = useStyles();

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title" >Wrong !!</h2>
      <p id="simple-modal-description">
       Credentials are wrong please check the address and email
      </p>
    </div>
  );
    
    return(
      <>
        <Grid >
            <Paper  style={paperStyle}>{/*paper for division purpose */}
                <Grid align='center'>
                     <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
             <br/>
                    <h2>Admin Sign In</h2>
                </Grid>
                <br/>
                <TextField 
                label='Address'
                 placeholder='Enter address'
                 value={address}
                 onChange={e => setAddress(e.target.value)}
                   fullWidth required/>
                       <br/>
                <TextField 
                label='Email'
                 placeholder='Enter email'
                  type='email' 
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                    fullWidth required/>
             
             <br/>
                 {/*fullwidth make button next line */}
                <Button type='submit' color='primary' variant="contained" style={btnstyle} onClick={submitHandle} fullWidth >Sign in</Button>
            </Paper>
           
        </Grid>
         <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
      </>
    )
};
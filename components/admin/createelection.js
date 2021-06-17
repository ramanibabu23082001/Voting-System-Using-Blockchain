import React from 'react';
import {useState} from 'react';
import { Grid,Paper, Avatar, TextField, Button, Typography,Link } from '@material-ui/core';
import clsx from 'clsx';
import CircularProgress from '@material-ui/core/CircularProgress';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { signIn,getProviders } from 'next-auth/client';

import { makeStyles } from '@material-ui/core/styles';
import PostAddIcon from '@material-ui/icons/PostAdd';
import web3 from '../../ethereum/web3';
import electionfactoryinstance from '../../ethereum/electioninstance';
import {Router} from "../../routes";
function CreateElection({handleChange}) {//get probs from handle change in containerfrom index.js
    
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
    const avatarStyle={backgroundColor:'#ba68c8'}
    {/*background color for avathar icon */}
        {/*want to make it center pput into grid make and give align center*/}
    const btnstyle={margin:'8px 0'}
    {/*gap between button use of margin*/}
    const [electionname,setelectionname] =useState();
    const [placeofelection,setplaceofelection] =useState();

      async function submitHandler(event) {
           try{
          
    setSuccess(false);
    setLoading(true);  
            const accounts =await web3.eth.getAccounts();
               const confirmation =await electionfactoryinstance.methods.createElection(electionname,placeofelection).send({
                from:accounts[0]
                });
                console.log(confirmation);
                setSuccess(true);
                setLoading(false); 
                Router.replaceRoute('/admin/electionlist'); 
           }
           catch(err){
            setSuccess(true);
            setLoading(false); 
           }
     }

    
    return(
        <Grid>
            <Paper  style={paperStyle}>{/*paper for division purpose */}
                <Grid align='center'>
                     <Avatar style={avatarStyle}><PostAddIcon /></Avatar>
                    <br/>
                    <h2>New Election</h2>
                </Grid>
                <br />
                <TextField 
                label='Election Name'
                 placeholder='Enter election name'
                 value={electionname}
                 onChange={e => setelectionname(e.target.value)}
                   fullWidth required/>
                 <br />
                 <br />
                <TextField 
                label='Election Place'
                 placeholder='Enter placeofelection' 
                  value={placeofelection}
                  onChange={e => setplaceofelection(e.target.value)}
                    fullWidth required/>
                    <br/>
                    <br/>
                <Button type='submit' color='primary' variant="contained" style={btnstyle} 
                onClick={submitHandler}  className={buttonClassname}
                disabled={loading}
                fullWidth >Create</Button>
                {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
            </Paper>
        </Grid>
    )
}

export default CreateElection;
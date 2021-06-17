import React from 'react'
import {useState,useEffect,useRef} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import clsx from 'clsx';
import CircularProgress from '@material-ui/core/CircularProgress';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import {Button } from '@material-ui/core';
import Election from '../../ethereum/Election';
import web3 from '../../ethereum/web3';
import {Router} from "../../routes";
import { RadioButtonCheckedRounded } from '@material-ui/icons';
import Grow from '@material-ui/core/Grow';
function flipcard({address}) {
   
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
 
 const handleSubmit = (e) => {
    const answer = window.confirm("Are you sure to vote for this candidate?");
    if (answer) {
      // Save it!
      captureFile();
      console.log("You voted.");
    } else {
      // Do nothing!
	  e.preventDefault();
	}
    
  };
 
  const [spacing, setSpacing] = React.useState(2);

const para ={color:'black',fontsize:'15px'}
const card1 ={float:'left',  paddingLeft: 50}
const space={margin:'0px 0px 0px 135px'}
const [indexvalue,setIndexvalue] =useState();
const [candidatelist,setCandidatelist]=useState([]);
useEffect(() => {
    (async function fetchPairs() {
      try{
      const election = Election(address);
       const list = await election.methods.getallcandidates().call(); 
       console.log(list);
        setCandidatelist(list);
      }
      catch(err){
    console.log(err);
      }
    })();
}, []);

const [selectedValue, setSelectedValue] = React.useState();

const handleChange = (event) => {
  setSelectedValue(event.target.value);
  console.log(selectedValue);
};
async function captureFile()
{                      
  
  console.log(selectedValue);
   try{
 
    setSuccess(false);
    setLoading(true);  
    const accounts = await web3.eth.getAccounts();
    const election = Election(address);
    const addvoter =await election.methods.vote(selectedValue).send({
      from :accounts[0]
    });
    console.log(addvoter);
    setSuccess(true);
    setLoading(false); 
    Router.replace(`/voter/result/${address}`);
    }
    catch(err)
    {
    console.log(err);
    setSuccess(true);
    setLoading(false); 
    }

}

    return (
  		<>
       <Grid container spacing={2}>
          {candidatelist.map((value,index) => (
            <Grow
            in={true}
            style={{ transformOrigin: '0 0 0' }}
            {...(true ? { timeout: 2000 } : {})}
          >
      <Grid item xs={3}>
		<div style={card1}>          	
			<div class="father" id="1">
			<div class="front">
				<header>{value.name}</header>
				
				<img src={`https://ipfs.io/ipfs/${value.image}`} height="150px" width="190px" alt="stalin" />
        <button type="submit" name="material"><i class="material-icons"> {value.party} </i></button>
			</div>
			<div class="back">
        					<header><h3>{value.party}</h3></header>
						
      <h4 >Count:{value.votecount}</h4>
	
			</div>
		</div>
		</div>
<p> &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; </p>
   {/* <center> <Button type='submit' color='primary' variant="contained"  value={index} onChange={e => setIndexvalue(e.target.value)} 
 onClick={captureFile} >Vote</Button></center>  */}
   <center><Radio
        checked={selectedValue === `${value.votecount}`}
        onChange={handleChange}
        value={value.votecount}
        name="radio-button-demo"
        inputProps={{ 'aria-label': 'A' }}
      />
      </center>
    </Grid>    
    </Grow >                                                                                                                                                                                                                                                                         
       ))}
     
       </Grid> 
       <center> <Button type='submit' color='primary' variant="contained"  
 onClick={handleSubmit}  className={buttonClassname}
 disabled={loading} >Vote</Button>
 {loading && <CircularProgress size={24} className={classes.buttonProgress} />}  </center> 
	</>
  
    )
}

export default flipcard;
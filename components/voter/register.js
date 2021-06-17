import React from 'react'
import Webcam from "react-webcam";
import QRCode from 'qrcode';
import clsx from 'clsx';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import QrCode from 'qrcode-reader';
import {useState,useEffect} from 'react';
import { Grid,Paper, Avatar, TextField, Button, Typography,Link } from '@material-ui/core'
import HowToVoteIcon from '@material-ui/icons/HowToVote';
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import ipfs from '../../pages/ipfs';
import Election from '../../ethereum/Election';
import web3 from '../../ethereum/web3';
import Electionfactoryinstance from '../../ethereum/electioninstance';
import { SettingsPhoneTwoTone } from '@material-ui/icons';
import {Router} from "../../routes";
async function createUser(imgurl1, imgurl2) {
  const response = await fetch('http://localhost:5000/', {
    method: 'POST',
    body: JSON.stringify({ imgurl1, imgurl2 }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong!');
  }

  return data;
} 

const Registar=()=>{
  
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
  
   const [loading1, setLoading1] = React.useState(false);
   const [loading2, setLoading2] = React.useState(false);
   const [loading3, setLoading3] = React.useState(false);
   const [success1, setSuccess1] = React.useState(false);
   const [success2, setSuccess2] = React.useState(false);
   const [success3, setSuccess3] = React.useState(false);
   const buttonClassname1 = clsx({
     [classes.buttonSuccess]: success1,
   });
   const buttonClassname2 = clsx({
    [classes.buttonSuccess]: success2,
  });
  const buttonClassname3 = clsx({
    [classes.buttonSuccess]: success3,
  });
    const paperStyle1={padding :20,height:'130vh',width:420, margin:"20px auto"}
    const paperStyle2={padding :20,height:'130vh',width:350, margin:"20px auto"}
    const avatarStyle={backgroundColor:'#ba68c8'}
    const btnstyle={margin:'8px 0'}
    const coloring={color:'#ba68c8'}
    const color={color:'#ba68c8'}

   const webcamRef = React.useRef(null);
   const [screenshot,setScreenshot]=React.useState(null);


    //Gender
    const [name,setName] = useState('');
    const [age,setAge] = useState('');
    const [adharno,setAdharno] = useState('');
    const [buffer,setBuffer] = React.useState(null);
    const [gender, setGender] = React.useState('');
    const [place,setPlace]=useState('');
    const [photo, setPhoto] = useState('');
    const handleChange = (event) => {
      setGender(event.target.value);
    };
    const handleChangedropdown = (event) => {
      setPlace(event.target.value);
    };

    const d = [
	    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
	    [1, 2, 3, 4, 0, 6, 7, 8, 9, 5],
	    [2, 3, 4, 0, 1, 7, 8, 9, 5, 6],
	    [3, 4, 0, 1, 2, 8, 9, 5, 6, 7],
	    [4, 0, 1, 2, 3, 9, 5, 6, 7, 8],
	    [5, 9, 8, 7, 6, 0, 4, 3, 2, 1],
	    [6, 5, 9, 8, 7, 1, 0, 4, 3, 2],
	    [7, 6, 5, 9, 8, 2, 1, 0, 4, 3],
	    [8, 7, 6, 5, 9, 3, 2, 1, 0, 4],
	    [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
	]

	// permutation table
	const p = [
	    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
	    [1, 5, 7, 6, 2, 8, 3, 0, 9, 4],
	    [5, 8, 0, 3, 7, 9, 6, 1, 4, 2],
	    [8, 9, 1, 6, 0, 4, 3, 5, 2, 7],
	    [9, 4, 5, 3, 1, 2, 6, 8, 7, 0],
	    [4, 2, 8, 6, 5, 7, 3, 9, 0, 1],
	    [2, 7, 9, 3, 8, 0, 6, 4, 1, 5],
	    [7, 0, 4, 6, 9, 1, 3, 2, 5, 8]
	]

	// validates Aadhar number received as string
	function validate(aadharNumber) {
	    let c = 0
	    let invertedArray = aadharNumber.split('').map(Number).reverse()

	    invertedArray.forEach((val, i) => {
	        c = d[c][p[(i % 8)][val]]
	    })

	    return (c === 0)
	}
  
	function verify() {
		if(!validate(adharno)) {
    console.log("adhar not a valid one");
    window.alert("adhar no is not valid");
    }
	}

      const capture =React.useCallback(
       async () => {
        setSuccess1(false);
        setLoading1(true);  
        const imageSrc = webcamRef.current.getScreenshot();
          console.log(imageSrc);

const base64 = await fetch(imageSrc);
  
          const blob = await base64.blob();
          setScreenshot(imageSrc);
           let reader = new window.FileReader()
           reader.readAsArrayBuffer(blob)
           reader.onloadend = () => convertToBuffer(reader)
          console.log(screenshot);
          setSuccess1(true);
          setLoading1(false);
        },
        [webcamRef]
      );
      async function storeinipfs()
      {
        try{
       
        setSuccess2(false);
        setLoading2(true);  
          console.log("helllo ipfs")
          let results = await ipfs.add(buffer);
          let ipfsHash = results[0].hash;
          setPhoto(ipfsHash);
         console.log(ipfsHash);
         setSuccess2(true);
         setLoading2(false);
        }
        catch(err){
         console.log(err);
         setSuccess2(true);
         setLoading2(false); 
        }
      }
      
        const convertToBuffer = async(reader) => {
        //file is converted to a buffer for upload to IPFS
          const buffer = await Buffer.from(reader.result);
        //set this buffer -using es6 syntax
          setBuffer(buffer);
          console.log(buffer);
      };
        const [electionlist, setElectionlist] = useState([]);
      useEffect(() => {
        (async function fetchPairs() {
          try{
           const list = await Electionfactoryinstance.methods.getelecdetails().call(); 
           console.log(list);
            setElectionlist(list);
           console.log(list[0]);
          }
          catch(err){
        console.log(err);
          }
        })();
}, []);
async function submit()
{
try{
  verify();
  setSuccess3(false);
  setLoading3(true);  
  const jsonParsed = require("../../adhar.json");
  let authenticated=0;
  for(let i=0;i<9;i++)
  {
    if(jsonParsed[i].adhar_no==adharno)
    {
      console.log("adhar_no verified");
      if(jsonParsed[i].age>=18)
      {
        console.log("age verified");
        const imgurl1=jsonParsed[i].image;
        console.log(imgurl1);
        const imgurl2=`https://ipfs.io/ipfs/${photo}`;
        console.log(imgurl2);
        const result = await createUser(imgurl1,imgurl2);
        console.log(result.verified);
          if(result.verified=="yes")
          {
          console.log("face matched");
          authenticated=1;
          break;
          }
           else
          {
          window.alert("Face not matched");
          setSuccess3(true);
          setLoading3(false);
          console.log("face not matched");
          break;
          }
    }
     else
      {
        window.alert("Your Age is not greater then 18");
        console.log("age is not greater then 18");
        setSuccess3(true);
        setLoading3(false);
        break;
      }
    }
   
  }
  if(authenticated==1)
  {
 
const accounts = await web3.eth.getAccounts();
const electionaddress =await Electionfactoryinstance.methods.getaddress_from_place(place).call();
const election = Election(electionaddress);
const addvoter =await election.methods.addVoter(photo,name,age,adharno,gender).send({
  from :accounts[0]
});
console.log(addvoter);
setSuccess3(true);
setLoading3(false);
Router.replace(`/voter/verify/${electionaddress}`);
  }
  else{
    console.log("adhar no not exits");
    window.alert("Adhar no is invalid");
    setSuccess3(true);
    setLoading3(false);
  }
}
catch(err)
{
console.log(err);
setSuccess3(true);
setLoading3(false); 
}
}
    return(
      <>
          <Grid container spacing={3}>
          <Grid item xs={6}>
           <h2 style={color}>Take Picture</h2>
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              height={350}
              width={400}
            />
            <div>
              <div className='screenshots'>
                <div className='controls'>
      
                  <Button  color='primary' variant="contained" onClick={capture}  className={buttonClassname1}
          disabled={loading1 }>Take</Button>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  {loading1 && <CircularProgress size={24} className={classes.buttonProgress} />}
                  <Button  color='primary' variant="contained" onClick={storeinipfs}  className={buttonClassname2}
          disabled={loading2}>Upload</Button>
                  {loading2 && <CircularProgress size={24} className={classes.buttonProgress} />}  
                  
                </div>
                 <img src={screenshot} />
                 
              </div>
            </div>
          </Grid>
          <Grid item xs={6}>
                <Grid align='center'>
                     <Avatar style={avatarStyle}><HowToVoteIcon/></Avatar>
                     <br />
                    <h2 style={coloring}>Voter Registration</h2>
                </Grid>
                <br /><br />
                <TextField label='Voter Name' placeholder='Voter Name'
                  value={name}
                  onChange={e => setName(e.target.value)}  fullWidth required/><br /><br />
                <TextField label='Age' placeholder='Age' 
                value={age}
                onChange={e => setAge(e.target.value)} fullWidth required/><br /><br />
                <TextField label='Adhar No' placeholder='AdharNumber'     value={adharno}
                                onChange={e => setAdharno(e.target.value)} fullWidth required/><br /><br />
                
        <FormControl className={classes.formControl}>
        <InputLabel htmlFor="place-native-simple">Place</InputLabel>
        <Select
          native
          value={place} 
          onChange={handleChangedropdown} 
        >
          <option aria-label="None" value="" />
          {electionlist.map((value) => (
          <option value={value.place}>{value.place}</option>
          ))}
        </Select>
                 <h3 align='left'>Gender</h3>
      <RadioGroup aria-label="gender" name="gender"  value={gender} 
          onChange={handleChange} >
        <FormControlLabel value="female" control={<Radio />} label="Female" />
        <FormControlLabel value="male" control={<Radio />} label="Male" />
        <FormControlLabel value="other" control={<Radio />} label="Other" />
        
      </RadioGroup>
      
      </FormControl>     

                 <Button type='submit' color='primary' variant="contained" onClick={submit} className={buttonClassname3}
          disabled={loading3} fullWidth >Save</Button>
                 {loading3 && <CircularProgress size={24} className={classes.buttonProgress} />}  
            </Grid>
        </Grid>
        </>
    )
}

export default Registar;
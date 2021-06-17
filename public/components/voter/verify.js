import React from 'react'
import Webcam from "react-webcam";
import Select from '@material-ui/core/Select';
import {useState,useEffect} from 'react';
import { Grid,Paper, Avatar, TextField, Button, Typography,Link } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import ipfs from '../../pages/ipfs';
import Election from '../../ethereum/Election';
import web3 from '../../ethereum/web3';
import Electionfactoryinstance from '../../ethereum/electioninstance';
import {Router} from "../../routes";
import Modal from '@material-ui/core/Modal';
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
const Verify=({address})=>{

    const paperStyle1={padding :20,width:420}
    const paperStyle2={padding :20,height:'130vh',width:350, margin:"20px auto"}
    const avatarStyle={backgroundColor:'#ba68c8'}
    const btnstyle={margin:'8px 0'}
    const coloring={color:'#ba68c8'}
    const color={color:'#ba68c8'}

   const webcamRef = React.useRef(null);
   const [screenshot,setScreenshot]=React.useState(null);


    //Gender
 
    const [buffer,setBuffer] = React.useState(null);
    const [photo, setPhoto] = useState('');
    const [place,setPlace]=useState('');
    const handleChangedropdown = (event) => {
      setPlace(event.target.value);
    };
    const useStyles = makeStyles({
        root: {
          background: 'linear-gradient(45deg,#004d40  30%, #66bb6a 90%)',
          border: 0,
          borderRadius: 3,
          boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
          color: 'white',
          height: 48,
          padding: '0 30px',
        },
        
      });
      const classes = useStyles();
      const capture =React.useCallback(
       async () => {
          const imageSrc = webcamRef.current.getScreenshot();
          console.log(imageSrc);

const base64 = await fetch(imageSrc);

          const blob = await base64.blob();
          setScreenshot(imageSrc);
           let reader = new window.FileReader()
           reader.readAsArrayBuffer(blob)
           reader.onloadend = () => convertToBuffer(reader)
          console.log(screenshot);
        },
        [webcamRef]
      );
      async function storeinipfs()
      {
        try{
          console.log("helllo ipfs")
          let results = await ipfs.add(buffer);
          let ipfsHash = results[0].hash;
          setPhoto(ipfsHash);
         console.log(ipfsHash);
        }
        catch(err){
         console.log(err);
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
const accounts = await web3.eth.getAccounts();
console.log(accounts[0]);
const election = Election(address);
const voter =await election.methods.getvoter(accounts[0]).call();
console.log(voter);
console.log("photo");
console.log(voter.photo);
const imgurl1=`https://ipfs.io/ipfs/${voter.photo}`;
console.log(imgurl1);
const imgurl2=`https://ipfs.io/ipfs/${photo}`;
console.log(imgurl2);
const result = await createUser(imgurl1,imgurl2);
console.log(result.verified);
if(result.verified=="yes")
{
Router.replace(`/voter/${electionaddress}`);
}
else
{
  handleOpen();
}
}
catch(err)
{
console.log(err);
}
}
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
const [modalStyle] = React.useState(getModalStyle);
const [open, setOpen] = React.useState(false);
   
const handleClose = () => {
  setOpen(false);
};
const handleOpen = () => {
  setOpen(true);
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
         
                  <Button  color='primary' variant="contained" onClick={capture}>Take</Button>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <Button  color='primary' variant="contained" onClick={storeinipfs}>Upload</Button>
         <br />
      
                </div>
                 <img src={screenshot} />
                 
              </div>
            </div>
            </Grid>
            <Grid item xs={6} style={paperStyle1}>
              <h2 style={color}>VERIFY TO VOTE</h2>
              <br />
              <br/>
     
              
        <br/><br/>
        <Button  color='primary' variant="contained" onClick={submit}>Verify</Button>
          </Grid>
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
}

export default Verify;
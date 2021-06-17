import React from 'react'
import {useState} from 'react'
import { Grid,Paper, Avatar, TextField, Button, Typography,Link } from '@material-ui/core'
import HowToVoteIcon from '@material-ui/icons/HowToVote';
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import ipfs from '../../pages/ipfs';
import web3 from '../../ethereum/web3';
import Election from '../../ethereum/Election';
import {Router} from "../../routes";
//const Buffer = require('buffer/').Buffer
function Candidateform({address}) {
  //console.log(address);
    const paperStyle={padding :20,height:'130vh',width:350, margin:"20px auto"}
    const avatarStyle={backgroundColor:'#ba68c8'}
    const coloring={color:'#004d40'}
    //Gender
    const [gender, setGender] = React.useState('');
    const handleRadioChange = (event) => {
      setGender(event.target.value);
    };
    console.log("form"+address);
    //Button Style
    //  const classes = useStyles();
      const [name,setName] = useState('');
      const [age,setAge] = useState('');
      const [adharno,setAdharno] = useState('');
      const [profile,setProfile] = useState();
      const [buffer,setBuffer] = useState(null);
      const [publicaddress,setPublicaddress]=useState('');
      const [party, setparty] = useState();
     // const [file,setFile] =useState();
        const captureFile = async(event) =>{                       
          const file = event.target.files[0];
        let reader = new window.FileReader()
        reader.readAsArrayBuffer(file)
        reader.onloadend = () => convertToBuffer(reader)
        console.log(file);
        //filesend();

      }
      async function storeinipfs()
      {
        try{
          let results = await ipfs.add(buffer);
          let ipfsHash = results[0].hash;
          setProfile(ipfsHash);
         console.log(ipfsHash);
        }
        catch(err){
         console.log(err);
        }
      }
     async function onSubmit()
      {
        try{
                   
          const election = Election(address);
          const accounts= await web3.eth.getAccounts();
          console.log(name+" "+adharno+" "+party+" "+publicaddress+" "+age+" "+gender);
          const conformation= await election.methods.addCandidate(name,profile,adharno,party,publicaddress,age,gender).send({
          from : accounts[0]
          });
      console.log(conformation);
      location.reload();
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
    // async function onSubmit() {
    //       try{
    //         let results = await ipfs.add(buffer);
    //       let ipfsHash = results[0].hash;
    //       setProfile(ipfsHash);
    //      console.log(ipfsHash);
    //         ontranscation();
    //     }
    //     catch(err)
    //     {
    //       console.log(err);
    //     }
    //   }

     // console.log(file);
    return(
        <div>
             
        <Grid>
            <Paper  style={paperStyle}>
                <Grid align='center'>
                     <Avatar style={avatarStyle}><HowToVoteIcon/></Avatar>
                    <h2 style={coloring}>Candidate Registration</h2>
                </Grid>
                <TextField label='Candidate Name' placeholder='Candidate Name'
                
                value={name}
                onChange={e => setName(e.target.value)} fullWidth required/>
                 <TextField label='Party Name' placeholder='Party Name'
                
                value={party}
                onChange={e => setparty(e.target.value)} fullWidth required/>
                 <TextField label='Public Address' placeholder='Public Address'
                value={publicaddress}
                onChange={e =>setPublicaddress(e.target.value)} fullWidth required/>
                <TextField label='Age' placeholder='Age'  
                
                value={age}
                onChange={e => setAge(e.target.value)}
                fullWidth required/>
                <TextField label='Adhar No' placeholder='AdharNumber'
                                value={adharno}
                                onChange={e => setAdharno(e.target.value)}
                  fullWidth required/>
                
                <FormControl component="fieldset">
                    <h3 align='left'>Gender</h3>
      <RadioGroup aria-label="gender" name="gender" value={gender} onChange={handleRadioChange}> 
        <FormControlLabel value="female" control={<Radio />} label="Female" />
        <FormControlLabel value="male" control={<Radio />} label="Male" />
        <FormControlLabel value="other" control={<Radio />} label="Other" />
        
      </RadioGroup>
        <h3 align='left'>Profile Photo</h3>
        <input type="file" 
        onChange={captureFile}
        ></input>
            <Button onClick={storeinipfs} color='primary' variant='contained'>upload</Button>  
<br/><br/>
               <Button type='submit'align='center' color='primary' variant='contained' fullWidth onClick={onSubmit}>ADD</Button>
              
               </FormControl>
               
            </Paper>
        </Grid>
        </div>
    )
}

export default Candidateform;
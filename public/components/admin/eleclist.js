import React from 'react';
import {useEffect ,useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Avatar } from '@material-ui/core';
import indigo from '@material-ui/core/colors/indigo';
import Electionfactoryinstance from '../../ethereum/electioninstance';
import web3 from '../../ethereum/web3';
import {Link} from '../../routes';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
        
  },
  media: {
      height: 120,
    backgroundcolor:indigo,
  },

  control: {
    padding: theme.spacing(2),
  },
}));
 function Eleclist() {
  const [spacing, setSpacing] = React.useState(5);
  const classes = useStyles();

  const handleChange = (event) => {
      
    setSpacing(Number(event.target.value));
  };

const [electionlist,setElectionlist]=useState([]);
 
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
console.log(electionlist);
  return (
    <div>
    
    <Grid container className={classes.root} spacing={6}>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={spacing}>
          {electionlist.map((value) => (
            <Grid key={value} item>
               <Card className={classes.root}>
      <CardActionArea>
       
        <CardContent>
          <Typography gutterBottom variant="h5" >
            {value.place}
          </Typography>
          <Typography  variant="h8" color="primary" component="p">
            {value.name}
            </Typography>
            <Typography  variant="h7" color="primary" component="p">   
            06-04-2021
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Link route={`/admin/${value.elec_address}`} >
       <Button size="medium" variant="contained" color="primary">
      {/* {value.elec_address} */}
      View Election
        </Button>
        </Link>
      </CardActions>
    </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
     </Grid>
  </div>
  );
}
export default Eleclist;
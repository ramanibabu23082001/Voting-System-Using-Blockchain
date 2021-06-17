import React from  'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import {useState,useEffect} from 'react';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Avatar } from '@material-ui/core';
import Election from '../../ethereum/Election';
function SpacingGrid({address}) {
    const useStyles = makeStyles((theme) => ({
        root: {
          flexGrow: 1,
        },
        color:
        {
          backgroundColor:'#ba68c8',
          color:'#fafafa'
        },
        media: {
          
          height: 150,
          width:200,
        },
      
        control: {
          padding: theme.spacing(2),
        },
      }));
      
const [candidatelist,setCandidatelist]=useState([]);
 
useEffect(() => {
        (async function fetchPairs() {
          try{
          const election = Election(address);
           const list = await election.methods.getallcandidates().call(); 
           console.log(list);
            setCandidatelist(list);
           console.log(list[0]);
          }
          catch(err){
        console.log(err);
          }
        })();
}, []);
    const [spacing, setSpacing] = React.useState(5);
  const classes = useStyles();

  const handleChange = (event) => {
    setSpacing(Number(event.target.value));
  };
  const background={backgroundcolor:'#ba68c8'}
  return (
    <div>
    <Grid container className={classes.root} spacing={6}>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={spacing}>
          {candidatelist.map((value) => (
            <Grid key={value} item >
               <Card className={classes.root} style={background}>
      <CardActionArea>
      <CardMedia
          className={classes.media}
          image={`https://ipfs.io/ipfs/${value.image}`}
          title="Contemplative Reptile"
        />
        {/* <img src={`https://ipfs.io/ipfs/$`} */}
        <CardContent  className={classes.color}>
          <Typography gutterBottom variant="h6" >
            {value.name}
          </Typography>
          <Typography variant="h6">
            {value.party}
          </Typography>
          
          {/* <Typography variant="h6" >
            {value.gender}
          </Typography> */}
        </CardContent>
      </CardActionArea>
      {/* <CardActions>
       <Button size="small" variant="contained" color="primary" disabled>
          learnmore
        </Button> 
      </CardActions> */}
    </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
     </Grid>
  </div>
  );
}
export default SpacingGrid;
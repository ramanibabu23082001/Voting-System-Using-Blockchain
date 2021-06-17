import React from 'react';
import {useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Popover from '@material-ui/core/Popover';
import Election from '../../ethereum/Election';
const useStyles = makeStyles({
  root: {
    maxWidth: 200,
  },
  media: {
    height: 170,
  },
  typography: {
    padding: 2,
  },
});

export default function Winner({address}) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  const [winner,setwinner]=useState([]);
 
  useEffect(() => {
          (async function fetchPairs() {
            try{
            const election = Election(address);
             const list = await election.methods.winnername().call(); 
            console.log("winner name");
             console.log(list);
              setwinner(list);
             console.log(list[0]);
            }
            catch(err){
          console.log(err);
            }
          })();
  }, []);

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={`https://ipfs.io/ipfs/${winner[2]}`}
          title="Contemplative Reptile"
        />
       
      </CardActionArea>
      <CardActions>
        <Button  aria-describedby={id} variant="contained" color="primary" onClick={handleClick}>
      
          View Name
        </Button>
        <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Typography color="textSecondary" variant="h6"className={classes.typography}>  Party Name : {winner[1]}</Typography>
      </Popover>
        <Button size="small" color="primary" aria-describedby={id} variant="contained" color="primary" onClick={handleClick}>
      
          Learn More
        </Button>
        
      </CardActions>
    </Card>
  );
}

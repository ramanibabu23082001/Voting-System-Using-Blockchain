import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {Grid} from '@material-ui/core';
import TouchAppIcon from '@material-ui/icons/TouchApp';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  const size={width:'40px',height:'30px'}
  const button={}
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                   <MenuIcon />
          </IconButton> */}
          <Typography variant="h4" className={classes.title}>
          <TouchAppIcon style={size} />
            Vote Blocks
          </Typography>
         <Grid align="right"> <Button color="inherit" >LOGIN</Button>    
          <Button color="inherit" href=''>SIGNUP</Button>  
          <Button color="inherit" href='/admin/adminlogin' >ADMIN LOGIN</Button>      
          </Grid>  
        </Toolbar>
      </AppBar>
    </div>
  );
}

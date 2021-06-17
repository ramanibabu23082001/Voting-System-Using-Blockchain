import React from 'react';
import { useSession, signOut } from 'next-auth/client';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import Avatar from '@material-ui/core/Avatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {Router} from "../../routes";
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import ListAltIcon from '@material-ui/icons/ListAlt';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';
import BallotIcon from '@material-ui/icons/Ballot';
import FlipIcon from '@material-ui/icons/Flip';
import HowToVoteIcon from '@material-ui/icons/HowToVote';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import HowToRegIcon from '@material-ui/icons/HowToReg';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
const iconcolor={backgroundColor:'#ba68c8'};
import DashboardIcon from '@material-ui/icons/Dashboard';
const backcolor={backgroundColor:'#ba68c8'};
const drawerWidth = 240;
const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
  },
  drawer: {
    width: drawerWidth,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  // necessary for content 
}));
const itemsList = [
  {
    text:"Dashboard",
    icon: <Avatar style={iconcolor}><DashboardIcon/></Avatar>, 
    onClick: () => Router.replace('/voter/voterdashboard')
  },
    {
      text: "Registration",
      icon: <Avatar style={iconcolor}> <HowToRegIcon/></Avatar>, 
      onClick: () => Router.replace('/voter/registration')
    },
    {
      text: "VerifyForVote",
      icon: <Avatar style={iconcolor}> <HowToRegIcon/></Avatar>, 
      onClick: () => Router.replace('/voter/verifyvoter')
    },
    {
      text: "Vote for Candidate",
      icon: <Avatar style={iconcolor}><HowToVoteIcon/></Avatar> ,
      onClick: () => Router.replace('/voter/votingprocess')
    },
    {
      text: "Result",
      icon:<Avatar style={iconcolor}><  TrendingUpIcon/></Avatar> ,
      onClick: () => Router.replace('/voter/result/electionresult')
    },
    {
      text:"Logout",
      icon: <Avatar style={iconcolor}> <ExitToAppIcon/></Avatar>,
      onClick: () => logoutHandler()
    }
  ];
  function logoutHandler() {
    signOut();
  }
export default function PermanentDrawerLeft() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <List >
          {['Voter'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon> <Avatar style={iconcolor}><AssignmentIndIcon /></Avatar></ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
        {itemsList.map((item, index) => {
          const { text, icon, onClick } = item;
          return (
            <ListItem button key={text} onClick={onClick}>
              {icon && <ListItemIcon>{icon}</ListItemIcon>}
              <ListItemText primary={text} />
            </ListItem>
          );
        })}
      </List>
        <Divider />
      </Drawer>      
    </div>
  );
}

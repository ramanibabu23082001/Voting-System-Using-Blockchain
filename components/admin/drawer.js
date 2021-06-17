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
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import {Router} from "../../routes";
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import ListAltIcon from '@material-ui/icons/ListAlt';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';
import BallotIcon from '@material-ui/icons/Ballot';
import FlipIcon from '@material-ui/icons/Flip';
import DashboardIcon from '@material-ui/icons/Dashboard';
const iconcolor={backgroundColor:'#ba68c8'};
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
      onClick: () => Router.replace('/admin/dashboard')
    },
    {
      text: "Create Election",
      icon: <Avatar style={iconcolor}> <AddToPhotosIcon/></Avatar>, 
      onClick: () => Router.replace('/admin/electioncreation')
    },
    {
      text: "Election List",
      icon: <Avatar style={iconcolor}><ListAltIcon /></Avatar> ,
      onClick: () => Router.replace('/admin/electionlist')
    },
    {
      text: "Start/Stop Election",
      icon:<Avatar style={iconcolor}><FlipIcon /></Avatar> ,
      onClick: () => Router.replace('/admin/start')
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
        <List>
          {['ADMIN'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon> <Avatar style={iconcolor}><SupervisorAccountIcon/></Avatar></ListItemIcon>
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
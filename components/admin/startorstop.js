import React from 'react';
import {useEffect,useState} from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Link from "@material-ui/core/Link"
import Electionfactoryinstance from '../../ethereum/electioninstance';
import TimerSharpIcon from '@material-ui/icons/TimerSharp';
import AlarmOffSharpIcon from '@material-ui/icons/AlarmOffSharp';
import Election from '../../ethereum/Election';
import web3 from '../../ethereum/web3';
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#ba68c8',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function StartorStop() {
  const classes = useStyles();
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
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>ID</StyledTableCell>
            <StyledTableCell align="right">Election Name</StyledTableCell>
            <StyledTableCell align="right">Place</StyledTableCell>
            <StyledTableCell align="right">address</StyledTableCell>
            <StyledTableCell align="right">Start</StyledTableCell>
            <StyledTableCell align="right">Stop</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {electionlist.map((value,index) => (
            <StyledTableRow key={value.elec_address}>
              <StyledTableCell component="th" scope="row">
                {index+1}
              </StyledTableCell>
              <StyledTableCell align="right">{value.name}</StyledTableCell>
              <StyledTableCell align="right">{value.place}</StyledTableCell>
              <StyledTableCell align="right">{value.elec_address}</StyledTableCell>
              <StyledTableCell align="right"> <Link
      component="button"
      variant="body2"
      onClick={async() => {
       try{
        console.log(value.elec_address);
        const accounts= await web3.eth.getAccounts();
        const election = Election(value.elec_address);
        const no1 = await election.methods.isStarted().call(); 
        const no2= await election.methods.isStoped().call(); 
        if(!no1&&!no2)
        {
        const no = await election.methods.startelection().send({
          from :accounts[0]
        });
        }
      }
      catch(err)
      {
console.log(err);
      }
       
      }}
    >< TimerSharpIcon  color="primary"/></Link></StyledTableCell>
              <StyledTableCell align="right">
              <Link
      component="button"
      variant="body2"
      onClick={async() => {
        try{
        const accounts= await web3.eth.getAccounts();
        const election = Election(value.elec_address);
        const no1 = await election.methods.isStarted().call(); 
        const no2= await election.methods.isStoped().call(); 
        if(no1&& !no2)
        {const no = await election.methods.stopelection().send({
          from :accounts[0]
        });
        }
      }
      catch(err)
      {
console.log(err);
      }
      }}
    ><AlarmOffSharpIcon color="secondary"/>
    </Link></StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

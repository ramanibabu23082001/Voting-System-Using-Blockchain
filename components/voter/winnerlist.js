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
import Link from "@material-ui/core/Link";
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


const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function Winnerlist({address}) {
  const classes = useStyles();
      
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
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>ID</StyledTableCell>
            <StyledTableCell align="right">Candidate Name</StyledTableCell>
            <StyledTableCell align="right">Party</StyledTableCell>
            <StyledTableCell align="right">Votecount</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {candidatelist.map((value,index) => (
            <StyledTableRow key={value.elec_address}>
              <StyledTableCell component="th" scope="row">
                {index+1}
              </StyledTableCell>
              <StyledTableCell align="right">{value.name}</StyledTableCell>
              <StyledTableCell align="right">{value.party}</StyledTableCell>
              <StyledTableCell align="right">{value.votecount}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

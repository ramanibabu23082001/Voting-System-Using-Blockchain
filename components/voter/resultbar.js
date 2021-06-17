import React from 'react'
import { Bar,Pie } from 'react-chartjs-2';
import {Paper} from '@material-ui/core';
import {useEffect ,useState} from 'react';
import Election from '../../ethereum/Election';
function BarChart({address}){
  const [candidatelist,setCandidatelist]=useState([]);
  const partynames=[];
  const partycount=[];
  useEffect(() => {
    (async function fetchPairs() {
      try{
        console.log(address);
      const election = Election(address);
      console.log(election); 
      const list = await election.methods.getallcandidates().call(); 
     console.log("asdf");
       console.log(list);
        setCandidatelist(list);
      list.map((value) => 
      {
           partynames.push(value.party)
           partycount.push(value.votecount)
           console.log(value.party);
           console.log(value.votecount);
      });
      // for( var x in candidatelist)
      // {
      //   partynames.push(x.party)
      //   partycount.push(x.votecount)
      
      // }

      }
      catch(err){
    console.log(err);
      }

    })();
  }, []);
  //console.log(partynames);
  //console.log(partycount);
  const barsize={width:'300px',height:'500px'}
 

//  useEffect(() => {
//     (async function fetchPairs() {
//       try{
//        const election = Election("0xaD2A79eB89f94c7AD930aAC6B148D8edC93Bd5DE");
//        const list = await election.methods.getallcandidates().call();
//        console.log("electionlist");
//        console.log(list);
//        setCandidatelist(list);
//        candidatelist.map((value,index) => 
//       {
//            partynames.push(value.party)
//            partycount.push(value.votecount)
//       });
//       console.log(partynames);
//       }
//       catch(err){
//     console.log(err);
//       }
//     })();
// }, []);   

//console.log(partynames);
//console.log(partycount);
 return (
        <>
              
   <Pie
              data ={{
                  labels: partynames,
                  datasets: [{
                    label: 'Election Result',
                    data: partycount,
                    fill : true,
                    categoryPercentage: 1.0,
                    barPercentage: 0.2,
                
                    backgroundColor: [
                        'green',
                        'red',
                        'Black',
                        'Blue',
                    ],
                    borderColor: [
                             'green',
                        'Red',
                        'black',
                        'Blue',
                                        ],
                    borderWidth: 0
        
                },],
              
                }} 
              height={300}
              width={1000}
              //fill : false
              options={
                  {

                  //maintainAspectRatio:false,

              }
              
            }
            />
          
        </>
    )
}
export default BarChart;
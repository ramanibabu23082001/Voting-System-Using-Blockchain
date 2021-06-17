pragma experimental ABIEncoderV2;
pragma solidity ^0.4.26;
contract ElectionFactory{
    address[] public deployedElections;
    mapping(string => address) getplace;
    struct Elec
    {
        string name;
        string place;
        address elec_address;
    }
    Elec[] public elecdetails;
    
    function createElection(string Electionname,string placeofElection) public{
    address newElection  = new Election(Electionname,placeofElection,msg.sender);   
    deployedElections.push(newElection);
    getplace[placeofElection]=newElection;
     Elec memory newelec = Elec({
          name:Electionname,
          place:placeofElection,
          elec_address:newElection
      });
      elecdetails.push(newelec);
    }
    function getDeployedElections() public view returns(address[])
    {
        return deployedElections;
    }
    function getaddress_from_place(string place) public view returns(address)
    {
        return getplace[place];
    }
    function getelecdetails() public view returns(Elec[])
    {
        return elecdetails;
    }
}
contract Election{
//Candidate module
    string Electionname;
    string placeofElection;
    address public admin;
    constructor(string name,string place,address createraddress) public {
        admin =createraddress;
        Electionname=name;
        placeofElection=place;
    }
    
	struct CandidateDetails {
        string name;
        uint age;
        string gender;
        address addr;
        string image;
        string adharnumber;
        string party;
        uint votecount;
    }
    
     uint public election_status=0;
     uint public numCandidates;
     
     CandidateDetails[] public candidatelist;

     struct Voter {
        bool newuser;
        string photo;
        string name;
        uint age;
        string adharno;
        string gender;
        bool voted;  // if true, that person already voted
        uint vote;   // index of the voted proposal
     }     
    mapping(address => Voter) public voters;
         
  
      function addCandidate(string candidatename, string imageurl,string adharcardno,string partyname,address Candidate_address,uint age,string gender) public {
        // Create new Candidate Struct with name and saves it to storage.
        require(
            msg.sender == admin,
            "Only admin can add candidates."
        );
        bool newuser=true;
        for(uint i=0;i<candidatelist.length;i++)
        {
            if(candidatelist[i].addr==Candidate_address)
            {
                newuser=false;
                break;
            }
        }
        require(newuser,"candidate already exists");
        
        numCandidates++;
       CandidateDetails memory newcandidate = CandidateDetails({
          name:candidatename, 
          age:age,
          gender:gender,
          addr:Candidate_address,
          image:imageurl,
          party:partyname,
          adharnumber:adharcardno,
          votecount:0
      });
       candidatelist.push(newcandidate);
      }
     function getNumOfCandidates() public view returns(uint) {
        return numCandidates;
    }
      function getCandidate(uint candidateId) public view returns (string,string) {
        CandidateDetails memory v = candidatelist[candidateId];
        return (v.name,v.party);
     }
     function getallcandidates() public view returns(CandidateDetails[])
     {
         return candidatelist;
     }
     uint public votercount;
       function addVoter(string photo, string name,uint age,string adharno,string gender) public {
        // Create new Candidate Struct with name and saves it to storage.
        
        require(!voters[msg.sender].newuser,"voter already exists");
                  for (uint p = 0; p <votercount ; p++) {
           require((keccak256(abi.encodePacked((voters[msg.sender].adharno))) == keccak256(abi.encodePacked((adharno)))),"adharno is duplicate");
             
            
           }
        votercount++;
       Voter memory newvoter = Voter({
          name:name, 
          age:age,
          gender:gender,
          photo:photo,
          adharno:adharno,
          voted:false,
          newuser:true,
          vote:100
      });
       voters[msg.sender]=newvoter;
      }
      function getvoter(address id) public view returns(Voter)
      {
      return voters[id];    
      }
        function vote(uint proposal) public {

         require(voters[msg.sender].newuser,"voter is not registered");
        require(election_status==1,"election not started yet or ended");
        Voter storage sender = voters[msg.sender];
        require(!sender.voted, "Already voted.");
        sender.voted = true;
        sender.vote = proposal;
        candidatelist[proposal].votecount+=1;
       }

       function isStarted() public view returns(bool)
       {
           bool started=false;
           if(election_status==1)
           {
               started=true;
           }
           return started;
       }
        function isStoped() public view returns(bool)
       {
           bool stoped=false;
           if(election_status==2)
           {
               stoped=true;
           }
           return stoped;
       }
       function startelection() public
       {
               require(
            msg.sender == admin,
            "Only admin can start election"
        );
           election_status=1;
       }
       function stopelection() public
       {
               require(
            msg.sender == admin,
            "Only admin can stop election"
        );
           election_status=2;
           declarewinner();
       }
          uint public winnerindex;
          function declarewinner() private
          {
           uint winningVoteCount = 0;
           for (uint p = 0; p < candidatelist.length; p++) {
           if (candidatelist[p].votecount > winningVoteCount) {
                winningVoteCount = candidatelist[p].votecount;
                winnerindex= p;
            }
          }
          }
          function winnername() public view returns(string,string,string)
          {
              return (candidatelist[winnerindex].name,candidatelist[winnerindex].party,candidatelist[winnerindex].image);
          }
 
}
// pragma experimental ABIEncoderV2;
// pragma solidity ^0.4.26;
// contract ElectionFactory{
//     address[] public deployedElections;
//     mapping(string => address) getplace;
//     struct Elec
//     {
//         string name;
//         string place;
//         address elec_address;
//     }
//     Elec[] public elecdetails;
    
//     function createElection(string Electionname,string placeofElection) public{
//     address newElection  = new Election(Electionname,placeofElection,msg.sender);   
//     deployedElections.push(newElection);
//     getplace[placeofElection]=newElection;
//      Elec memory newelec = Elec({
//           name:Electionname,
//           place:placeofElection,
//           elec_address:newElection
//       });
//       elecdetails.push(newelec);
//     }
//     function getDeployedElections() public view returns(address[])
//     {
//         return deployedElections;
//     }
//     function getaddress_from_place(string place) public view returns(address)
//     {
//         return getplace[place];
//     }
//     function getelecdetails() public view returns(Elec[])
//     {
//         return elecdetails;
//     }
// }
// contract Election{
// //Candidate module
//     string Electionname;
//     string placeofElection;
//     address public admin;
//     constructor(string name,string place,address createraddress) public {
//         admin =createraddress;
//         Electionname=name;
//         placeofElection=place;
//     }
    
// 	struct CandidateDetails {
//         string name;
//         uint age;
//         string gender;
//         address addr;
//         string image;
//         string adharnumber;
//         string party;
//         uint votecount;
//     }
    
//      uint public election_status=0;
//      uint public numCandidates;
     
//      CandidateDetails[] public candidatelist;

//      struct Voter {
//         bool newuser;
//         string photo;
//         string name;
//         uint age;
//         string adharno;
//         string gender;
//         bool voted;  // if true, that person already voted
//         uint vote;   // index of the voted proposal
//      }     
//     mapping(address => Voter) public voters;
         
  
//       function addCandidate(string candidatename, string imageurl,string adharcardno,string partyname,address Candidate_address,uint age,string gender) public {
//         // Create new Candidate Struct with name and saves it to storage.
       
//         bool newuser=true;
//         for(uint i=0;i<candidatelist.length;i++)
//         {
//             if(candidatelist[i].addr==Candidate_address)
//             {
//                 newuser=false;
//                 break;
//             }
//         }
//         require(newuser,"candidate already exists");
        
//         numCandidates++;
//        CandidateDetails memory newcandidate = CandidateDetails({
//           name:candidatename, 
//           age:age,
//           gender:gender,
//           addr:Candidate_address,
//           image:imageurl,
//           party:partyname,
//           adharnumber:adharcardno,
//           votecount:0
//       });
//        candidatelist.push(newcandidate);
//       }
//      function getNumOfCandidates() public view returns(uint) {
//         return numCandidates;
//     }
//       function getCandidate(uint candidateId) public view returns (string,string) {
//         CandidateDetails memory v = candidatelist[candidateId];
//         return (v.name,v.party);
//      }
//      function getallcandidates() public view returns(CandidateDetails[])
//      {
//          return candidatelist;
//      }
//      uint public votercount;
//        function addVoter(string photo, string name,uint age,string adharno,string gender) public {
//         // Create new Candidate Struct with name and saves it to storage.
//         require(!voters[msg.sender].newuser,"voter already exists");
//         votercount++;
//        Voter memory newvoter = Voter({
//           name:name, 
//           age:age,
//           gender:gender,
//           photo:photo,
//           adharno:adharno,
//           voted:false,
//           newuser:true,
//           vote:100
//       });
//        voters[msg.sender]=newvoter;
//       }
//       function getvoter(address id) public view returns(Voter)
//       {
//       return voters[id];    
//       }
//         function vote(uint proposal) public {
//         require(election_status==1,"election not started yet or ended");
//         Voter storage sender = voters[msg.sender];
//         require(!sender.voted, "Already voted.");
//         sender.voted = true;
//         sender.vote = proposal;
//         candidatelist[proposal].votecount+=1;
//        }

//        function isStarted() public view returns(bool)
//        {
//            bool started=false;
//            if(election_status==1)
//            {
//                started=true;
//            }
//            return started;
//        }
//         function isStoped() public view returns(bool)
//        {
//            bool stoped=false;
//            if(election_status==2)
//            {
//                stoped=true;
//            }
//            return stoped;
//        }
//        function startelection() public
//        {
//            election_status=1;
//        }
//        function stopelection() public
//        {
//            election_status=2;
//            declarewinner();
//        }
//           uint public winnerindex;
//           function declarewinner() public
//           {
//            uint winningVoteCount = 0;
//            for (uint p = 0; p < candidatelist.length; p++) {
//            if (candidatelist[p].votecount > winningVoteCount) {
//                 winningVoteCount = candidatelist[p].votecount;
//                 winnerindex= p;
//             }
//           }
//           }
//           function winnername() public view returns(string,string,string)
//           {
//               return (candidatelist[winnerindex].name,candidatelist[winnerindex].party,candidatelist[winnerindex].image);
//           }
 
// }
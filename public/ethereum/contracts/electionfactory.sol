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
        Voter storage sender = voters[msg.sender];
        require(!sender.voted, "Already voted.");
        sender.voted = true;
        sender.vote = proposal;
        candidatelist[proposal].votecount+=1;
       }
}
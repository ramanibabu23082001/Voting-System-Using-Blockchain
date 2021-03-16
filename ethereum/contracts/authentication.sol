pragma solidity ^0.4.26;

contract Authentication {
    struct User 
    {
        string name;
    }
    mapping (address => User) public users;
    string constant NULL ="";
    modifier only_for_existinguser
    {
        require(!(keccak256(abi.encodePacked(users[msg.sender].name)) == keccak256(abi.encodePacked(NULL))),"this user name is not exist");
     //  require(!(keccak256(abi.encodePacked(users[msg.sender].password)) == keccak256(abi.encodePacked(NULL))),"this user password is not exist");
        _;
    }
    function signup(string name) public {
    //new user
    
    if((keccak256(abi.encodePacked(users[msg.sender].name)) == keccak256(abi.encodePacked(NULL))))
    {
        users[msg.sender].name = name;
    }
    //already exists
     //getuser()
    }
    
    function login(string name) public view only_for_existinguser returns(string)
    {
       return users[msg.sender].name;
    }
    // function getuser() public view returns(string)
    // {
    //   return users[msg.sender].name;
    // } 
}
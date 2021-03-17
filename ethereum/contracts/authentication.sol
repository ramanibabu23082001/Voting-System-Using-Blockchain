pragma solidity ^0.4.26;

contract Authentication {
    struct User 
    {
        string name;
    }
    mapping (address => User) public users;
    string constant NULL ="";
    // modifier only_for_existinguser
    // {
    //     require((keccak256(abi.encodePacked(users[msg.sender].name)) == keccak256(abi.encodePacked(NULL))),"this user name is not exist");
    //  //  require(!(keccak256(abi.encodePacked(users[msg.sender].password)) == keccak256(abi.encodePacked(NULL))),"this user password is not exist");
    //     _;
    // }
    function signup(string name) public {
    //new user
    
    if((keccak256(abi.encodePacked(users[msg.sender].name)) == keccak256(abi.encodePacked(NULL))))
    {
        users[msg.sender].name = name;
    }
    //already exists
     //getuser()
    }
    
    function login(address public_address,string name) public view  returns(string)
    {
         require(!(keccak256(abi.encodePacked(users[public_address].name)) == keccak256(abi.encodePacked(NULL))),"this user name is not exist");
       return users[public_address].name;
       
    }
    // function getuser() public view returns(string)
    // {
    //   return users[msg.sender].name;
    // } 
}
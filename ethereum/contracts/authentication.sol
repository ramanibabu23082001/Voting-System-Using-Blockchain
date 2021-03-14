pragma solidity ^0.4.26;

contract Authentication {
    struct User 
    {
        string name;
        string password;
    }
    mapping (address => User) private users;
    string constant NULL ="";
    modifier only_for_existinguser
    {
        require(!(keccak256(abi.encodePacked(users[msg.sender].name)) == keccak256(abi.encodePacked(NULL))),"this user name is not exist");
       require(!(keccak256(abi.encodePacked(users[msg.sender].password)) == keccak256(abi.encodePacked(NULL))),"this user password is not exist");
        _;
    }
    function signup(string name,string password) public returns(string,string){
    //new user
    
    if((keccak256(abi.encodePacked(users[msg.sender].name)) == keccak256(abi.encodePacked(NULL))))
    {
        users[msg.sender].name = name;
        
        users[msg.sender].password=password;
        return (users[msg.sender].name,users[msg.sender].password);
    }
    //already exists
    return (users[msg.sender].name,users[msg.sender].password);
    }
    
    function login(string name ,string password) public only_for_existinguser returns(string ,string)
    {
        return (users[msg.sender].name,users[msg.sender].password);
    }
}
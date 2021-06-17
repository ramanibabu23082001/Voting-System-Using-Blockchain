const path = require('path');
const solc =require('solc');
const fs = require('fs-extra');//improved version of fs extra functions there 

const buildPath = path.resolve(__dirname,'build');
//fs.removeSync(buildPath);//remmove all files in build folder

const authenticationPath=path.resolve(__dirname,'contracts','authentication.sol');

const source =fs.readFileSync(authenticationPath,'utf8');

const output = solc.compile(source,0).contracts;//contains two contracts
//console.log(output);
fs.ensureDirSync(buildPath);//check build folder ezits 

console.log(output);
for (let contract in output)
{
    fs.outputJSONSync(//it will create json files for compiled contract
     path.resolve(buildPath,contract.replace(':','')+'.json'),//
     output[contract]
    );
}
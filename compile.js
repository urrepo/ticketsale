const path = require('path');
const fs = require('fs');
const solc = require('solc');

const inboxPath = path.resolve(__dirname, 'contracts', 'ticketsale.sol');
const source = fs.readFileSync(inboxPath, 'utf8');
//console.log(source);

let input = {
  language: "Solidity",
  sources: {
    "ticketsale.sol": {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["abi", "evm.bytecode"],
      },
    },
  },
};
//console.log(JSON.stringify(input))
//console.log(solc.compile(JSON.stringify(input)));
const output = JSON.parse(solc.compile(JSON.stringify(input)));
//console.log(output);
console.log(output.contracts["ticketsale.sol"].ticketsale);
const contracts = output.contracts["ticketsale.sol"];
const contract=contracts['ticketsale'];
console.log(contract);
module.exports= {"abi":contract.abi,"bytecode":contract.evm.bytecode.object};
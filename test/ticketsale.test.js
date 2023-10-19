const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());
const {abi, bytecode} = require('../compile');

let accounts;
let tsold;


beforeEach(async () => {
  // Get a list of all accounts
  accounts = await web3.eth.getAccounts();
  console.log(accounts);
  tsold = await new web3.eth.Contract(abi)
    .deploy({
      data: bytecode,
      arguments: [100000, 0],
    })
    .send({ from: accounts[1], gasPrice: 8000000000, gas: 4700000});
});
describe("ticketsale", () => {

        it("buy ticket", async () => 
        {
            await tsold.methods.buyTicket(1).send({ from: accounts[1], gasPrice: 8000000000, gas: 4700000});
            const prod = await tsold.methods.ticketslist(1).call();
            assert.equal(prod.beingOffer, false);
        });

        it("get ticket", async () => 
        {
        
        await tsold.methods.getTicketOf(accounts[1]).send({from: accounts[1], gasPrice: 8000000000, gas:4700000});
        const prods = await tsold.methods.ticketslist(0).call();
        assert.equal(prods.beingOffer , false);
        });

      it("offer swap", async () => 
      {
        await tsold.methods.offerSwap(1).send({ from: accounts[1], gasPrice: 8000000000, gas: 4700000});
        const prod = await tsold.methods.ticketslist(1).call();
        assert.equal(prod.beingOffer, true);
      });

      it("accept swap", async() =>
      {
        await tsold.methods.acceptSwap(2).send({ from: accounts[1], gasPrice: 8000000000, gas: 4700000});
        const prod = await tsold.methods.ticketslist(2).call();
        assert.equal(prod.beingOffer, false);
      });

      it("return ticket", async() =>
      {
        await tsold.methods.returnTicket(1).send({ from: accounts[1], gasPrice: 8000000000, gas: 4700000});
        const prod = await tsold.methods.ticketslist(1).call();
        assert.equal(prod.beingOffer, false);
      });
});  
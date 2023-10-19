// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;
contract ticketsale {
 // <contract_variables>
  uint tickets;
  uint ticketPrice;
  address public manager;
  address public partner;
  int public revenue;

  struct Tickets{
    address ticketowner;
    bool isNotavailable;
    bool beingOffer;
    // "takes" is the amount of attempts user has taken
    int takes;
  }
  mapping (uint => Tickets) public ticketslist;
  mapping(address => uint) public ticketOf;
 // </contract_variables>
 constructor(uint numTickets, uint price)  {
    tickets = numTickets;
    ticketPrice = price;
    revenue = 0;
    manager = msg.sender;
   

 }
 function buyTicket(uint ticketId) public payable {
    require(ticketId > 0 && ticketId <= tickets && ticketId != 5,"Invalid Ticket");
    require(ticketslist[ticketId].isNotavailable != true, "sorry ticket sold");
    require(ticketslist[ticketId].takes == 0, "you already own a ticket");
    require(msg.value == ticketPrice, "Incorrect payment amount");

    revenue += int256(ticketPrice);

    ticketslist[ticketId] =  Tickets(manager,false,false,0);

 }
 function getTicketOf(address person) public view returns (uint) {
      return ticketOf[person];
 }
 /*function offerSwap(address partner) public {
 // TODO
 }*/

 function offerSwap(uint ticketId) public {
    require(ticketslist[ticketId].takes == 0,"you must own a ticket");

    ticketslist[ticketId] =  Tickets(manager,false,true,0);
 }
 /*function acceptSwap(address partner) public {
 // TODO
 }*/


 function acceptSwap(uint ticketId) public {
    require(ticketslist[ticketId].takes == 0 && ticketslist[5].takes == 0,"you must own a ticket");
    uint prevId = ticketId;
    ticketslist[ticketId] =  ticketslist[5];
    ticketslist[5] =  ticketslist[prevId];
 }
 function returnTicket(uint ticketId) public{
    require(ticketId > 0 && ticketId <= tickets,"Invalid Ticket");
    require(msg.sender==manager, "you are not authorized");
    bytes memory data;
    bool success;

    uint remanderAfterServiceFee = ticketPrice - ((10 * ticketPrice) / 100);
    address customerReturn = ticketslist[ticketId].ticketowner;
    (success,data) = customerReturn.call{value: remanderAfterServiceFee}("");
    revenue -= int(remanderAfterServiceFee);
// TODO
 }
}
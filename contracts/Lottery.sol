// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;

contract Lottery {
    address public manager;
    address payable[] public participants;
    address payable public winner;
    constructor()
    {
        manager=msg.sender;
    }
    receive() payable external
    {
        require(msg.value==1 ether,"PLEASE PAY 1 ETHER");
        participants.push(payable(msg.sender));
    }
    function getBalance() public view returns(uint)
    {
        require(msg.sender==manager,"YOU ARE NOT THE MANAGER");
        return address(this).balance;
    }
    function random() public view returns(uint)
    {
        return uint(keccak256(abi.encodePacked(block.difficulty,block.timestamp,participants.length)));
    }
    function pickWinner() public
    {
        require(msg.sender ==manager,"YOU ARE NOT THE MANAGER");
        require(participants.length>=3,"PLAYERS ARE LESS THAN 3");
        uint randomWinner=random();
        // address  payable winner;
        uint indexposition = randomWinner % participants.length; //REMAINDER SHOUKD BE LESS THAN PLAYER.LENGTH
        winner=participants[indexposition];
        winner.transfer(getBalance());
        participants=new address payable[](0); 
    }
    function allPlayers() public view returns(address payable[]  memory)
    {
        return participants;
    }
}

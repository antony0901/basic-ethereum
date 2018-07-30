pragma solidity ^0.4.19;
contract Lottery {
    address public manager;
    address[] public players;
    address public lastWinner;
    
    constructor() public {
        manager = msg.sender;
    }
    
    function enter() public payable {
        require(msg.value == 0.1 ether);
        
        players.push(msg.sender);
    }
    
    function random() private view returns (uint) {
        return uint(keccak256(block.difficulty, now, players));
    }
    
    function pickWinner() public restricted returns (address) {
        uint index = random() % players.length;
        players[index].transfer(this.balance);
        lastWinner = players[index];
        players = new address[](0);
        return lastWinner;
    }
    
    modifier restricted() {
        require (msg.sender == manager);
        _;
    }
    
    function getPlayers() public view returns (address[]) {
        return players;
    }
}
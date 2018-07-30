pragma solidity ^0.4.21;

contract MetaCoinStorage {
  mapping(address => uint) balances;

  mapping(address => bool) accessAllowed;

  constructor() public {
    balances[msg.sender] = 1000;
    accessAllowed[msg.sender] = true;
  }

  modifier platform() {
    require(accessAllowed[msg.sender] == true);
    _;
  }

  function allowAccess(address _address) platform public {
    accessAllowed[_address] = true;
  }

  function denyAllow(address _address) platform public {
    accessAllowed[_address] = false;
  }

  function getBalance(address _addr) public view returns(uint) {
    return balances[_addr];
  }

  function setBalance(address _addr, uint _balance) platform public {
    balances[_addr] = _balance;
  }
}
pragma solidity 0.4.24;
import "zeppelin-solidity/contracts/token/MintableToken.sol";

contract ICOToken is MintableToken {
  string public name = "ICO token";
  string public symbol = "AICO";
  uint public decimals = 18;
}
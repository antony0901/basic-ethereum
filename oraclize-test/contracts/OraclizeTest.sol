pragma solidity ^0.4.21;
import "installed_contracts/oraclize-api/contracts/usingOraclize.sol";

contract OraclizeTest is usingOraclize {
  address public owner;
  string public ETHUSD;
  event LogInfo(string description);
  event LogPriceUpdate(string price);
  event LogUpdate(address indexed _owner, uint indexed _balance);

  constructor() payable public {
    owner = msg.sender;

    emit LogUpdate(owner, address(this).balance);

    OAR = OraclizeAddrResolverI(0x0EfEeF9e71665444AC8B91AB5333D79741c93119);

    oraclize_setProof(proofType_TLSNotary | proofStorage_IPFS);
    update();
  }

  function __calback(bytes32 id, string result, bytes proof) public {
    require(msg.sender == oraclize_cbAddress());

    ETHUSD = result;
    emit LogPriceUpdate(ETHUSD);
    update();
  }

  function() public {
    revert();
  }

  function getBalance() public returns (uint) {
    return address(this).balance;
  }

  function update() payable public {
    if(oraclize_getPrice("URL") > address(this).balance) {
      emit LogInfo("Oraclize query was NOT send due to lacking of ETH");
    } else {
      emit LogInfo("Oraclize query was SENT, please wait for the answer...");
      oraclize_query("URL", "json(https://api.coinbase.com/v2/prices/ETH-USD/spot).data.amount");
    }
  }
}
pragma solidity 0.4.24;

import "./ICOToken.sol";
import "zeppelin-solidity/contracts/crowdsale/CappedCrowdsale.sol";
import "zeppelin-solidity/contracts/crowdsale/RefundableCrowdsale.sol";

contract ICOCrowdsale is CappedCrowdsale, RefundableCrowdsale {

    enum CrowdsaleStage { PreICO, ICO }

    CrowdsaleStage public stage = CrowdsaleStage.PreICO;

    uint public totalTokensForSaleDuringPreICO  = 20000000000000000000;
    uint public totalTokensForSale              = 60000000000000000000;
    uint public tokensForBounty                 = 10000000000000000000;
    uint public tokensForTeam                   = 10000000000000000000;
    uint public tokensForEcosystem              = 20000000000000000000;
    uint public maxTokens                       = 100000000000000000000;

    uint public totalWeiRaisedDuringPreICO;

    event EthTransferred(string text);
    event EthRefunded(string text);

    constructor(
        uint _startTime,
        uint _endTime,
        uint _rate, // exchange rate 
        address _wallet,
        uint _goal,
        uint _cap
    )
    CappedCrowdsale(_cap)
    FinalizableCrowdsale()
    RefundableCrowdsale(_goal)
    Crowdsale(_startTime, _endTime, _rate, _wallet) public {
        require(_goal <= _cap);
    }

    function createTokenContract() internal returns (MintableToken) {
        return new ICOToken();
    }

    function setCurrentRate(uint _rate) private {
        rate = _rate;
    }

    function setCrowdsaleStage(uint value) public onlyOwner {
        if (value == uint(CrowdsaleStage.PreICO)) {
            stage = CrowdsaleStage.PreICO;
            setCurrentRate(5);
        } else if (value == uint(CrowdsaleStage.ICO)) {
            stage = CrowdsaleStage.ICO;
            setCurrentRate(2);
        }
    }

    function () external payable {
        uint tokensThatWillBeMintedAfterPurchase = msg.value.mul(rate);

        if ((stage == CrowdsaleStage.PreICO) && 
            (token.totalSupply() + tokensThatWillBeMintedAfterPurchase > totalTokensForSaleDuringPreICO)) {
                msg.sender.transfer(msg.value);
                emit EthRefunded("PreICO is over target");
                return;
        }

        buyTokens(msg.sender);

        if (stage == CrowdsaleStage.PreICO) {
            totalWeiRaisedDuringPreICO = totalWeiRaisedDuringPreICO.add(msg.value);
        }
    }

    function forwardFunds() internal {
        if (stage == CrowdsaleStage.PreICO) {
            wallet.transfer(msg.value);
            emit EthTransferred("forwarding funds to wallet");
        } else if (stage == CrowdsaleStage.ICO) {
            emit EthTransferred("forwarding funds to refundable vault");
            super.forwardFunds();
        }
    }

    function finish(address _teamFund, address _ecosystemFund, address _bountyFund) public onlyOwner {
        require(!isFinalized);
        uint alreadyMinted = token.totalSupply();
        require(alreadyMinted < maxTokens);

        uint unsoldTokens = totalTokensForSale - alreadyMinted;
        if (unsoldTokens > 0) {
            tokensForEcosystem = tokensForEcosystem + unsoldTokens;
        }

        token.mint(_teamFund, tokensForTeam);
        token.mint(_ecosystemFund, tokensForEcosystem);
        token.mint(_bountyFund, tokensForBounty);

        finalize();
    }
}
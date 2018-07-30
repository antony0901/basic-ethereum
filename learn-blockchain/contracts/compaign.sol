pragma solidity ^0.4.17;

contract Compaign{
    struct Request {
        string description;
        uint value;
        address recipient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;
    }

    address public creator;
    uint public minimumContribution;
    mapping(address => bool) public investors;
    Request[] public requests;
    uint public investorsCount;

    modifier onlyCreator {
        require(msg.sender == creator);
        _;
    }

    constructor(uint _miniumContribution) public{
        minimumContribution = _miniumContribution;
        creator = msg.sender;
    }

    function contribute() public payable {
        require(msg.value >= minimumContribution);
        investors[msg.sender] = true;
        investorsCount++;
    }
}
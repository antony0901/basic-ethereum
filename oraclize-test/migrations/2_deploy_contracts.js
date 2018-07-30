const OraclizeTest = artifacts.require("./OraclizeTest.sol");

module.exports = function(deployer, network, accounts) {
  deployer.deploy(OraclizeTest, {
    from: accounts[9],
    gas: 6721975,
    value: 5e18
  });
};

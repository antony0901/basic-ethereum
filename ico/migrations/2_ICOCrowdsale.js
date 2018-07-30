var ICOCrowdsale = artifacts.require("./ICOCrowdsale.sol");

module.exports = function (deployer, network, accounts) {
  const startTime = Math.round((new Date(Date.now() - 1000 * 60 * 60 * 24).getTime()) / 1000);
  const endTime = Math.round((new Date().getTime() + (1000 * 60 * 60 * 24 * 20)) / 1000);

  deployer.deploy(
    ICOCrowdsale,
    startTime,
    endTime,
    5,
    network === 'development' ? accounts[9] : network.deployedAccount,
    2000000000000000000, // 2 ETH
    500000000000000000000 // 500 ETH
  );
};
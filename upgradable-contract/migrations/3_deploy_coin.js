var ConvertLib = artifacts.require("./ConvertLib.sol");
var MetaCoinStorage = artifacts.require("./MetaCoinStorage.sol");
var MetaCoin = artifacts.require("./MetaCoin.sol");

module.exports = function(deployer) {
  deployer.deploy(ConvertLib);
  deployer.link(ConvertLib, MetaCoin);
  deployer.deploy(MetaCoin, MetaCoinStorage.address).then(() => {
    MetaCoinStorage.deployed().then(instance => {
      return instance.allowAccess(MetaCoin.address);
    });
  });
};

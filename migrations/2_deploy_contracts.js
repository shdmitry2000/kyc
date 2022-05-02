var Owners = artifacts.require("./Owners.sol");
var IdentityUtils = artifacts.require("./IdentityUtils.sol");
var Regulator = artifacts.require("./Regulator.sol");
var KYC = artifacts.require("./KYC.sol");
var Test=artifacts.require("./Test.sol");
// var Registry = artifacts.require("./Registry.sol");

module.exports = function(deployer) {
  deployer.deploy(Owners);
  deployer.deploy(IdentityUtils);
  deployer.deploy(Test);
  deployer.deploy(Regulator);
  deployer.deploy( KYC, "1","deploy","123456789","empty", "empty", "empty", "NO", false);
};

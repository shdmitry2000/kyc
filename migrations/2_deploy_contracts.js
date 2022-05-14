//var Owners = artifacts.require("./Owners.sol");
//var IdentityUtils = artifacts.require("./IdentityUtils.sol");
var StringLibrary = artifacts.require("./StringLibrary.sol");

var PermissionExtender=artifacts.require("./PermissionExtender.sol");
var KYC = artifacts.require("./KYC.sol");
var KYCLib = artifacts.require("./KYCLib.sol");
var Regulator = artifacts.require("./Regulator.sol");



// var Registry = artifacts.require("./Registry.sol");

module.exports = function(deployer) {

  //deployer.deploy(PermissionExtender);
  deployer.deploy(StringLibrary);
  deployer.link(StringLibrary, KYCLib);
  deployer.deploy(KYCLib);
  deployer.link(KYCLib,[KYC,Regulator]);
  //deployer.autolink();
  deployer.deploy( KYC, "0x68a1A0F32e0287144c370235ba434ceb1ade3C83",1,"deploy","123456789","empty", "empty", "M", "12/12/1212", false);
  deployer.link(StringLibrary,[ Regulator]);
  deployer.deploy(Regulator);



//  deployer.deploy(PermissionExtender);



};



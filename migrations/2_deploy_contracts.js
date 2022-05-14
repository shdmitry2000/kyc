//var Owners = artifacts.require("./Owners.sol");
//var IdentityUtils = artifacts.require("./IdentityUtils.sol");
var StringLibrary = artifacts.require("./StringLibrary.sol");

var PermissionExtender=artifacts.require("./PermissionExtender.sol");
var KYC = artifacts.require("./KYC.sol");
var KYCLib = artifacts.require("./KYCLib.sol");
var Regulator = artifacts.require("./Regulator.sol");
var RegulatorLib = artifacts.require("./RegulatorLib.sol");



// var Registry = artifacts.require("./Registry.sol");

module.exports = function(deployer, network, accounts) {

    let deployAccount = accounts[1];

  //deployer.deploy(PermissionExtender);
  deployer.deploy(StringLibrary,{overwrite: false});
  deployer.link(StringLibrary, [KYCLib,RegulatorLib,Regulator]);
  deployer.deploy(KYCLib,{overwrite: false});
  deployer.link(KYCLib,[KYC,Regulator]);
  deployer.deploy(RegulatorLib,{overwrite: false});
  deployer.link(RegulatorLib,[Regulator]);

  //deployer.autolink();
  deployer.deploy( KYC, "0x68a1A0F32e0287144c370235ba434ceb1ade3C83",1,"deploy","123456789","empty", "empty", "M", "12/12/1212", false);
 // deployer.link(StringLibrary,[ Regulator]);
  deployer.deploy(Regulator);



//  deployer.deploy(PermissionExtender);



};



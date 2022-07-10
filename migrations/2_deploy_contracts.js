var StringLibrary = artifacts.require("./StringLibrary.sol");

var KYC = artifacts.require("./KYC.sol");
var KYCLib = artifacts.require("./KYCLib.sol");
var Regulator = artifacts.require("./Regulator.sol");

var KYCInt=artifacts.require("./KYCInt.sol");
var RegulatorLib = artifacts.require("./RegulatorLib.sol");

var RegulatorInt = artifacts.require("./RegulatorInt.sol");

var KYCFactory=artifacts.require("./KYCFactory.sol");
var RegulatorStorage = artifacts.require("./RegulatorStorage.sol");
var KYCStorage = artifacts.require("./KYCStorage.sol");

const zero_address = "0x0000000000000000000000000000000000000000";

function delay(ms){
   var start = new Date().getTime();
   var end = start;
   while(end < start + ms) {
     end = new Date().getTime();
  }
}
// var Registry = artifacts.require("./Registry.sol");

module.exports = function(deployer, network, accounts) {

    let deployAccount = accounts[1];

  // delay(2000);
  deployer.deploy(StringLibrary,{overwrite: true});

 deployer.link(StringLibrary, [KYC,KYCLib,KYCFactory,RegulatorStorage,KYCStorage,RegulatorLib,Regulator]);
 //delay(2000);
  deployer.deploy(KYCStorage,{overwrite: false});
  deployer.link(KYCStorage, [KYC,KYCLib,Regulator,KYCFactory]);
  //delay(2000);
 deployer.deploy(RegulatorStorage,{overwrite: false});
  //delay(2000);
  deployer.deploy(KYCLib,{overwrite: true});
  deployer.link(KYCLib,[KYC,KYCFactory,Regulator]);
  //delay(2000);
  deployer.deploy( KYC,zero_address,"id_1",1, ["fullname","issued_country","address","sex","date_of_birth","smoking"],["full name test","israel", "empty", "M", "12/12/1212", 'false']);
  //delay(2000);
  deployer.deploy(KYCFactory,{overwrite: true});

  deployer.link(KYCFactory,[Regulator]);
  // delay(2000);
  deployer.deploy(RegulatorLib,{overwrite: true});
  deployer.link(RegulatorLib,[Regulator]);
  // delay(2000);
  deployer.deploy(Regulator,zero_address);
  // delay(2000);

/*
var StringLibrary = artifacts.require("./StringLibrary.sol");

var KYC = artifacts.require("./KYC.sol");
var KYCLib = artifacts.require("./KYCLib.sol");
var Regulator = artifacts.require("./Regulator.sol");

var KYCInt=artifacts.require("./KYCInt.sol");
var RegulatorLib = artifacts.require("./RegulatorLib.sol");

var RegulatorInt = artifacts.require("./RegulatorInt.sol");

var KYC2 = artifacts.require("./KYC2.sol");
var KYCLib2 = artifacts.require("./KYCLib2.sol");
var KYCFactory=artifacts.require("./KYCFactory.sol");
var RegulatorStorage = artifacts.require("./RegulatorStorage.sol");
var KYCStorage = artifacts.require("./KYCStorage.sol");

const zero_address = "0x0000000000000000000000000000000000000000";


// var Registry = artifacts.require("./Registry.sol");

module.exports = function(deployer, network, accounts) {

    let deployAccount = accounts[1];


  deployer.deploy(StringLibrary,{overwrite: true});

 deployer.link(StringLibrary, [KYC,KYCLib,KYC2,KYCLib2,KYCFactory,RegulatorLib,Regulator]);
 deployer.deploy(RegulatorStorage,{overwrite: false});

  deployer.deploy(KYCLib,{overwrite: true});
  deployer.link(KYCLib,[KYC,KYCFactory,Regulator]);
    deployer.deploy(KYCLib2,{overwrite: true});
    deployer.link(KYCLib2,[KYC2,KYCFactory,Regulator]);
  deployer.deploy( KYC,zero_address,"id_1",1, ["fullname","issued_country","address","sex","date_of_birth","smoking"],["full name test","israel", "empty", "M", "12/12/1212", 'false']);
  deployer.deploy( KYC2,zero_address,"id_1",1, ["fullname","issued_country","address","sex","date_of_birth","smoking"],["full name test","israel", "empty", "M", "12/12/1212", 'false']);

    deployer.deploy(KYCFactory,{overwrite: true});

      deployer.link(KYCFactory,[Regulator]);
  deployer.deploy(RegulatorLib,{overwrite: true});
  deployer.link(RegulatorLib,[Regulator]);
  deployer.deploy(Regulator,zero_address);
*/

/*

//    regular
var StringLibrary = artifacts.require("./StringLibrary.sol");

var KYC = artifacts.require("./KYC.sol");
var KYCLib = artifacts.require("./KYCLib.sol");
var Regulator = artifacts.require("./Regulator.sol");

var KYCInt=artifacts.require("./KYCInt.sol");
var RegulatorLib = artifacts.require("./RegulatorLib.sol");

var KYCFactory=artifacts.require("./KYCFactory.sol");

const zero_address = "0x0000000000000000000000000000000000000000";


// var Registry = artifacts.require("./Registry.sol");

module.exports = function(deployer, network, accounts) {

    let deployAccount = accounts[1];


     deployer.deploy(StringLibrary,{overwrite: true});
     deployer.link(StringLibrary, [KYC,KYCLib,RegulatorLib,Regulator,KYCFactory]);

  //   deployer.deploy(KYCStorage,{overwrite: false});
  //   deployer.link(KYCStorage, [KYC,KYCLib,Regulator,KYCFactory]);

  deployer.deploy(KYCLib,{overwrite: true});
  deployer.link(KYCLib,[KYC,KYCFactory]);

  deployer.deploy(KYCLib,{overwrite: true});
    deployer.link(KYCLib,[KYC,KYCFactory]);

    deployer.deploy( KYC,zero_address,"id_1",1, ["fullname","issued_country","address","sex","date_of_birth","smoking"],["full name test","israel", "empty", "M", "12/12/1212", 'false']);
   // deployer.deploy( KYC2,zero_address,"id_1",1, ["fullname","issued_country","address","sex","date_of_birth","smoking"],["full name test","israel", "empty", "M", "12/12/1212", 'false']);

 // deployer.deploy(RegulatorStorage,{overwrite: false});



  deployer.deploy(KYCLib,{overwrite: true});
  deployer.link(KYCLib,[KYC,KYCFactory,Regulator]);

  deployer.deploy(KYCFactory,{overwrite: true});
    deployer.link(KYCFactory,[Regulator]);

  deployer.deploy( KYC,zero_address,"id_1",1, ["fullname","issued_country","address","sex","date_of_birth","smoking"],["full name test","israel", "empty", "M", "12/12/1212", 'false']);

  deployer.deploy(RegulatorLib,{overwrite: true});
  deployer.link(RegulatorLib,[Regulator]);
  deployer.deploy(Regulator);//,zero_address);



*/

/*
  //deployer.autolink();

  deployer.deploy(Regulator,zero_address);
*/




/**
//  deploy regular


var StringLibrary = artifacts.require("./StringLibrary.sol");

var KYC = artifacts.require("./KYC.sol");
var KYCLib = artifacts.require("./KYCLib.sol");
var Regulator = artifacts.require("./Regulator.sol");

var KYCInt=artifacts.require("./KYCInt.sol");
var RegulatorLib = artifacts.require("./RegulatorLib.sol");


const zero_address = "0x0000000000000000000000000000000000000000";

module.exports = function(deployer, network, accounts) {

   let deployAccount = accounts[1];
deployer.deploy(StringLibrary,{overwrite: true});
deployer.link(StringLibrary, [KYC,KYCLib,RegulatorLib,Regulator]);
deployer.deploy(KYCLib,{overwrite: true});
 deployer.link(KYCLib,[KYC,Regulator]);


  deployer.deploy( KYC,zero_address,"id_1",1, ["fullname","issued_country","address","sex","date_of_birth","smoking"],["full name test","israel", "empty", "M", "12/12/1212", 'false']);

  deployer.deploy(RegulatorLib,{overwrite: true});
  deployer.link(RegulatorLib,[Regulator]);
  deployer.deploy(Regulator);//,zero_address);

*/



/*
  //deployer.autolink();

  deployer.deploy(Regulator,zero_address);
*/


};




// var Owners = artifacts.require("./Owners.sol");
//var PermissionExtender = artifacts.require("./PermissionExtender.sol");
var KYC = artifacts.require("KYC");
var Regulator = artifacts.require("Regulator");
//var Test=artifacts.require("Test");
//var Test = artifacts.require("Test");

var account;
var accounts;


contract('Regulator', function(accounts) {

    console.log("accounts",accounts);
    // console.log('kyc address',KYC.address);
    accounts=accounts;
    account=accounts[0];
    var Registry_instance;


    it("regulator begin test", function() {
        return Regulator.deployed().then(function (instance) {
            Registry_instance = instance;
          // console.log("instance",instance);
          //  console.log("instance exist");
            return Registry_instance.getCompaniesList.call();
        }).then(function (companies_list) {
            console.log("companies_list", companies_list);
            assert.equal(companies_list.length, 0, "Registry wasn't empty!");
            return Registry_instance.submitCompany(account ,'bank hapoalim','hanegev 11 ,Tel aviv',1,{from: account});
        }).then(function (result) {
            var addedCompany=false;
            for (var i = 0; i < result.logs.length; i++) {
                var log = result.logs[i];

                if (log.event == "AddCompany") {
                    // We found the event!
                    console.log("AddCompany:");
                    console.log(log.args);
                    addedCompany=true;
                    break;
                }
            }
            if(!addedCompany) assert.fail("can't add company");
            // console.log(tx_id);
                return Registry_instance.getCompaniesList.call();
       }).then(function (companies_list) {
            assert.equal(companies_list.length, 1, "Registry shold include 1 company!");
            Registry_instance.getCompany(companies_list[0])
                    }).then(function (company_data) {
                        console.log("test company_data", company_data);

        }).catch(function(error) {
            console.error(error);
            assert.equal(error.toString(),'',
                'Error detected')
        });



    });




    it("should add test company ", function() {
        var Registry_instance;
        return Regulator.deployed().then(function(instance) {
            Registry_instance = instance;
            return Registry_instance.submitCompany(accounts[1] ,'test company','test address',2,{from: account});
        }).then(function (result) {
            var addedCompany=false;
            for (var i = 0; i < result.logs.length; i++) {
                var log = result.logs[i];

                if (log.event == "AddCompany") {
                    // We found the event!
                    console.log("AddCompany:");
                    console.log(log.args);
                    addedCompany=true;
                    break;
                }
            }
            if(!addedCompany) assert.fail("can't add company");
             return Registry_instance.getCompaniesList.call();
        }).then(function (companies_list) {
            console.log("companies_list", companies_list);
            assert.equal(companies_list.length, 2, "Registry should include 2 company!");
              // console.log(tx_id);
            Registry_instance.getCompany(2,{from: account});
        }).then(function (company_data) {
            console.log("test company_data", company_data);
   //         assert.equal(company_data.registry_id.valueOf(), 2, "Registry should include 2 company!");

        }).catch(function(error) {
            console.error(error);
            assert.equal(error.toString(),'',
                'Error detected')
        });
    });


    contract('bad company add test', function(accounts) {

        console.log("accounts",accounts);
        // console.log('kyc address',KYC.address);
        accounts=accounts;
        account=accounts[0];
        var Registry_instance;
        it("regulator begin test", function() {
            return Regulator.deployed().then(function (instance) {
                Registry_instance = instance;
                // console.log("instance",instance);
                return Registry_instance.getCompaniesList.call();
            }).then(function (companies_list) {
                console.log("companies_list", companies_list);
                assert.equal(companies_list.length, 0, "Registry wasn't empty!");
                return Registry_instance.submitCompany(account ,'Israel Discount Bank Ltd','P.O.B. 456, 27-31 Yehuda Halevy St ,Tel aviv , 61003',11,{from: account});
            }).then(function (result) {
                var addedCompany=false;
                for (var i = 0; i < result.logs.length; i++) {
                    var log = result.logs[i];

                    if (log.event == "AddCompany") {
                        // We found the event!
                        console.log("AddCompany:");
                        console.log(log.args);
                        addedCompany=true;
                        break;
                    }
                }
                if(!addedCompany) assert.fail("can't add company");
                // console.log(tx_id);
                  return Registry_instance.getCompaniesList.call();
           }).then(function (companies_list) {
                  return Registry_instance.getCompaniesList.call();
            }).catch(function(error) {
                console.error(error);
                assert.equal(error.toString(),'',
                    'Error detected')
            });

            });

        });



     it("should add customer at the beginning", function() {
            var Registry_instance;
            var id="039342444";
            var regulatorAddress= account;
    ;
            return Regulator.deployed().then(function(instance) {
                Registry_instance = instance;
    //            return Registry_instance.getOwner.call();
    //        }).then(function (regulatorAddress) {
    //            account=regulatorAddress;
    //            console.log("regulatorAddress:"+account);
                return Registry_instance.submitConsumer(accounts[0] ,id,{from: account});
            }).then(function (result) {
    //            console.log("result:",result);
    //            assert.equal(result, 0, "submitConsumer shold return 0!");
                for (var i = 0; i < result.logs.length; i++) {
                    var log = result.logs[i];
                    // console.log("log:",log);
                    if (log.event == "AddConsumer") {
                        // We found the event!
                        console.log("AddConsumer:");
                        console.log(log.args);
                        // break;
                        return Registry_instance.getConsumer(id);
                    }
                }
                console.log("call getConsumerAddress:",id);
                // assert.fail("can't add consumer");
                return Registry_instance.getConsumer(id);

            }).then(function (customer) {
                console.log("customer");
                console.log(customer);
                assert.equal(customer.chainAddress, account, "customer address should be same!");
            }).catch(function(error) {
                console.error(error);
                assert.equal(error.toString(),'',
                    'Error detected')
            });
        });




//
//it("create  KYC ", function() {
//        var Registry_instance;
//        var id="039342444";
//        var firevent=false;
//        var firevent2=false;
//        return Regulator.deployed().then(function(instance) {
//            Registry_instance = instance;
//            return (KYC.new(account,"test cast",id,'herzel 12 TA', "213232", "2134 1234 1234 2132", "smoking",false));
//
//            // .then(assert.fail("index is not found"))
//        }).then(function (kycExtender) {
//            return Registry_instance.performKYC(id,kycExtender.address,1,{from: account });
//        }).then(function (result) {
//            // console.log("addCompanyRelation:",result);
//            for (var i = 0; i < result.logs.length; i++) {
//                var log = result.logs[i];
//
//                if (log.event == "finalizeKYC") {
//                    // We found the event!
//                    console.log("finalizeKYC:");
//                    console.log(log.args);
//                    firevent=true;
//                    break;
//                }
//            }
//            for (var i = 0; i < result.logs.length; i++) {
//                var log = result.logs[i];
//
//                if (log.event == "addPermission") {
//                    // We found the event!
//                    console.log("performKYC:");
//                    console.log(log.args);
//                    firevent2=true;
//                    break;
//                }
//            }
//
//            if(!firevent) assert.fail("can't add kyc");
//            if(!firevent2) assert.fail("can't add permitions");
//
//        });
//    });



//it("create full  KYC ", function() {
//        var Registry_instance;
//        var id="039342444";
//        var firevent=false;
//        var firevent2=false;
//        return Regulator.deployed().then(function(instance) {
//            Registry_instance = instance;
//            return Registry_instance.performFullKYC( id,1,["fullname","issued_country","address","sex","date_of_birth","smoking"],
//            ["test cast","israel", "herzel 12 TA","M","21/12/2205", 'false'], {from: account });
//
//        }).then(function (result) {
//            console.log("performFullKYC:");
//             console.log(result);
//            for (var i = 0; i < result.logs.length; i++) {
//                var log = result.logs[i];
//
//                if (log.event == "finalizeKYC") {
//                    // We found the event!
//                    console.log("finalizeKYC:");
//                    console.log(log.args);
//                    firevent=true;
//                    break;
//                }
//            }
//            for (var i = 0; i < result.logs.length; i++) {
//                var log = result.logs[i];
//
//                if (log.event == "addPermission") {
//                    // We found the event!
//                    console.log("performKYC:");
//                    console.log(log.args);
//                    firevent2=true;
//                    break;
//                }
//            }
//
//            if(!firevent) assert.fail("can't add kyc");
//            if(!firevent2) assert.fail("can't add permitions");
//
//
//      }).catch(function(error) {
//          console.log("error "+error)
//          assert.equal(error.toString(),'',
//              'Error detected')
//      });
//    });


it("create full  KYC ", function() {
        var Registry_instance;
        var id="039342444";
        var comp_id=1
        var firevent=false;
        var firevent2=false;
        return Regulator.deployed().then(function(instance) {
            Registry_instance = instance;
            console.log("performFullKYC before:");

            return Registry_instance.getConsumer(id);
           }).then(function (result) {
                 console.log("getConsumer results:");
                 console.log(result);
            return Registry_instance.getCompaniesList.call();
          }).then(function (companies_list) {
                       console.log("companies_list", companies_list);


             return Registry_instance.performFullKYC( id,comp_id,["fullname","issued_country","address","sex","date_of_birth","smoking","active_account","account_open_date"],
                        ["test cast","israel", "herzel 12 TA","M","21/12/2205", 'false','false',"21/12/2000"], {from: account });

        }).then(function (result) {
            console.log("performFullKYC results:");
             console.log(result);
            for (var i = 0; i < result.logs.length; i++) {
                var log = result.logs[i];

                console.log('log'+i);
                console.log(log.event);
                console.log(log.args);

                if (log.event == "finalizeKYC") {
                    // We found the event!
//                    console.log("finalizeKYC:");
//                    console.log(log.args);
                    firevent=true;
                    break;
                }
            }
            for (var i = 0; i < result.logs.length; i++) {
                var log = result.logs[i];

                if (log.event == "addPermission") {
                    // We found the event!
                    console.log("performKYC:");
                    console.log(log.args);
                    firevent2=true;
                    break;
                }
            }

            if(!firevent) assert.fail("can't add kyc");
            if(!firevent2) assert.fail("can't add permitions");


            return Registry_instance.getConsumer(id);

                }).then(function (customer) {
                    console.log("customer");
                    console.log(customer);
                    assert.equal(customer.chainAddress, account, "customer address should be same!");

              return Registry_instance.getCurrentKYCPIssuer(id,{from: accounts[1]});
          }).then(function (KYCP_Issuer) {
                console.log("KYCP_Issuer", KYCP_Issuer.valueOf());
                assert.equal(KYCP_Issuer, 1, "KYCP_Issuer should be 1 !");
        //     return Registry_instance.getConsumerAttributePermission(id,1,'test',{from: accounts[1]});
        //}).then(function (attr_list_tets) {
         //  console.log("attr_list_tets", attr_list_tets.valueOf());
           return Registry_instance.getConsumerAttributePermission(id,1,'id',{from: accounts[1]});
        }).then(function (attrperm) {
             console.log("attrperm:",attrperm);
           console.log("attrperm_val:",attrperm.valueOf());
           assert.equal(attrperm, 1, "attrvalue should be 1 !");
           return Registry_instance.getConsumerAttributeValue.call(id,1,'fullname',{from: accounts[1]});
       }).then(function (attrvalue) {
            console.log("attrvalue_fullname:",web3.utils.hexToUtf8(attrvalue)  );
         return Registry_instance.getConsumerAttributeValue.call(id,2,'fullname',{from: accounts[1]});
       }).then(function (attrvalue) {
            console.log("attrvalue_fullname:",web3.utils.hexToUtf8(attrvalue)  );

            return Registry_instance.getConsumerAttributeValue.call(id,1,'id',{from: accounts[1]});
        }).then(function (attrvalue) {
             console.log("attrvalue:",web3.utils.hexToUtf8(attrvalue)  );
             //assert.equal(web3.utils.hexToUtf8(attrvalue), id, "expected id!");
               assert.equal(web3.utils.hexToUtf8(attrvalue), id, "expected id!");
             // assert.equal(attrvalue, 1, "attrvalue should be 1 !");

      }).catch(function(error) {
          console.log("error "+error)
          assert.equal(error.toString(),'',
              'Error detected')
      });
    });



    it("check good permissions for kyc company  ", function() {
              var Registry_instance;
              var id="039342444";
              return Regulator.deployed().then(function(instance) {
                  Registry_instance = instance;
                     return Registry_instance.getCompaniesList.call();
              }).then(function (companies_list) {
                    console.log("companies_list", companies_list);
                    return Registry_instance.getCurrentKYCPIssuer(id,{from: accounts[1]});
              }).then(function (KYCP_Issuer) {
                    console.log("KYCP_Issuer", KYCP_Issuer.valueOf());
                    return Registry_instance.getConsumerAttributePermission(id,1,'test',{from: accounts[1]});
              }).then(function (attr_list_tets) {
                  console.log("attr_list_tets", attr_list_tets.valueOf());
                  return Registry_instance.getConsumerAttributePermission(id,1,'id',{from: accounts[1]});
              }).then(function (attrperm) {
                    console.log("attrperm:",attrperm);
                  console.log("attrperm_val:",attrperm.valueOf());
                  assert.equal(attrperm, 1, "attrvalue should be 1 !");
                  return Registry_instance.getConsumerAttributeValue.call(id,1,"test",{from: accounts[1]});
              }).then(function (attrvalue) {
                                console.log("test attrvalue:",web3.utils.hexToUtf8(attrvalue)  );
                  return Registry_instance.getConsumerAttributeValue.call(id,1,'id',{from: accounts[1]});
              }).then(function (attrvalue) {
                  console.log("attrvalue:",web3.utils.hexToUtf8(attrvalue)  );
                  //assert.equal(web3.utils.hexToUtf8(attrvalue), id, "expected id!");
                    assert.equal(web3.utils.hexToUtf8(attrvalue), id, "expected id!");
                  // assert.equal(attrvalue, 1, "attrvalue should be 1 !");

              }).catch(function(error) {
                  console.log("error "+error)
                  assert.equal(error.toString(),'',
                      'Error detected')
              });
          });


          it("check attribute list for kyc company  ", function() {
                        var Registry_instance;
                        var id="039342444";
                        return Regulator.deployed().then(function(instance) {
                            Registry_instance = instance;
                            return Registry_instance.getConsumerAttributeList(id,1,{from: accounts[1]});
                        }).then(function (attrlist) {
                            console.log(web3.utils.hexToUtf8(attrlist[0]));
                            console.log("attrlist:",attrlist);

                            assert.equal(attrlist.length, 9, "attrvalue should be 7 !");
                            return Registry_instance.getConsumerAttributeValue.call(id,1,'id',{from: accounts[1]});
                        }).then(function (attrvalue) {
                            console.log("attrvalue:",web3.utils.hexToUtf8(attrvalue)  );
                            //assert.equal(web3.utils.hexToUtf8(attrvalue), id, "expected id!");
                              assert.equal(web3.utils.hexToUtf8(attrvalue), id, "expected id!");
                            // assert.equal(attrvalue, 1, "attrvalue should be 1 !");

                        }).catch(function(error) {
                            console.log("error "+error)
                            assert.equal(error.toString(),'',
                                'Error detected')
                        });
                    });



  it("check bed permissions for test company  ", function() {
          var Registry_instance;
          var id="039342444";
          return Regulator.deployed().then(function(instance) {
              Registry_instance = instance;
              return Registry_instance.getConsumerAttributePermission(id,2,'id',{from: accounts[1]});
          }).then(function (attrperm) {
              console.log("attrperm:",attrperm.valueOf());
              assert.equal(attrperm, 0, "attrvalue should be 0 !");

          }).catch(function(error) {
              console.log("error "+error)
              assert.equal(error.toString(),'',
                  'Error detected')
          });
      });

it("check add permissions for test company  ", function() {
        var Registry_instance;
        var id="039342444";
        var firevent=false;

        return Regulator.deployed().then(function(instance) {
            Registry_instance = instance;

            return Registry_instance.addCompanionPermission(id , 2,'*',1 ,{from: account });
         }).then(function (result) {
            firevent=false;
            console.log("addCompanionPermission:",result);
            for (var i = 0; i < result.logs.length; i++) {
                var log = result.logs[i];

                if (log.event == "addPermission") {
                    // We found the event!
                    console.log("addPermission:");
                    console.log(log.args);
                    firevent=true;
                    break;
                }
            }

            if(!firevent)  assert.fail("can't add CompanionPermissionByBaseCompany");
            // .then(assert.fail("getNumActivePDFs  failed"))
                return Registry_instance.getConsumerAttributePermission(id,2,'id',{from: accounts[1]});
              }).then(function (attrperm) {
                  console.log("attrperm:",attrperm.valueOf());
                  assert.equal(attrperm, 1, "attrvalue should be 1 !");
                  return Registry_instance.getConsumerAttributeValue.call(id,2,'id',{from: accounts[1]});
              }).then(function (attrvalue) {
                          console.log("attrvalue:",web3.utils.hexToUtf8(attrvalue)  );
                          assert.equal(web3.utils.hexToUtf8(attrvalue), id, "expected id!");

                          // assert.equal(attrvalue, 1, "attrvalue should be 1 !");

        }).catch(function(error) {
            console.log("error "+error)
            assert.equal(error.toString(),'',
                'Error detected')
        });
    });


it("check good permissions for test company  ", function() {
          var Registry_instance;
              var id="039342444";
              return Regulator.deployed().then(function(instance) {
                  Registry_instance = instance;
                  return Registry_instance.getConsumerAttributePermission(id,2,'id',{from: accounts[1]});
              }).then(function (attrperm) {
                  console.log("attrperm:",attrperm.valueOf());
                  assert.equal(attrperm, 1, "attrvalue should be 1 !");
                  return Registry_instance.getConsumerAttributeValue.call(id,2,'id',{from: accounts[1]});
              }).then(function (attrvalue) {
                  console.log("attrvalue:",web3.utils.hexToUtf8(attrvalue)  );
                  assert.equal(web3.utils.hexToUtf8(attrvalue), id, "expected id!");

                  // assert.equal(attrvalue, 1, "attrvalue should be 1 !");

              }).catch(function(error) {
                  console.log("error "+error)
                  assert.equal(error.toString(),'',
                      'Error detected')
              });
          });

 it("create  customer consent  ", function() {
             var Registry_instance;
             var id="039342444";
             var firevent=false;
             var Registry_instance;
            return Regulator.deployed().then(function(instance) {
                Registry_instance = instance;
                 // console.log("instance",instance);
                 return Registry_instance.createConsentRequest( id,2,1,{from: accounts[1] })
             }).then(function (result) {
                 console.log("createConsentRequest", result);
               //  if(!result) assert.fail("can't add consent");
                 return Registry_instance.getConsentRequests.call({from: accounts[1] });
             }).then(function (onsentRequests) {
                 console.log("onsentRequests", onsentRequests);
                 assert.equal(onsentRequests.length, 1, "consent is empty!");
             }).catch(function (error) {
                 console.error(error);
                 assert.equal(error.toString(), '',
                     'Error detected')
             });
         });






});




/*
contract('Test', function(accounts) {

    console.log("accounts",accounts);
    // console.log('kyc address',KYC.address);
    accounts=accounts;
    account=accounts[0]
    var Test_instance;
    var id="039342444";

    it("create  customer consent test ", function() {
            var Test_instance;
            var id="039342444";
            var firevent=false;
            var Registry_instance;
           return Test.deployed().then(function (instance) {
                Test_instance = instance;
                // console.log("instance",instance);
                return Test_instance.createConsentRequest( id,2,{from: accounts[1] })
            }).then(function (result) {
                console.log("createConsentRequest", result);
              //  if(!result) assert.fail("can't add consent");
                return Test_instance.getConsentRequests.call({from: accounts[1] });
            }).then(function (onsentRequests) {
                console.log("onsentRequests", onsentRequests);
                assert.equal(onsentRequests.length, 1, "consent is empty!");
            }).catch(function (error) {
                console.error(error);
                assert.equal(error.toString(), '',
                    'Error detected')
            });
        });





//    it("should add customer at the beginning", function() {
//        return Test.deployed().then(function (instance) {
//            Test_instance = instance;
//            // console.log("instance",instance);
//            return Test_instance.submitConsumer(account ,id,{from: account});
//
//        }).then(function (result) {
//            console.log("result:",result);
//         //   assert.equal(result, 0, "submitConsumer should return 0!");
//            return Test_instance.getConsumer(id);
//
//        }).then(function (customer) {
//            console.log("customer");
//            console.log(customer);
//            assert.equal(customer.chainAddress, account, "customer address shold be same!");
//        }).catch(function(error) {
//            console.error(error);
//            assert.equal(error.toString(),'',
//                'Error detected')
//        });
//    });
//
//it("should add customer2 at the beginning", function() {
//        return Test.deployed().then(function (instance) {
//            Test_instance = instance;
//            // console.log("instance",instance);
//            return Test_instance.submitConsumer2(account ,id,{from: account});
//
//        }).then(function (result) {
//            console.log("result:",result);
//           // assert.equal(result, 0, "submitConsumer should return 0!");
//            return Test_instance.getConsumer2(id);
//
//        }).then(function (customer) {
//            console.log("customer");
//            console.log(customer);
//            assert.equal(customer.chainAddress, account, "customer address shold be same!");
//        }).catch(function(error) {
//            console.error(error);
//            assert.equal(error.toString(),'',
//                'Error detected')
//        });
//    });
//
//
//it("should add customer3 at the beginning", function() {
//        return Test.deployed().then(function (instance) {
//            Test_instance = instance;
//            // console.log("instance",instance);
//            return Test_instance.submitConsumer3(account ,id,{from: account});
//
//        }).then(function (result) {
//            console.log("result:",result);
//            //assert.equal(result, 0, "submitConsumer should return 0!");
//            return Test_instance.getConsumer3(id);
//
//        }).then(function (customer) {
//            console.log("customer");
//            console.log(customer);
//            assert.equal(customer.chainAddress, account, "customer address shold be same!");
//        }).catch(function(error) {
//            console.error(error);
//            assert.equal(error.toString(),'',
//                'Error detected')
//        });
//    });
//
//
//
//
//
});
*/




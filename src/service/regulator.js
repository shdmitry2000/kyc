import  Web3  from '../web3';
import RegulatorFunk from '../../build/contracts/Regulator.json'
import KYCFunk from '../../build/contracts/KYC.json'
//import OwnersFunk from '../../build/contracts/Owners.json'
import contract from 'truffle-contract';
import log from "../utils/logger";
import  NetworkNum  from '../const';

//const { artifacts } = require("truffle");
//var Regulator = artifacts.require("../../build/contracts/regulator.json");
//let regulatorInstance2 =Regulator.deployed()

const RegulatorContract = contract(RegulatorFunk);
const KycContract = contract(KYCFunk);
//const OwnersContract = contract(OwnersFunk);

let regulatorInstance = new Web3.eth.Contract(RegulatorContract.abi, RegulatorContract.networks[NetworkNum].address)
let kycInstance = new Web3.eth.Contract(KycContract.abi, KycContract.networks[NetworkNum].address)
//let ownersInstance = new Web3.eth.Contract(OwnersContract.abi, OwnersContract.networks[3].address)


let getAccounts = async () => {
    try {

        const accounts = await Web3.eth.getAccounts();
//        console.log(accounts);

//        const res = "shdhasdf dw"
        return Promise.resolve(accounts);
    } catch (err) {
        return Promise.reject(err);
    }
};


let getCompaniesList = async () => {
    try {

        const accounts = await Web3.eth.getAccounts();
//        console.log(accounts);
        const res = await regulatorInstance.methods.getCompaniesList().call({  from: accounts[0]   });
        log.info(res)
        log.info(res[0])

//        const res = "shdhasdf dw"
        return Promise.resolve(res);
    } catch (err) {
        return Promise.reject(err);
    }
};

let getCompaniesData = async (register_id) => {
    try {

        const accounts = await Web3.eth.getAccounts();
//        const res = await regulatorInstance.methods.confirmPurchase()
//            .send({
//                from: accounts[1],
//                value:3000000000000000000
//            });
        log.info("getCompaniesData")
//        const companyes = await regulatorInstance.methods.getCompaniesList.call();
//        log.info(companyes)
//        log.info(companyes[0])
        const res = await regulatorInstance.methods.getCompany(register_id).call({  from: accounts[0]   });
        log.info("after")
        log.info(res)

        return Promise.resolve(res);
    } catch (err) {
        log.error
        return Promise.reject(err);
    }
};


let submitCompany = async (address,company_name,company_address,register_id) => {
    try {

        const accounts = await Web3.eth.getAccounts();
        const defacc=Web3.eth.defaultAccount;
        log.info('submitCompany')
        log.info(address)
        log.info(company_name)
        log.info(company_address)
        log.info(register_id)
        const res = await regulatorInstance.methods.submitCompany(address,company_name,company_address,register_id).send({ from: accounts[0], gas: 4000000 });
        log.info(res)

        return Promise.resolve(res);
    } catch (err) {
        log.info('err');
        log.info(err);
        return Promise.reject(err);
    }
};


let submitCustomer = async (account_address,id) => {
    try {
        const accounts = await Web3.eth.getAccounts();
        log.info('submitCustomer')
//        const res = await regulatorInstance.methods.submitConsumer(account_address ,id).call({ from: accounts[0], gas: 4000000 });
        const res = await regulatorInstance.methods.submitConsumer(account_address ,id).send({ from: accounts[0], gas: 4000000 });
//           const res = await testInstance.methods.submitConsumer(account_address ,id).call({ from: accounts[0], gas: 4000000 });

        log.info(res)


        return Promise.resolve(res);
    } catch (err) {
        log.info('err');
        log.info(err);
        return Promise.reject(err);
    }
};

let createConsentRequest = async (id,company_registry_id,kyc_issuer_registry_id) => {
    try {
        const accounts = await Web3.eth.getAccounts();
        log.info('createConsentRequest')
//        const res = await regulatorInstance.methods.submitConsumer(account_address ,id).call({ from: accounts[0], gas: 4000000 });
        const res = await regulatorInstance.methods.createConsentRequest(id,company_registry_id,kyc_issuer_registry_id).send({ from: accounts[0], gas: 4000000 });
//           const res = await testInstance.methods.submitConsumer(account_address ,id).call({ from: accounts[0], gas: 4000000 });



        return Promise.resolve(res);
    } catch (err) {
        log.info('err');
        log.info(err);
        return Promise.reject(err);
    }
};


let finishConsentRequest = async (id,company_registry_id,kyc_issuer_registry_id,finished) => {
    try {
        const accounts = await Web3.eth.getAccounts();
        log.info('finishConsentRequest')
//        const res = await regulatorInstance.methods.submitConsumer(account_address ,id).call({ from: accounts[0], gas: 4000000 });
        const res = await regulatorInstance.methods.finishConsentRequest(id,company_registry_id,kyc_issuer_registry_id,finished).send({ from: accounts[0], gas: 4000000 });
//           const res = await testInstance.methods.submitConsumer(account_address ,id).call({ from: accounts[0], gas: 4000000 });



        return Promise.resolve(res);
    } catch (err) {
        log.info('err');
        log.info(err);
        return Promise.reject(err);
    }
};


/*
let getConsentRequestsbyCompany = async (id,company_registry_id) => {
    try {
        const accounts = await Web3.eth.getAccounts();
        log.info('submitCustomer')
//        const res = await regulatorInstance.methods.submitConsumer(account_address ,id).call({ from: accounts[0], gas: 4000000 });
        const res = await regulatorInstance.methods.getConsentRequestsbyCompany(id,company_registry_id).call({ from: accounts[0], gas: 4000000 });
//           const res = await testInstance.methods.submitConsumer(account_address ,id).call({ from: accounts[0], gas: 4000000 });

        log.info(res)


        return Promise.resolve(res);
    } catch (err) {
        log.info('err');
        log.info(err);
        return Promise.reject(err);
    }
};
*/
let getConsentRequests = async () => {
    try {
        const accounts = await Web3.eth.getAccounts();
        log.info('getConsentRequests')
//        const res = await regulatorInstance.methods.submitConsumer(account_address ,id).call({ from: accounts[0], gas: 4000000 });
        const res = await regulatorInstance.methods.getConsentRequests().call({ from: accounts[0], gas: 4000000 });
//           const res = await testInstance.methods.submitConsumer(account_address ,id).call({ from: accounts[0], gas: 4000000 });
        log.info(res.length)
        let requests = [];

        for (let i = 0; i < res.length; i++) {
          requests[i] = { company_id: res[i][0], id: Web3.utils.hexToUtf8(res[i][1]),kyc_manager_id: res[i][2],performed: res[i][3] ,perform_stamp :res[i][4]};
        }
        log.info(requests)


        return Promise.resolve(requests);
    } catch (err) {
        log.info('err');
        log.info(err);
        return Promise.reject(err);
    }
};


let getConsumer = async (id) => {
    try {
        const accounts = await Web3.eth.getAccounts();
        log.info('getConsumer')
        const res = await regulatorInstance.methods.getConsumer(id).call({ from: accounts[0], gas: 4000000 });
        log.info(res)

        return Promise.resolve(res);
    } catch (err) {
        log.info('err');
        log.info(err);
        return Promise.reject(err);
    }
};




let submitKYC = async (fullname,id,issued_country, laddress, sex,
                                       date_of_birth,  smoking,company_registry_id) => {
    try {
        const accounts = await Web3.eth.getAccounts();
        const defacc=Web3.eth.defaultAccount;
        log.info('submitKYC')
        log.info(issued_country)
        log.info(laddress)
        log.info(id)
        log.info(fullname)
        log.info(sex)
        log.info(date_of_birth)
        log.info(smoking)
        log.info(company_registry_id)

        const res = await regulatorInstance.methods.performFullKYC(
        fullname,id,issued_country, laddress, sex,
                date_of_birth,  smoking,     company_registry_id
        ).send({ from: accounts[0], gas: 4000000 });
//        const res = await regulatorInstance.methods.performFullKYC(
//        accounts[1],"test cast",id,'herzel 12 TA', "213232", "2134 1234 1234 2132", "smoking",false,   1
//        ).call({ from: accounts[0], gas: 4000000 });
          log.info(res)



        return Promise.resolve(res);
    } catch (err) {
        log.info('err');
        log.info(err);
        return Promise.reject(err);
    }
};

let getConsumerAttributePermission = async (id,company_registry_id, attributeName) => {
    try {
        const accounts = await Web3.eth.getAccounts();
        const defacc=Web3.eth.defaultAccount;
        log.info('getConsumerAttributePermission')
        log.info(id);
        log.info(company_registry_id);
        log.info(attributeName);
//        log.info(company_registry_id)
//        log.info(attributeName)
         const res = await regulatorInstance.methods.getConsumerAttributePermission( id,company_registry_id, attributeName).call({ from: accounts[0], gas: 4000000 });


//        const res = await regulatorInstance.methods.getConsumerAttributePermission( id,company_registry_id, attributeName).call({ from: accounts[0], gas: 4000000 });
//        log.info(res)

        return Promise.resolve(res);
    } catch (err) {
        log.info('err');
        log.info(err);
        return Promise.reject(err);
    }
};


let getCurrentKYCissuer = async (id) => {
    try {
        const accounts = await Web3.eth.getAccounts();
       log.info('getCurrentKYCPIssuer')
        log.info(id)
//        log.info(company_registry_id)
//        log.info(attributeName)
         const res = await regulatorInstance.methods.getCurrentKYCPIssuer( id).call({ from: accounts[0], gas: 4000000 });



        return Promise.resolve(res);
    } catch (err) {
        log.info('err');
        log.info(err);
        return Promise.reject(err);
    }
};


let getConsumerAttributeValue = async (id,company_registry_id, attributeName) => {
    try {
        const accounts = await Web3.eth.getAccounts();
        const defacc=Web3.eth.defaultAccount;
        log.info('getConsumerAttributePermission')
//        log.info(id)
//        log.info(company_registry_id)
//        log.info(attributeName)
         const res = await regulatorInstance.methods.getConsumerAttributeValue( id,company_registry_id, attributeName).call({ from: accounts[0], gas: 4000000 });


//        const res = await regulatorInstance.methods.getConsumerAttributePermission( id,company_registry_id, attributeName).call({ from: accounts[0], gas: 4000000 });
//        log.info(res)

        return Promise.resolve(Web3.utils.hexToUtf8(res));
    } catch (err) {
        log.info('err');
        log.info(err);
        return Promise.reject(err);
    }
};

let getConsumerAttributeName = async (id,company_registry_id, attributeRow) => {
    try {
        const accounts = await Web3.eth.getAccounts();

        log.info('getConsumerAttributePermission')
//        log.info(id)
//        log.info(company_registry_id)
//        log.info(attributeName)
         const res = await regulatorInstance.methods.getConsumerAttributeName( id, attributeRow).call({ from: accounts[0], gas: 4000000 });


//        const res = await regulatorInstance.methods.getConsumerAttributePermission( id,company_registry_id, attributeName).call({ from: accounts[0], gas: 4000000 });
        log.info(res)

        return Promise.resolve(Web3.utils.hexToUtf8(res));
    } catch (err) {
        log.info('err');
        log.info(err);
        return Promise.reject(err);
    }
};


let getConsumerAttributeList = async (id,company_registry_id) => {
    try {
        const accounts = await Web3.eth.getAccounts();

        log.info('getConsumerAttributePermission')
//        log.info(id)
//        log.info(company_registry_id)
//        log.info(attributeName)
         const res = await regulatorInstance.methods.getConsumerAttributeList( id,company_registry_id).call({ from: accounts[0], gas: 4000000 });
         let requests = [];

         for (let i = 0; i < res.length; i++) {
           requests[i] =   Web3.utils.hexToUtf8(res[i]);
         }
         log.info(requests)


//        const res = await regulatorInstance.methods.getConsumerAttributePermission( id,company_registry_id, attributeName).call({ from: accounts[0], gas: 4000000 });


        return Promise.resolve(requests);
    } catch (err) {
        log.info('err');
        log.info(err);
        return Promise.reject(err);
    }
};

let setConsumerAttributePermission = async (id,company_registry_id, attributeName,attributepermission) => {
    try {
        const accounts = await Web3.eth.getAccounts();
        const defacc=Web3.eth.defaultAccount;
        log.info('setConsumerAttributePermission')
        log.info(attributeName)
        log.info(attributepermission)
        const res = await regulatorInstance.methods.addCompanionPermission(id , company_registry_id, attributeName,   attributepermission)
        .send({ from: accounts[0], gas: 4000000 });
        log.info(res)

        return Promise.resolve(res);
    } catch (err) {
        log.info('err');
        log.info(err);
        return Promise.reject(err);
    }
};




//let addCompanyRelation = async (customer_address,id) => {
//    try {
//        const accounts = await Web3.eth.getAccounts();
//        const defacc=Web3.eth.defaultAccount;
//        log.info('addCompanyRelation')
//
//        const res = await regulatorInstance.methods.addCompanyRelation(account_address ,id).send({ from: accounts[0], gas: 4000000 });
//        log.info(res)
//
//        return Promise.resolve(res);
//    } catch (err) {
//        log.info('err');
//        log.info(err);
//        return Promise.reject(err);
//    }
//};

//let addCompanionPermissionByBaseCompanyAndAttribute = async (company_address,id,attribute_name) => {
//    try {
//        const accounts = await Web3.eth.getAccounts();
//        const defacc=Web3.eth.defaultAccount;
//        log.info('addCompanionPermissionByBaseCompanyAndAttribute')
//
//        const res = await regulatorInstance.methods.addCompanionPermissionByBaseCompanyAndAttribute(company_address,id,attribute_name).send({ from: accounts[0], gas: 4000000 });
//        log.info(res)
//
//        return Promise.resolve(res);
//    } catch (err) {
//        log.info('err');
//        log.info(err);
//        return Promise.reject(err);
//    }
//};


//let dummyFunk = async (id,company_address,attribute_name,attribute_permission) => {
//    try {
//        const accounts = await Web3.eth.getAccounts();
//        const defacc=Web3.eth.defaultAccount;
//        log.info('addCompanionPermissionByBaseCompanyAndAttribute')
//
//        const res = await regulatorInstance.methods.setConsumerAttributePermission(tid,company_address,attribute_name,attribute_permission).send({ from: accounts[0], gas: 4000000 });
//        log.info(res)
//
//        return Promise.resolve(res);
//    } catch (err) {
//        log.info('err');
//        log.info(err);
//        return Promise.reject(err);
//    }
//};



//    return Registry_instance.getConsumerAttributePermission(id,account,'id',{from: accounts[1]});
//    const data = await getConsumerAttributePermission(address);
////    const str = JSON.stringify(data, null, 2);
//
//   it("test companion  permission change ", function() {
//        var Registry_instance;
//        var id='039342444';
//        return Regulator.deployed().then(function(instance) {
//            Registry_instance = instance;
//            return Registry_instance.getConsumerAttributePermission(id,account,'id',{from: accounts[1]});
//        }).then(function (attrperm) {
//            console.log("attrperm:",attrperm.valueOf());
//            assert.equal(attrperm, 1, "attrvalue should be 1 !");
//            return Registry_instance.changeCompanionPermissionByCustomer(id,account,accounts[1],'id',0,{from: account});
//        }).then(function (tx) {
//            return Registry_instance.getConsumerAttributePermission(id,account,'id',{from: accounts[1]});
//        }).then(function (attrperm) {
//            console.log("attrperm:",attrperm.valueOf());
//            assert.equal(attrperm.valueOf(), 0, "attrvalue should be 0 !");
//
//        }).catch(function(error) {
//            console.log("error "+error)
//            assert.equal(error.toString(),'',
//                'Error detected')
//        });
//    });
//



// eslint-disable-next-line import/prefer-default-export
export {
        getAccounts,
        getCompaniesData,
        getCompaniesList,
        submitCompany,
         submitCustomer,
         submitKYC,
         setConsumerAttributePermission ,
         getConsumerAttributePermission,
         getConsumerAttributeValue,
         getConsumerAttributeName,
         getConsumerAttributeList,
         createConsentRequest,
         finishConsentRequest,
         getConsumer ,
         getConsentRequests,
         getCurrentKYCissuer,


};
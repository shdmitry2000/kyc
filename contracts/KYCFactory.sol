pragma solidity ^0.8.13;


import "./KYC.sol";
import "./KYC2.sol";



library KYCFactory {

        //event createkycF(string    id,address storageAddress,uint16 company_registry_id ,uint timestamp);




    function createKyc( string memory id,uint16 _kycPerformer_registry_id, string[] memory   attributesList, string[] memory   attributesVal) public returns(address)
    {
                KYCInt  kyc = new KYC( address(this) , id,_kycPerformer_registry_id,attributesList,    attributesVal);
                address kycaddr= address(kyc);
                //emit createkycF(id,kycaddr,_kycPerformer_registry_id,block.timestamp);
                return kycaddr;
    }



/*
    function createKyc2( string memory id,uint16 _kycPerformer_registry_id, string[] memory   attributesList, string[] memory   attributesVal) public returns(address)
    {
                KYCInt  kyc = new KYC2( address(this) , id,_kycPerformer_registry_id,attributesList,    attributesVal);
                address kycaddr= address(kyc);
               // emit createkycF(id,kycaddr,_kycPerformer_registry_id,block.timestamp);
                return kycaddr;
    }

*/




 }
pragma solidity ^0.8.13;


import "./KYC.sol";




library KYCFactory {

        //event createkycF(string    id,address storageAddress,uint64 company_registry_id ,uint timestamp);






    function createKyc( string memory id,uint64 _kycPerformer_registry_id, string[] memory   attributesList, string[] memory   attributesVal) public returns(address)
        {
                    KYCInt  kyc = new KYC( address(0) , id,_kycPerformer_registry_id,attributesList,    attributesVal);
                    address kycaddr= address(kyc);
                    //emit createkycF(id,kycaddr,_kycPerformer_registry_id,block.timestamp);
                    return kycaddr;
        }

/*
    function performFullKYC( string memory id,uint64 company_registry_id, string[] memory   attributesList, string[] memory   attributesVal) public
   {

       return KYCFactory.createKyc(id,  company_registry_id,    attributesList,    attributesVal);


   }
*/


 }
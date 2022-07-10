pragma solidity ^0.8.13;

import "./StringLibrary.sol";
import "./KYC.sol";
import "./RegulatorLib.sol";
//import "./RegulatorLib.sol";
import "./KYCFactory.sol";

import "@openzeppelin/contracts/access/Ownable.sol";


//
//
// check user exist (no)-> verify it -> can't verify -> [or insert kyc request to other company] ,
//                                      if verified  -> insert (create) new user -id is a key
//                  (yes)-> request consent by user.
//  update current verification -> only by regulator now-> will be by party in  future
//  customer will go through consents request /or just give permitions to company for some attributes or by chosing (*) to all attributes.
//  customer can reverse permissions for all attributes.
//    best case save documents on ipfs and save hash for customer as attribute. (example id hash - FULL NAME+ id NUM+ date of originate)
//
//
//


contract Regulator is Ownable {

    using StringLibrary for string;
    using RegulatorLib for address;


    address _RegulatorStorage  ;



    event RegulatoryContractDeployed (address msgSender,string  msgstr,uint timestamp);

    constructor(address _RegulatorStorageContract)   public {
/*
          if (_RegulatorStorageContract!=address(0))
              _RegulatorStorage=_RegulatorStorageContract;
          else
*/
              _RegulatorStorage=address(new RegulatorStorage());

         emit RegulatoryContractDeployed(msg.sender,"Mined",block.timestamp);


          }


    function performFullKYC( string memory id,uint16 company_registry_id, string[] memory   attributesList, string[] memory   attributesVal) public
        {

            address kycaddr=KYCFactory.createKyc(id,  company_registry_id,    attributesList,    attributesVal);

           _RegulatorStorage.performFullKYC(  id,  company_registry_id,    kycaddr);
        }





    function isConsentRequestAllowed(string memory id,uint16 company_id,uint16 kyc_manager_id) internal view returns (bool) {
        RegulatorStorage.Consumer  memory consumer =   getConsumer(id) ;
         require(consumer.registered , "Customer still not  exist !");
         require( consumer.verified , "Customer still not  verified!");

         return KYCInt(consumer.kyc).getKYCIssuer( )==kyc_manager_id;

    }

    function getConsumer( string memory id) public
                        view returns
                        (RegulatorStorage.Consumer memory) {
                           return _RegulatorStorage.getConsumer(     id);
                    }




      function getConsentRequests()
            view
            external
            returns (RegulatorStorage.ConsentRequest[] memory)
        {

            return _RegulatorStorage.getConsentRequests();
        }


    function getConsumerAddress(string memory id ) public view returns(address)   {

        return _RegulatorStorage.getConsumerAddress(id);
    }

               //  function to add a customer profile to the database
                //  returns 0 if successful
                //  returns 7 if no access rights to transaction request sender
                //  returns 1 if size limit of the database is reached
                //  returns 2 if customer already in network

            function submitConsumer(address consumerAddress , string memory id) public  {
                 return _RegulatorStorage.submitConsumer( consumerAddress ,   id);


            }





    function submitCompany(address companyAddress , string memory _name,string memory _local_address,uint16 registry_id) public  onlyOwner {


        _RegulatorStorage.submitCompany( companyAddress ,   _name,  _local_address, registry_id) ;


    }


    function getCompany( uint16 registry_id) public view returns(RegulatorStorage.Company memory)   {
        return _RegulatorStorage.getCompany(  registry_id) ;

       }
    function connectCompanyAddress( address companyAddress,uint16 id) public  onlyOwner   {
         return _RegulatorStorage.connectCompanyAddress(  companyAddress,id) ;

    }


    function getCompanyIdbyAddress( address companyAddress) public   returns (uint16)  {
             return _RegulatorStorage.getCompanyIdbyAddress(  companyAddress) ;

        }


    function getConsumerAttributeList( string memory id,uint16 company_registry_id) public view returns(bytes32[] memory)
     {
           return  _RegulatorStorage.getConsumerAttributeList(   id, company_registry_id);

     }


   function createConsentRequest(string memory id,uint16 company_id,uint16 kyc_manager_id) public   {
        return _RegulatorStorage.createConsentRequest(  id, company_id, kyc_manager_id);
   }



    function finishConsentRequest(string memory id,uint16 company_id,uint16 kyc_manager_id,bool finished) public   {

            return _RegulatorStorage.finishConsentRequest(  id, company_id, kyc_manager_id, finished);

      }


    function addCompanionPermission(string memory id , uint16 company_registry_id,string memory attributeName,uint8   attributepermission) public   {

             _RegulatorStorage.addCompanionPermission(  id ,  company_registry_id,  attributeName,   attributepermission);
        }

     function getConsumerAttributePermission( string memory id,uint16 company_registry_id,string memory attributeName) public view returns(uint8 permission)
         {
            return _RegulatorStorage.getConsumerAttributePermission(   id, company_registry_id,  attributeName) ;
         }

         function getConsumerAttributeValue(string memory id,uint16 company_registry_id,string memory attributeName) public view returns(bytes32 )
         {
            return _RegulatorStorage.getConsumerAttributeValue(  id, company_registry_id,  attributeName) ;

         }



         function getConsumerAttributeName(string memory id,uint row) public view returns(bytes32 )
         {

            return _RegulatorStorage.getConsumerAttributeName( id, row) ;

         }

         function getAttributeLength(string memory id) public view returns(uint )
         {

            return _RegulatorStorage.getAttributeLength(  id) ;

         }



    function getCurrentKYCPIssuer(string memory id) public view returns(uint16 )
    {


                 return _RegulatorStorage.getCurrentKYCPIssuer(  id) ;


     }



    function getCompaniesList() public view returns(  uint16 [] memory)
    {
       return _RegulatorStorage.getCompaniesList() ;
    }


}

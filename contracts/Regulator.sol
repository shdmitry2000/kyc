pragma solidity ^0.8.13;


//import "@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
//import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

import "./StringLibrary.sol";
import "./StorAddressUpgradeable.sol";
import "./KYC.sol";
import "./RegulatorLib.sol";
//import "./RegulatorLib.sol";
import "./KYCFactory.sol";
import "./RegulatorInt.sol";
//import "@openzeppelin/contracts/access/Ownable.sol";


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

contract Regulator is   StorAddressUpgradeable // Initializable,
{

    using StringLibrary for string;
    using RegulatorLib for address;


    //address _RegulatorStorage  ;



    event RegulatoryContractDeployed (address msgSender,string  msgstr,uint timestamp);


    constructor(address _RegulatorStorageContract)   public {

          if (_RegulatorStorageContract!=address(0))
              externalStorage=_RegulatorStorageContract;
          else

              externalStorage=address(new RegulatorStorage());


         emit RegulatoryContractDeployed(msg.sender,"Mined",block.timestamp);

          }

/*
       function initialize(address _RegulatorStorageContract) public initializer {
              if (_RegulatorStorageContract!=address(0))
                    externalStorage=_RegulatorStorageContract;
                else
                    externalStorage=address(new RegulatorStorage());

                       emit RegulatoryContractDeployed(msg.sender,"Mined",block.timestamp);

              __Ownable_init();
          }

*/

        function performFullKYC( string memory id,uint64 company_registry_id, string[] memory   attributesList, string[] memory   attributesVal) public
               {

                   address kycaddr=KYCFactory.createKyc(id,  company_registry_id,    attributesList,    attributesVal);

                  externalStorage.performFullKYC(  id,  company_registry_id,    kycaddr);
               }


 //       externalStorage.performFullKYC(  id,  company_registry_id,    kycaddr);


    function isConsentRequestAllowed(string memory id,uint64 company_id,uint64 kyc_manager_id) internal view returns (bool) {
        RegulatorStorage.Consumer  memory consumer =   getConsumer(id) ;
         require(consumer.registered , "Customer still not  exist !");
         require( consumer.verified , "Customer still not  verified!");

         return KYCInt(consumer.kyc).getKYCIssuer( )==kyc_manager_id;

    }

    function getConsumer( string memory id) public
                        view returns
                        (RegulatorStorage.Consumer memory) {
                           return externalStorage.getConsumer(     id);
                    }


      function getConsentRequests()
            view
            external
            returns (RegulatorStorage.ConsentRequest[] memory)
        {

            return externalStorage.getConsentRequests();
        }


    function getConsumerAddress(string memory id ) public view returns(address)   {

        return externalStorage.getConsumerAddress(id);
    }

               //  function to add a customer profile to the database
                //  returns 0 if successful
                //  returns 7 if no access rights to transaction request sender
                //  returns 1 if size limit of the database is reached
                //  returns 2 if customer already in network

            function submitConsumer(address consumerAddress , string memory id) public  {
                 return externalStorage.submitConsumer( consumerAddress ,   id);


            }





    function submitCompany(address companyAddress , string memory _name,string memory _local_address,uint64 registry_id) public  onlyOwner {


        externalStorage.submitCompany( companyAddress ,   _name,  _local_address, registry_id) ;


    }


    function getCompany( uint64 registry_id) public view returns(RegulatorStorage.Company memory)   {
        return externalStorage.getCompany(  registry_id) ;

       }
    function connectCompanyAddress( address companyAddress,uint64 id) public  onlyOwner   {
         return externalStorage.connectCompanyAddress(  companyAddress,id) ;

    }


    function getCompanyIdbyAddress( address companyAddress) public   returns (uint64)  {
             return externalStorage.getCompanyIdbyAddress(  companyAddress) ;

        }


    function getConsumerAttributeList( string memory id,uint64 company_registry_id) public view returns(bytes32[] memory)
     {
           return  externalStorage.getConsumerAttributeList(   id, company_registry_id);

     }


   function createConsentRequest(string memory id,uint64 company_id,uint64 kyc_manager_id) public   {
        return externalStorage.createConsentRequest(  id, company_id, kyc_manager_id);
   }



    function finishConsentRequest(string memory id,uint64 company_id,uint64 kyc_manager_id,bool finished) public   {

            return externalStorage.finishConsentRequest(  id, company_id, kyc_manager_id, finished);

      }


    function addCompanionPermission(string memory id , uint64 company_registry_id,string memory attributeName,uint8   attributepermission) public   {

             externalStorage.addCompanionPermission(  id ,  company_registry_id,  attributeName,   attributepermission);
        }

     function getConsumerAttributePermission( string memory id,uint64 company_registry_id,string memory attributeName) public view returns(uint8 permission)
         {
            return externalStorage.getConsumerAttributePermission(   id, company_registry_id,  attributeName) ;
         }

         function getConsumerAttributeValue(string memory id,uint64 company_registry_id,string memory attributeName) public view returns(bytes32 )
         {
            return externalStorage.getConsumerAttributeValue(  id, company_registry_id,  attributeName) ;

         }



         function getConsumerAttributeName(string memory id,uint row) public view returns(bytes32 )
         {

            return externalStorage.getConsumerAttributeName( id, row) ;

         }

         function getAttributeLength(string memory id) public view returns(uint )
         {

            return externalStorage.getAttributeLength(  id) ;

         }



    function getCurrentKYCPIssuer(string memory id) public view returns(uint64 )
    {


                 return externalStorage.getCurrentKYCPIssuer(  id) ;


     }



    function getCompaniesList() public view returns(  uint64 [] memory)
    {
       return externalStorage.getCompaniesList() ;
    }


}

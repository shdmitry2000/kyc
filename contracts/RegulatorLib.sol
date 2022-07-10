pragma solidity ^0.8.13;

import "./StringLibrary.sol";
import "./RegulatorStorage.sol";

import "./KYCInt.sol";
import "./KYC.sol";

library RegulatorLib {

    using StringLibrary for string;



             function check_company_registry_id_against_address(uint16 company_id) private view  returns(bool) {
                               return true;
                               //  return (getCompanyIdbyAddress(msg.sender) ==  company_id)  ;

                    }


               function getCompaniesList(address _RegulatorStorageContract) public view returns( uint16 [] memory)
                   {
                        return RegulatorStorage(_RegulatorStorageContract).getCompaniesList();
                   }

          event AddCompany (address indexed companyAdminAddress,string  name,uint16 registry_id, uint timestamp);
           function submitCompany(address _RegulatorStorageContract,address companyAddress , string memory _name,string memory _local_address,uint16 registry_id) public   {
                RegulatorStorage(_RegulatorStorageContract).submitCompany(companyAddress,_name, _local_address, registry_id);
                emit AddCompany(companyAddress,_name,registry_id,block.timestamp);
           }

       function getCompany( address _RegulatorStorageContract,uint16 registry_id) public view returns(RegulatorStorage.Company memory)   {
            return RegulatorStorage(_RegulatorStorageContract).getCompany(registry_id);

        }

           function connectCompanyAddress(address _RegulatorStorageContract, address companyAddress,uint16 id) public     {
                RegulatorStorage(_RegulatorStorageContract).connectCompanyAddress(companyAddress, id);
           }

               event finalizeKYC(string    id,address KYCAddress,uint16 company_registry_id ,uint timestamp);



        event submitConsentRequest (string  id,uint16  company_id,uint timestamp)  ;
        event performedConsentRequest (string  id,uint16  company_id,uint16 kyc_manager_id,bool finished,uint timestamp)  ;


        function performFullKYC(address _RegulatorStorageContract, string memory id,uint16 company_registry_id, address  kycadrr) public
        {

          //  require(check_company_registry_id_against_address(company_registry_id),"this company not allowed to make setting!Wrong address!");

             bytes32 idbytes32=id.stringToBytes32();
             RegulatorStorage(_RegulatorStorageContract).submitConsumerKyc(idbytes32,kycadrr);
             emit finalizeKYC(id,kycadrr, company_registry_id ,block.timestamp);

            addCompanionPermission( _RegulatorStorageContract, id , company_registry_id,"*",1);

          }


        event addPermission(address indexed performerAddress,uint16 issuer_id,string  id , uint16 company_registry_id,string  attributeName,uint8   attributepermission ,uint timestamp);
         function addCompanionPermission(address _RegulatorStorageContract, string memory id , uint16 company_registry_id,string memory attributeName,uint8   attributepermission) public   {
                 RegulatorStorage.Consumer memory consumer=getConsumer( _RegulatorStorageContract, id);
                  //bytes32 idbytes32=id.stringToBytes32();
                 require(check_customer_kyc(_RegulatorStorageContract,consumer),"KYC not exist for cusstomer");

                 require(check_company_registry_id_against_address(KYCInt(consumer.kyc).getKYCIssuer( )),"this company not allowed to make setting!Wrong address!");

                  KYCInt(consumer.kyc).setAttributePermission(attributeName,company_registry_id,attributepermission);
                   emit addPermission(msg.sender,getCompanyIdbyAddress(_RegulatorStorageContract,msg.sender), id,company_registry_id,attributeName,attributepermission, block.timestamp);
              }

      function getCompanyIdbyAddress( address _RegulatorStorageContract,address companyAddress) public   returns (uint16)  {
                         return RegulatorStorage(_RegulatorStorageContract).getCompanyIdbyAddress(companyAddress);

                }


        function check_customer_kyc(address _RegulatorStorageContract,RegulatorStorage.Consumer memory consumer ) public view returns(bool )
           {
               require(consumer.registered , "Customer still not  exist !");
               require( consumer.verified , "Customer still not  verified!");

               return (consumer.kyc!=address(0));


           }


    function getConsumer(address _RegulatorStorageContract, string memory id) public
         view returns
         (RegulatorStorage.Consumer memory) {

             return  RegulatorStorage(_RegulatorStorageContract).getConsumer(id.stringToBytes32());


     }




        function getConsentRequests(address _RegulatorStorageContract)
               //     public
                     view
                     external
                     returns (RegulatorStorage.ConsentRequest[] memory)
                 {

                    return RegulatorStorage(_RegulatorStorageContract).getConsentRequests();
                 }

                 event AddConsumer (address indexed consumerAddress,string   id,uint timestamp);

                     //  function to add a customer profile to the database
                     //  returns 0 if successful
                     //  returns 7 if no access rights to transaction request sender
                     //  returns 1 if size limit of the database is reached
                     //  returns 2 if customer already in network

                 function submitConsumer(address _RegulatorStorageContract,address consumerAddress , string memory id) public  {
                     bytes32 idbytes32=id.stringToBytes32();
                     RegulatorStorage(_RegulatorStorageContract).submitConsumer(consumerAddress,idbytes32);

                 }




             function getConsumerAddress(address _RegulatorStorageContract,string memory id ) public view returns(address)   {

                //     bytes32 idbytes32=id.stringToBytes32();
                     return RegulatorStorage(_RegulatorStorageContract).getConsumer(id.stringToBytes32()).chainAddress;
                 }






         function getConsumerAttributeList( address _RegulatorStorageContract,string memory id,uint16 company_registry_id) public view returns(bytes32[] memory)
          {
               RegulatorStorage.Consumer memory consumer=getConsumer( _RegulatorStorageContract, id);
               require(check_customer_kyc(_RegulatorStorageContract,consumer),"KYC not exist for cusstomer");

               return KYCInt(consumer.kyc).getAttributeList();

          }





          function getConsumerAttributePermission( address _RegulatorStorageContract,string memory id,uint16 company_registry_id,string memory attributeName) public view returns(uint8 permission)
              {
                 RegulatorStorage.Consumer memory consumer=getConsumer( _RegulatorStorageContract, id);
                 require(check_customer_kyc(_RegulatorStorageContract,consumer),"KYC not exist for cusstomer");

                  return KYCInt(consumer.kyc).isAttributePermited(attributeName,company_registry_id);

              }

              function getConsumerAttributeValue(address _RegulatorStorageContract,string memory id,uint16 company_registry_id,string memory attributeName) public view returns(bytes32 )
              {
                 RegulatorStorage.Consumer memory consumer=getConsumer( _RegulatorStorageContract, id);
                 require(check_customer_kyc(_RegulatorStorageContract,consumer),"KYC not exist for cusstomer");

                 return KYCInt(consumer.kyc).getAttribute(attributeName,company_registry_id);


              }



              function getConsumerAttributeName(address _RegulatorStorageContract,string memory id,uint row) public view returns(bytes32 )
              {

                 RegulatorStorage.Consumer memory consumer=getConsumer( _RegulatorStorageContract, id);
                 require(check_customer_kyc(_RegulatorStorageContract,consumer),"KYC not exist for cusstomer");

                  return KYCInt(consumer.kyc).getAttributeName( row);

              }

              function getAttributeLength(address _RegulatorStorageContract,string memory id) public view returns(uint )
              {

                 RegulatorStorage.Consumer memory consumer=getConsumer( _RegulatorStorageContract, id);
                 require(check_customer_kyc(_RegulatorStorageContract,consumer),"KYC not exist for cusstomer");

                  return KYCInt(consumer.kyc).getAttributeLength( );

              }



         function getCurrentKYCPIssuer(address _RegulatorStorageContract,string memory id) public view returns(uint16 )
         {
             RegulatorStorage.Consumer memory consumer=getConsumer( _RegulatorStorageContract, id);
             require(check_customer_kyc(_RegulatorStorageContract,consumer),"KYC not exist for cusstomer");

             return KYCInt(consumer.kyc).getKYCIssuer( );

          }



        function createConsentRequest(address _RegulatorStorageContract,string memory id,uint16 company_id,uint16 kyc_manager_id) public   {
             RegulatorStorage.Consumer memory consumer=getConsumer( _RegulatorStorageContract, id);
             require(check_customer_kyc(_RegulatorStorageContract,consumer),"KYC not exist for cusstomer");

             RegulatorStorage(_RegulatorStorageContract).createConsentRequest( id.stringToBytes32(),company_id, kyc_manager_id);

             emit submitConsentRequest(id,  company_id,block.timestamp);
         }


         function finishConsentRequest(address _RegulatorStorageContract,string memory id,uint16 company_id,uint16 kyc_manager_id,bool finished) public   {

             RegulatorStorage(_RegulatorStorageContract).finishConsentRequest(id.stringToBytes32(), company_id, kyc_manager_id, finished);
             emit performedConsentRequest(id,  company_id, kyc_manager_id, finished,block.timestamp);


         }


}
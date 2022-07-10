pragma solidity ^0.8.13;

import "./RegulatorStorage.sol";

interface RegulatorInt {

               function getCompaniesList(address _RegulatorStorageContract) external view returns( uint64 [] memory);

               event finalizeKYC(string    id,address KYCAddress,uint64 company_registry_id ,uint timestamp);


        event submitConsentRequest (string  id,uint64  company_id,uint timestamp)  ;
        event performedConsentRequest (string  id,uint64  company_id,uint64 kyc_manager_id,bool finished,uint timestamp)  ;


        function performFullKYC(address _RegulatorStorageContract, string memory id,uint64 company_registry_id, address  kycadrr) external;


        event addPermission(address indexed performerAddress,uint64 issuer_id,string  id , uint64 company_registry_id,string  attributeName,uint8   attributepermission ,uint timestamp) ;
         function addCompanionPermission(address _RegulatorStorageContract, string memory id , uint64 company_registry_id,string memory attributeName,uint8   attributepermission) external   ;
      function getCompanyIdbyAddress( address _RegulatorStorageContract,address companyAddress) external   returns (uint64)  ;

        function check_customer_kyc(address _RegulatorStorageContract,RegulatorStorage.Consumer memory consumer ) external view returns(bool );
    function getConsumer(address _RegulatorStorageContract, string memory id) external
         view returns
         (RegulatorStorage.Consumer memory) ;




        function getConsentRequests(address _RegulatorStorageContract)
               //     public
                     view
                     external
                     returns (RegulatorStorage.ConsentRequest[] memory);
                 event AddConsumer (address indexed consumerAddress,string   id,uint timestamp);

                     //  function to add a customer profile to the database
                     //  returns 0 if successful
                     //  returns 7 if no access rights to transaction request sender
                     //  returns 1 if size limit of the database is reached
                     //  returns 2 if customer already in network

                 function submitConsumer(address _RegulatorStorageContract,address consumerAddress , string memory id) external  ;



             function getConsumerAddress(address _RegulatorStorageContract,string memory id ) external view returns(address)   ;

         event AddCompany (address indexed companyAdminAddress,string  name,uint64 registry_id, uint timestamp);
         function submitCompany(address _RegulatorStorageContract,address companyAddress , string memory _name,string memory _local_address,uint64 registry_id) external  ;
         function getCompany( address _RegulatorStorageContract,uint64 registry_id) external view returns(RegulatorStorage.Company memory)  ;
         function connectCompanyAddress(address _RegulatorStorageContract, address companyAddress,uint64 id) external    ;




         function getConsumerAttributeList( address _RegulatorStorageContract,string memory id,uint64 company_registry_id) external view returns(bytes32[] memory);


          function getConsumerAttributePermission( address _RegulatorStorageContract,string memory id,uint64 company_registry_id,string memory attributeName) external view returns(uint8 permission);

              function getConsumerAttributeValue(address _RegulatorStorageContract,string memory id,uint64 company_registry_id,string memory attributeName) external view returns(bytes32 );


              function getConsumerAttributeName(address _RegulatorStorageContract,string memory id,uint row) external view returns(bytes32 );
              function getAttributeLength(address _RegulatorStorageContract,string memory id) external view returns(uint );

         function getCurrentKYCPIssuer(address _RegulatorStorageContract,string memory id) external view returns(uint64 );
        function createConsentRequest(address _RegulatorStorageContract,string memory id,uint64 company_id,uint64 kyc_manager_id) external   ;
         function finishConsentRequest(address _RegulatorStorageContract,string memory id,uint64 company_id,uint64 kyc_manager_id,bool finished) external  ;





}
pragma solidity ^0.8.13;

//import "./StringLibrary.sol";
import "./PermissionExtender.sol";
import "./KYC.sol";
import "./RegulatorLib.sol";


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
contract Regulator {

    using StringLibrary for string;

    using RegulatorLib for RegulatorLib.RegulatorStorage;

    RegulatorLib.RegulatorStorage private self;


 //   event RegulatoryContractDeployed (address msgSender,string  msgstr,uint timestamp);

    constructor() public {
        //owner = msg.sender;

      // emit RegulatoryContractDeployed(msg.sender,"Mined",block.timestamp);

        // add bank hapoalin
/*
        address companyAddress = msg.sender ;
        string memory _name= "bank hapoalim" ;
        string memory _local_address="Hanegev 11 Tel aviv";
        uint16 registry_id=1;
        submitCompany( companyAddress ,  _name , _local_address,registry_id);
*/

 /*
        Company storage company=companies[owner];
        company.name   = "בנק הפועלים";
        company.local_address="הנגב 11 תל אביב";
        company.registry_id=1 ;
        companiesList.push(owner);
        companiesIdCache[company.id]=true ;
        emit AddCompany(owner,company.name,block.timestamp);
*/
    }



    event submitConsentRequest (string  id,uint16  company_id,uint timestamp)  ;

   function createConsentRequest(string memory id,uint16 company_id,uint16 kyc_manager_id) public   {
        bytes32 idbytes32=id.stringToBytes32();
       require(self.consumers[idbytes32].registered , "Customer still not  exist !");
        require( self.consumers[idbytes32].verified , "Customer still not  verified!");
        require( getCurrentKYCPIssuer(id)==kyc_manager_id , "Isuer not set correct!");


        for (uint256 i = 0; i < self.consentRequests.length; i++) {

               require( (!(self.consentRequests[i].company_id==company_id && self.consentRequests[i].id==idbytes32
                                   && self.consentRequests[i].kyc_manager_id==kyc_manager_id     && !self.consentRequests[i].performed)) , "request already exist!");

            }

        self.consentRequests.push(RegulatorLib.ConsentRequest(company_id,idbytes32,kyc_manager_id,false,0 ));

        emit submitConsentRequest(id,  company_id,block.timestamp);

    }

         event performedConsentRequest (string  id,uint16  company_id,uint16 kyc_manager_id,bool finished,uint timestamp)  ;


         function finishConsentRequest(string memory id,uint16 company_id,uint16 kyc_manager_id,bool finished) public   {


                 bytes32 idbytes32=id.stringToBytes32();
                 bool finish=false;
                 for (uint256 i = 0; i < self.consentRequests.length; i++) {
                      if (self.consentRequests[i].company_id==company_id && self.consentRequests[i].id==idbytes32
                            && self.consentRequests[i].kyc_manager_id==kyc_manager_id && (! self.consentRequests[i].performed))
                            {
                                 self.consentRequests[i].performed=finished;
                                 self.consentRequests[i].perform_stamp=block.timestamp;
                                 finish=true;

                             }
                 }
                require(finish,"Request with those parameters  not exists!");

                 emit performedConsentRequest(id,  company_id, kyc_manager_id, finished,block.timestamp);


            }


      function getConsentRequests()
      //     public
            view
            external
            returns (RegulatorLib.ConsentRequest[] memory)
        {

            return self.consentRequests;
        }


    function getConsumerAddress(string memory id ) public view returns(address)   {

        bytes32 idbytes32=id.stringToBytes32();
        return self.consumers[idbytes32].chainAddress;
    }

    event AddConsumer (address indexed consumerAddress,string   id,uint timestamp);

                //  function to add a customer profile to the database
                //  returns 0 if successful
                //  returns 7 if no access rights to transaction request sender
                //  returns 1 if size limit of the database is reached
                //  returns 2 if customer already in network

            function submitConsumer(address consumerAddress , string memory id) public  {

                bytes32 idbytes32=id.stringToBytes32();
                require(!self.consumers[idbytes32].registered , "Customer already  exist !");

                RegulatorLib.Consumer storage consumer=self.consumers[idbytes32];
                consumer.chainAddress    = consumerAddress;
                consumer.registered   = true;
                self.consumersCache[consumerAddress]=idbytes32;


            }


            function getConsumer( string memory id) public
                    view returns
                    (RegulatorLib.Consumer memory) {

                        bytes32 idbytes32=id.stringToBytes32();
                        RegulatorLib.Consumer memory consumer=self.consumers[idbytes32];

                        return consumer;
                }



    event AddCompany (address indexed companyAddress,string  name,uint16 registry_id, uint timestamp);
    function submitCompany(address companyAddress , string memory _name,string memory _local_address,uint16 registry_id) public  {
       require(companyAddress!=address(0),"Company address can't be empty");
       // require(companyAddress!=owner,"Company address can't be same as regulator");
        require( self.companiesbyid[registry_id].registry_id==0 , "Company with this id already exist!");
        RegulatorLib.Company storage company=self.companiesbyid[registry_id];
        company.name   = _name;
        company.local_address=_local_address;
        company.registry_id=registry_id;
        self.companiesList.push(registry_id);
        self.companiesbyaddress[companyAddress]=registry_id;
        emit AddCompany(companyAddress,_name,registry_id,block.timestamp);
    }




    function getCompany( uint16 registry_id) public view returns(string memory,string memory,uint16 )   {
        require( self.companiesbyid[registry_id].registry_id!=0 , "Company with this id not exist!");
            RegulatorLib.Company memory company=self.companiesbyid[registry_id];
            return (company.name,company.local_address,company.registry_id);
        }


    function connectCompanyAddress( address companyAddress,uint16 id) public     {
         //   require(companyAddress ==owner || companyAddress!=owner,"Company address can't be same as regulator");
        //require(true!=true,"Not implemented yet");
        self.companiesbyaddress[companyAddress]=id;

    }







    function check_company_registry_id_against_address(uint16 company_id) public payable returns(bool) {

                  return (self.companiesbyaddress[ msg.sender] ==  company_id)  ;

     }

    event finalizeKYC(string    id,address permissionExtenderAddress,uint16 company_registry_id ,uint timestamp);

   function performFullKYC(string memory fullname,string memory id,string memory issued_country,string memory laddress,string memory sex,
        string memory date_of_birth,  bool  isSmoking,  uint16 company_registry_id) public   {

            require(check_company_registry_id_against_address(company_registry_id),"this company not allowed to make setting!Wrong address!");

            bytes32 idbytes32=id.stringToBytes32();
            RegulatorLib.Consumer storage consumer=self.consumers[idbytes32];
            PermissionExtender  kyc = new KYC( address(this),company_registry_id, fullname, id, issued_country,
                         laddress,  sex,  date_of_birth,  isSmoking);

            consumer.kyc =  address(kyc);
            consumer.verified=true;
            emit finalizeKYC(id,address(kyc), company_registry_id ,block.timestamp);

            addCompanionPermission(id , company_registry_id,"*",1);


     }


    event addPermission(address indexed performerAddress,uint16 issuer_id,string  id , uint16 company_registry_id,string  attributeName,uint8   attributepermission ,uint timestamp);

    function getConsumerAttributeList( string memory id,uint16 company_registry_id) public view returns(bytes32[] memory)
             {
                bytes32 idbytes32=id.stringToBytes32();
                require(self.consumers[idbytes32].kyc != address(0)  ,"KYC not exist for cusstomer");

                 return PermissionExtender(self.consumers[idbytes32].kyc).getAttributeList();

             }


    function addCompanionPermission(string memory id , uint16 company_registry_id,string memory attributeName,uint8   attributepermission) public   {

             //require(PermissionExtender(permissionExtenderAddress).getCustomerAddress ==getConsumerAddress(id));

             bytes32 idbytes32=id.stringToBytes32();
            require(self.consumers[idbytes32].kyc != address(0)  ,"KYC not exist for cusstomer");
            require(check_company_registry_id_against_address(getCurrentKYCPIssuer(id)),"this company not allowed to make setting!Wrong address!");



             PermissionExtender(self.consumers[idbytes32].kyc).setAttributePermission(attributeName,company_registry_id,attributepermission);
              emit addPermission(msg.sender,self.companiesbyaddress[ msg.sender], id,company_registry_id,attributeName,attributepermission, block.timestamp);
         }

     function getConsumerAttributePermission( string memory id,uint16 company_registry_id,string memory attributeName) public view returns(uint8 permission)
         {
            bytes32 idbytes32=id.stringToBytes32();
            require(self.consumers[idbytes32].kyc != address(0)  ,"KYC not exist for cusstomer");

             return PermissionExtender(self.consumers[idbytes32].kyc).isAttributePermited(attributeName,company_registry_id);

         }

         function getConsumerAttributeValue(string memory id,uint16 company_registry_id,string memory attributeName) public view returns(bytes32 )
         {
            bytes32 idbytes32=id.stringToBytes32();
            require(self.consumers[idbytes32].kyc != address(0)  ,"KYC not exist for cusstomer");
          //  require( consumers[getConsumerAddress(id)].permissions[basecompanyAddress]!= address(0) ,"KYC not permited");
            return PermissionExtender(self.consumers[idbytes32].kyc).getAttribute(attributeName,company_registry_id);

         }

         function getConsumerAttributeName(string memory id,uint row) public view returns(bytes32 )
         {

            bytes32 idbytes32=id.stringToBytes32();
            require(self.consumers[idbytes32].kyc!=address(0) ,"KYC not exist for cusstomer");

            return PermissionExtender(self.consumers[idbytes32].kyc).getAttributeName( row);

         }
         function getAttributeLength(string memory id) public view returns(uint )
         {

            bytes32 idbytes32=id.stringToBytes32();
            require(self.consumers[idbytes32].kyc!=address(0),"KYC not exist for cusstomer");
            return PermissionExtender(self.consumers[idbytes32].kyc).getAttributeLength( );

         }



    function getCurrentKYCPIssuer(string memory id) public view returns(uint16 )
    {


                bytes32 idbytes32=id.stringToBytes32();
                require(self.consumers[idbytes32].kyc!=address(0),"KYC not exist for cusstomer");

                return PermissionExtender(self.consumers[idbytes32].kyc).getKYCIssuer( );


     }



    function getCompaniesList() public view returns(  uint16 [] memory)
    {
        return self.companiesList;
    }


}

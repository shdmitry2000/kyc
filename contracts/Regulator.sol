pragma solidity ^0.8.13
 //^0.6.4;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/ownership/Ownable.sol"

import "./KYC.sol";
import "./IdentityUtils.sol";

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
contract Regulator is Owners,IdentityUtils{


    event RegulatoryContractDeployed (address msgSender,string  msgstr,uint timestamp);

    constructor() public {
        owner = msg.sender;

       emit RegulatoryContractDeployed(owner,"Mined",now);
        // add bank hapoalin
        submitCompany( owner ,
        "בנק הפועלים"
        ,"הנגב 11 תל אביב",
         1);


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

    //describes the beneficiary object
        struct Company {
            string name;
            string local_address;
            uint16 registry_id;
        }


        mapping (uint16=>Company) public companiesbyid ;
        mapping (address=>uint16) public companiesbyaddress;
        uint16  []  public companiesList;



    struct Consumer {
            address chainAddress;
            bool registered;
            bool verified;
            address kyc;
            bool require_update;
            bool update_in_progress;
            //mapping(uint16 => address)  permissions;
            //mapping(address => mapping(address => bool) )  requests;

        }

        mapping (bytes32=>Consumer)  consumers;
        mapping (address=>bytes32)  consumersCache;


    // KycRequest struct. It defines kyc request details of customers
            struct ConsentRequest {
                uint16 company_id;
                bytes32 id;
                uint16 kyc_manager_id;
                bool performed;
                uint perform_stamp;
            }

           ConsentRequest[]  consentRequests ;
           //mapping(bytes32 => ConcensusRequest) public concensusRequests


    event submitConsentRequest (string  id,uint16  company_id,uint timestamp)  ;

           function createConsentRequest(string memory id,uint16 company_id,uint16 kyc_manager_id) public   {

            //   require(!check_is_consent_request_exist(id, company_id),"Request already exists!");
            //   require(consumers[id].chainAddress != address(0), "Customer still not  exist!");
            //   require( !consumers[id].verified , "Customer still not  verified!");

            bytes32 idbytes32=stringToBytes32(id);
            consentRequests.push(ConsentRequest(company_id,idbytes32,kyc_manager_id,false,0 ));

            emit submitConsentRequest(id,  company_id,block.timestamp);

           // return consentRequests.length;
         }

         event performedConsentRequest (string  id,uint16  company_id,uint16 kyc_manager_id,bool finished,uint timestamp)  ;


         function finishConsentRequest(string memory id,uint16 company_id,uint16 kyc_manager_id,bool finished) public   {

                     //   require(!check_is_consent_request_exist(id, company_id),"Request already exists!");
                     //   require(consumers[id].chainAddress != address(0), "Customer still not  exist!");
                     //   require( !consumers[id].verified , "Customer still not  verified!");


                     bytes32 idbytes32=stringToBytes32(id);
                     for (uint256 i = 0; i < consentRequests.length; i++) {
                          if (consentRequests[i].company_id==company_id && consentRequests[i].id==idbytes32
                                                  && consentRequests[i].kyc_manager_id==kyc_manager_id)
                                {
                                     consentRequests[i].performed=finished;
                                     consentRequests[i].perform_stamp=block.timestamp;

                                 }

                     emit performedConsentRequest(id,  company_id, kyc_manager_id, finished,block.timestamp);
                  }

    }

    /*
           function getConsentRequestsbyConsumer(string memory id,uint16 company_id)
                public external
                view
                returns (uint16[] memory)
            {
                    require(true != true,"not implemented yet!");
                    bytes32 idbytes32=stringToBytes32(id);
                    uint16[] memory consentList=new uint16[] ;
                   // uint16 count = 0;

                    // Get all the dataHash of the customer for which bank has raised a request
                    for (uint256 i = 0; i < consentRequests.length; i++) {
                        if (consentRequests[i].id== idbytes32) {
                            consentList.push(consentRequests[i].company_id);
                        }

                    }
                    return consentList;
                }

           function getConsentRequestsbyCompany(uint16 company_id) public
            view
            returns (string[] memory)

        {
                require(true != true,"not implemented yet!");
                string[] memory consentList ;
                uint16 count = 0;

                // Get all the dataHash of the customer for which bank has raised a request
                for (uint256 i = 0; i < consentRequests.length; i++) {
                    if (consentRequests[i].company_id == company_id) {

                    string id=bytes32ToString(consentRequests[i].id);
                    consentList.push(id);
                    }

                }
                return consentList;
            }

    */
        function getConsentRequests()
      //     public
            view
            external
            returns (ConsentRequest[] memory)

        {

                return consentRequests;
            }





    function getConsumerAddress(string memory id ) public view returns(address)   {

        bytes32 idbytes32=stringToBytes32(id);
        return consumers[idbytes32].chainAddress;
    }

    event AddConsumer (address indexed consumerAddress,string   id,uint timestamp);

                //  function to add a customer profile to the database
                //  returns 0 if successful
                //  returns 7 if no access rights to transaction request sender
                //  returns 1 if size limit of the database is reached
                //  returns 2 if customer already in network

            function submitConsumer(address consumerAddress , string memory id) public returns (uint) {

                bytes32 idbytes32=stringToBytes32(id);
           /*
                if (consumers[idbytes32].chainAddress!= address(0))
                    return 2;
*/
                Consumer storage consumer=consumers[idbytes32];
                consumer.chainAddress    = consumerAddress;
                consumer.registered   = true;
                consumersCache[consumerAddress]=idbytes32;

                return 0;
            }


            function getConsumer( string memory id) public
                    view returns
                    (Consumer memory) {

                        bytes32 idbytes32=stringToBytes32(id);
                        Consumer memory consumer=consumers[idbytes32];

                        return consumer;
                }



    event AddCompany (address indexed companyAddress,string  name,uint16 registry_id, uint timestamp);
    function submitCompany(address companyAddress , string memory _name,string memory _local_address,uint16 registry_id) public  {
  //      require(companyAddress!=owner,"Company address can't be same as regulator");
  //      require( companiesbyid[company_id].registry_id==0 , "Company with this id already exist!");
        Company storage company=companiesbyid[registry_id];
        company.name   = _name;
        company.local_address=_local_address;
        company.registry_id=registry_id;
        companiesList.push(registry_id);
        companiesbyaddress[companyAddress]=registry_id;
        emit AddCompany(companyAddress,_name,registry_id,block.timestamp);
    }




    function getCompany( uint16 registry_id) public view returns(string memory,string memory,uint16 )   {
 //       require( companiesIdCache[registry_id] , "Company with this id not exist!");

            Company memory company=companiesbyid[registry_id];
            return (company.name,company.local_address,company.registry_id);
        }


    function connectCompanyAddress( address companyAddress,uint16 id) public     {
         //   require(companyAddress ==owner || companyAddress!=owner,"Company address can't be same as regulator");
        require(true!=true,"Not implemented yet");
        companiesbyaddress[companyAddress]=id;

    }



/*
       function check_is_consent_request_exist(string memory id,uint16 company_id) public payable returns(bool) {
               return false;
       }
*/


    event finalizeKYC(string    id,address permissionExtenderAddress,uint16 company_registry_id ,uint timestamp);
    function performKYC(string memory id , address permissionExtenderAddress,uint16 company_registry_id) public   {

        bytes32 idbytes32=stringToBytes32(id);
        Consumer storage consumer=consumers[idbytes32];
        consumer.kyc=  permissionExtenderAddress;
        emit finalizeKYC(id,PermissionExtender(permissionExtenderAddress).getOwner(), company_registry_id ,block.timestamp);


        addCompanionPermission(id , company_registry_id,"*",1);


        }




   function performFullKYC(string memory fullname,string memory id,string memory issued_country,string memory laddress,string memory sex,
        string memory date_of_birth,  bool  smoking,  uint16 company_registry_id) public   {

            bytes32 idbytes32=stringToBytes32(id);
            Consumer storage consumer=consumers[idbytes32];
            PermissionExtender kyc = new KYC( company_registry_id, fullname, id, issued_country, laddress, sex, date_of_birth,
                                           smoking );
            consumer.kyc =  address(kyc);
            emit finalizeKYC(id,kyc.getOwner(), company_registry_id ,block.timestamp);


            addCompanionPermission(id , company_registry_id,"*",1);


            }

/*
    function getKYC(string memory id) public view returns(kyc )
     {
            bytes32 idbytes32=stringToBytes32(id);

             // require(consumers[idbytes32].chainAddress != address(0) && consumers[getConsumerAddress(id)].permissions[basecompanyAddress]!= address(0));
             return consumers[idbytes32].kyc;

      }
*/


    event addPermission(address indexed performerAddress,string  id , uint16 company_registry_id,string  attributeName,uint8   attributepermission ,uint timestamp);

    function getConsumerAttributeList( string memory id,uint16 company_registry_id) public view returns(bytes32[] memory)
             {
                bytes32 idbytes32=stringToBytes32(id);
                 return PermissionExtender(consumers[idbytes32].kyc).getAttributeList();

             }


    function addCompanionPermission(string memory id , uint16 company_registry_id,string memory attributeName,uint8   attributepermission) public   {

             //        require(PermissionExtender(permissionExtenderAddress).getCustomerAddress ==getConsumerAddress(id));

             bytes32 idbytes32=stringToBytes32(id);

             PermissionExtender(consumers[idbytes32].kyc).setAttributePermission(attributeName,company_registry_id,attributepermission);

              emit addPermission(msg.sender, id,company_registry_id,attributeName,attributepermission, now);
         }

     function getConsumerAttributePermission( string memory id,uint16 company_registry_id,string memory attributeName) public view returns(int permission)
         {
            bytes32 idbytes32=stringToBytes32(id);
             return PermissionExtender(consumers[idbytes32].kyc).isAttributePermited(attributeName,company_registry_id);

         }

         function getConsumerAttributeValue(string memory id,uint16 company_registry_id,string memory attributeName) public view returns(bytes32 )
         {
            bytes32 idbytes32=stringToBytes32(id);
             // require(consumers[idbytes32].chainAddress != address(0) && consumers[getConsumerAddress(id)].permissions[basecompanyAddress]!= address(0));
             return PermissionExtender(consumers[idbytes32].kyc).getAttribute(attributeName,company_registry_id);

         }

         function getConsumerAttributeName(string memory id,uint row) public view returns(bytes32 )
         {

            bytes32 idbytes32=stringToBytes32(id);
             // require(consumers[idbytes32].chainAddress != address(0) && consumers[getConsumerAddress(id)].permissions[basecompanyAddress]!= address(0));
             return PermissionExtender(consumers[idbytes32].kyc).getAttributeName( row);

         }
         function getAttributeLength(string memory id) public view returns(uint )
         {

            bytes32 idbytes32=stringToBytes32(id);
             // require(consumers[idbytes32].chainAddress != address(0) && consumers[getConsumerAddress(id)].permissions[basecompanyAddress]!= address(0));
             return PermissionExtender(consumers[idbytes32].kyc).getAttributeLength( );

         }



    function getCurrentKYCPerformer(string memory id) public view returns(uint )
    {
                bytes32 idbytes32=stringToBytes32(id);
                if (consumers[idbytes32].kyc!=address(0))
                {
                    return PermissionExtender(consumers[idbytes32].kyc).getKYCIssuer( );
                }
                else
                {
                    return 0;
                }

     }



    function getCompaniesList() public view returns(  uint16 [] memory)
    {
        // require(consumers[getConsumerAddress(id)].chainAddress != address(0) && consumers[getConsumerAddress(id)].permissions[basecompanyAddress]!= address(0));

        return companiesList;
    }





}

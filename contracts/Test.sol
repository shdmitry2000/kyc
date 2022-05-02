pragma solidity ^0.6.4;
pragma experimental ABIEncoderV2;


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
contract Test is IdentityUtils{


// KycRequest struct. It defines kyc request details of customers
        struct ConsentRequest {
            uint8 company_id;
            bytes32 id;
        }

       ConsentRequest[]  consentRequests ;
       //mapping(bytes32 => ConcensusRequest) public concensusRequests


event submitConsentRequest (string  id,uint8  company_id,uint timestamp)  ;

       function createConsentRequest(string memory id,uint8 company_id) public   {
        //   require(!check_is_consent_request_exist(id, company_id),"Request already exists!");
        //   require(consumers[id].chainAddress != address(0), "Customer still not  exist!");
        //   require( !consumers[id].verified , "Customer still not  verified!");

        bytes32 idbytes32=stringToBytes32(id);
        consentRequests.push(ConsentRequest(company_id,idbytes32 ));

        emit submitConsentRequest(id,  company_id,block.timestamp);

       // return consentRequests.length;
     }

/*
       function getConsentRequestsbyConsumer(string memory id,uint8 company_id)
            public external
            view
            returns (uint8[] memory)
        {
                require(true != true,"not implemented yet!");
                bytes32 idbytes32=stringToBytes32(id);
                uint8[] memory consentList=new uint8[] ;
               // uint8 count = 0;

                // Get all the dataHash of the customer for which bank has raised a request
                for (uint256 i = 0; i < consentRequests.length; i++) {
                    if (consentRequests[i].id== idbytes32==0) {
                        consentList.push(consentRequests[i].company_id);
                    }

                }
                return consentList;
            }

       function getConsentRequestsbyCompany(uint8 company_id) public
        view
        returns (string[] memory)

    {
            require(true != true,"not implemented yet!");
            string[] memory consentList ;
            uint8 count = 0;

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
            //require(true != true,"not implemented yet!");

            return consentRequests;
        }





//describes the beneficiary object
    struct Consumer {
        address chainAddress;
        bool registered;
        bool verified;
        address kyc;
        bool require_update;
        bool update_in_progress;
        //mapping(uint8 => address)  permissions;
        //mapping(address => mapping(address => bool) )  requests;

    }

    mapping (bytes32=>Consumer)  consumers;
    mapping (address=>bytes32)  consumersCache;

    mapping (uint=>Consumer)  consumers2;
    mapping (address=>uint)  consumersCache2;

    mapping (uint32=>Consumer)  consumers3;
    mapping (address=>uint32)  consumersCache3;

    event AddConsumer (address indexed consumerAddress,string   id,uint timestamp);

            //  function to add a customer profile to the database
            //  returns 0 if successful
            //  returns 7 if no access rights to transaction request sender
            //  returns 1 if size limit of the database is reached
            //  returns 2 if customer already in network

        function submitConsumer(address consumerAddress , string memory id) public returns (uint) {

            bytes32 idbytes32=stringToBytes32(id);
            if (consumers[idbytes32].chainAddress!= address(0))
                return 2;

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



function submitConsumer2(address consumerAddress , uint id) public returns (uint) {


             if (consumers2[id].chainAddress!= address(0))
                 return 2;

             Consumer storage consumer=consumers2[id];
             consumer.chainAddress    = consumerAddress;
             consumer.registered   = true;
             consumersCache2[consumerAddress]=id;

              return 0;
         }


         function getConsumer2( uint id) public
                 view returns
                 (Consumer memory) {

                     Consumer memory consumer=consumers2[id];

                     return consumer;
             }

function submitConsumer3(address consumerAddress , uint32 id) public returns (uint) {

            if (consumers3[id].chainAddress!= address(0))
                return 2;

            Consumer storage consumer=consumers3[id];
            consumer.chainAddress    = consumerAddress;
            consumer.registered   = true;
            consumersCache3[consumerAddress]=id;

            //emit AddConsumer(consumerAddress,id,block.timestamp);
            return 0;
        }


        function getConsumer3( uint32 id) public
                view returns
                (Consumer memory) {

                     Consumer memory consumer=consumers3[id];

                    return consumer;
            }

            /*
                function newKYCContract(address _customer,string memory fullname,string memory id,string memory laddress, string memory bank_account,
                            string memory creadit_card_number, string memory  smoking, bool  isAlergic  )
                            public payable returns(address)  {
                    KYC kyc = new KYC( _customer, fullname, id, laddress,  bank_account,
                                                  creadit_card_number,   smoking,   isAlergic );
                    return address(kyc);
              }
            */
}
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/access/Ownable.sol";
//import "./KYCInt.sol";

contract RegulatorStorage is   Ownable {

            struct Company {
                            string name;
                            string local_address;
                            uint16 registry_id;
            }


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
        struct ConsentRequest {
                        uint16 company_id;
                        bytes32 id;
                        uint16 kyc_manager_id;
                        bool performed;
                        uint perform_stamp;
                    }


    //        struct RegulatorStorage {




                mapping (uint16=>Company)  companiesbyid ;
                mapping (address=>uint16)  companiesbyaddress;
                uint16  []   companiesList;


                mapping (bytes32=>Consumer)  consumers;
                mapping (address=>bytes32)  consumersCache;


            // KycRequest struct. It defines kyc request details of customers


                   ConsentRequest[]  consentRequests ;
                   //mapping(bytes32 => ConcensusRequest)  concensusRequests

    //    }



     function submitCompany(address companyAddress , string memory _name,string memory _local_address,uint16 registry_id) public  onlyOwner {
       require(companyAddress!=address(0),"Company address can't be empty");
        require( companiesbyid[registry_id].registry_id==0 , "Company with this id already exist!");
        RegulatorStorage.Company storage company=companiesbyid[registry_id];
        company.name   = _name;
        company.local_address=_local_address;
        company.registry_id=registry_id;
        companiesList.push(company.registry_id);
        connectCompanyAddress(companyAddress,registry_id);
     }


    function getCompany( uint16 registry_id) public view returns(RegulatorStorage.Company memory) {
        require( companiesbyid[registry_id].registry_id!=0 , "Company with this id not exist!");
            return companiesbyid[registry_id];
        }


    function connectCompanyAddress( address companyAddress,uint16 id) public  onlyOwner   {
        companiesbyaddress[companyAddress]=id;

    }


    function getCompanyIdbyAddress( address companyAddress) public   returns (uint16)  {
             //   require(companyAddress ==owner || companyAddress!=owner,"Company address can't be same as regulator");
            //require(true!=true,"Not implemented yet");
            return companiesbyaddress[companyAddress];

        }





    function getConsumer(bytes32 idbytes32) public view returns(Consumer memory )
         {

            return consumers[idbytes32];

         }




        function getCompaniesList() public view returns( uint16 [] memory)
        {
            return companiesList;
        }




    function createConsentRequest(bytes32 idbytes32,uint16 company_id,uint16 kyc_manager_id) public  onlyOwner {

            for (uint256 i = 0; i < consentRequests.length; i++) {

                   require( !(consentRequests[i].company_id==company_id && consentRequests[i].id==idbytes32
                                       && consentRequests[i].kyc_manager_id==kyc_manager_id     && !consentRequests[i].performed) , "request already exist!");

            }

            consentRequests.push(ConsentRequest(company_id,idbytes32,kyc_manager_id,false,0 ));

        }

    function finishConsentRequest(bytes32 idbytes32,uint16 company_id,uint16 kyc_manager_id,bool finished) public onlyOwner  {
             bool finish=false;
             for (uint256 i = 0; i < consentRequests.length; i++) {
                  if (consentRequests[i].company_id==company_id && consentRequests[i].id==idbytes32
                        && consentRequests[i].kyc_manager_id==kyc_manager_id && (! consentRequests[i].performed))
                        {
                             consentRequests[i].performed=finished;
                             consentRequests[i].perform_stamp=block.timestamp;
                             finish=true;

                         }
             }
            require(finish,"Request with those parameters  not exists!");


        }




    function getConsentRequests()
      //     public
            view
            external
            returns (ConsentRequest[] memory)
        {

            return consentRequests;
        }


                //  function to add a customer profile to the database
                //  returns 0 if successful
                //  returns 7 if no access rights to transaction request sender
                //  returns 1 if size limit of the database is reached
                //  returns 2 if customer already in network

            function submitConsumer(address consumerAddress , bytes32 idbytes32) public   onlyOwner{
                require(!consumers[idbytes32].registered , "Customer already  exist !");

                Consumer storage consumer=consumers[idbytes32];
                consumer.chainAddress    = consumerAddress;
                consumer.registered   = true;
                consumersCache[consumerAddress]=idbytes32;
            }


      function submitConsumerKyc( bytes32 idbytes32,address _KYCIntadr) public   onlyOwner
      {

                     require(consumers[idbytes32].registered , "Customer not registred/exist yet!");

                  //   require(check_company_registry_id_against_address(company_registry_id),"this company not allowed to make setting!Wrong address!");

                   //   Consumer storage consumer=consumers[idbytes32];

                   //   consumer.kyc =  _KYCIntadr;
                   //   consumer.verified=true;
                    consumers[idbytes32].kyc = _KYCIntadr;
                    consumers[idbytes32].verified = true;



      }




}


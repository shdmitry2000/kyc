pragma solidity ^0.8.13;

import "./StringLibrary.sol";
import "./KYCInt.sol";


library RegulatorLib {
        using StringLibrary for string;

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


        struct RegulatorStorage {




            mapping (uint16=>Company)  companiesbyid ;
            mapping (address=>uint16)  companiesbyaddress;
            uint16  []   companiesList;




            mapping (bytes32=>Consumer)  consumers;
            mapping (address=>bytes32)  consumersCache;


        // KycRequest struct. It defines kyc request details of customers


               ConsentRequest[]  consentRequests ;
               //mapping(bytes32 => ConcensusRequest)  concensusRequests

    }


        function getConsumerAttributeValue(RegulatorLib.RegulatorStorage storage self,string memory id,uint16 company_registry_id,string memory attributeName) public view returns(bytes32 )
                      {
                         bytes32 idbytes32=id.stringToBytes32();
                         require(self.consumers[idbytes32].kyc != address(0)  ,"KYC not exist for cusstomer");
                       //  require( consumers[getConsumerAddress(id)].permissions[basecompanyAddress]!= address(0) ,"KYC not permited");
                         return KYCInt(self.consumers[idbytes32].kyc).getAttribute(attributeName,company_registry_id);

                      }
    /*
     function getAttribute(RegulatorLib.RegulatorStorage storage self,string memory attrName,uint16 companion_id) view public  returns (bytes32 )
                {

                    if (isAttributePermited(self,attrName, companion_id)!=0)
                    {
                        return getAttributeValue(self,attrName);
                    }
                        else
                            return string("not permited").stringToBytes32();

                }
                */

}




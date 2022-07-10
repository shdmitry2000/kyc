pragma solidity ^0.8.13;

import "./StringLibrary.sol";
import "./KYCStorage.sol";
import "./KYC.sol";

library KYCLib {
        using StringLibrary for string;
        using StringLibrary for bytes32;



               function init(address _KYCStorage  ,string memory id, uint16 _kycIssuer,string[] memory   attributesList, string[] memory attributesVal)   public
                   {

                   KYCStorage(_KYCStorage).setKYCIssuer(_kycIssuer);


                   for (uint i=0; i < attributesList.length; i++) {
                       KYCStorage(_KYCStorage).addAttributeStr(attributesList[i],attributesVal[i]);
                   }



                   KYCStorage(_KYCStorage).addAttributeStr("id",id);



                   }


           function setAttributePermission(address _KYCStorage  ,string memory  attributeName ,uint16 companion_id , uint8 permission)  public
               {

                   KYCStorage(_KYCStorage).setAttributePermission(attributeName , companion_id ,  permission);

                }





                   function getKYCIssuer(address _KYCStorage  )  view   external  returns (uint16)
                   {
                       return KYCStorage(_KYCStorage).getKYCIssuer();
                   }

                   function getAttributeName(address _KYCStorage  ,uint row)    view external   returns (bytes32)
                   {
                       return KYCStorage(_KYCStorage).getAttributeName(row);
                   }

                   function getAttributeLength(address _KYCStorage  )   view external   returns (uint)
                   {
                       return KYCStorage(_KYCStorage).getAttributeLength();
                   }

                   function getAttributeList(address _KYCStorage  )   external view  returns (bytes32[] memory)
                       {
                           return KYCStorage(_KYCStorage).getAttributeList();
                       }



                   function isAttributePermited(address _KYCStorage  ,string memory  attrName,uint16 companion_id) view public  returns (uint8)
                   {
                           return KYCStorage(_KYCStorage).isAttributePermited(attrName, companion_id);

                   }



                   function getAttribute(address _KYCStorage ,string memory attrName,uint16 companion_id) view public  returns (bytes32 )
                   {

                       return KYCStorage(_KYCStorage).getAttribute(attrName, companion_id);


                   }



       }

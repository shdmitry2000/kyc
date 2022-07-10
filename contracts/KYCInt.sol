pragma solidity ^0.8.13;

interface KYCInt {
   /* struct KYCStorage {
                bytes32[]   attributesList;
                mapping(string => mapping(uint64 => uint8)) permissions;

                uint64 kycPerformer;
              mapping(string => bytes32)  attributes;
       }
*/
   //                function setAttributePermission(string memory  attributeName ,uint64 companion_id , uint8 permission)  public ;
 /*
                   function getAttributeValue(string memory attrName,uint64 companion_id)  view external       returns (bytes32);
                   function getKYCIssuer()  view   external  returns (uint64);
                   function getAttributeName(uint row)    view external   returns (bytes32);
                   function getAttributeLength()   view external   returns (uint);
                   function getAttributeList()   external view  returns (bytes32[] memory);
                   function isAttributePermited(string memory  attrName,uint64 companion_id) view public  returns (uint8);
                   function getAttribute(string memory attrName,uint64 companion_id) view public  returns (bytes32 );
    */
      //             function getAttributeValue(string memory attrName,uint64 companion_id) view  external returns (bytes32);
                   function getKYCIssuer()   view  external  returns (uint64);
                   function getAttributeName(uint row) view external   returns (bytes32);
                   function getAttributeLength() view external  returns (uint);
                   function getAttributeList() view external  returns (bytes32[] memory);
                   function setAttributePermission(string memory  attributeName ,uint64 companion_id , uint8 permission)  external   ;
                   function isAttributePermited(string memory  attrName,uint64 companion_id) view  external returns (uint8);
                   function getAttribute(string memory attrName,uint64 companion_id) view  external returns (bytes32 );



}
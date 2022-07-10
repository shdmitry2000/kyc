pragma solidity ^0.8.13;


interface  KYCInt {

    function getKYCIssuer()   view   external returns (uint16);
    function getAttributeName(uint row) view external   returns (bytes32);
    function getAttributeLength() view external  returns (uint);
    function getAttributeList() view external  returns (bytes32[] memory);
    function setAttributePermission(string memory  attributeName ,uint16 companion_id , uint8 permission)  external   ;
    function isAttributePermited(string memory  attrName,uint16 companion_id) view  external returns (uint8);
    function getAttribute(string memory attrName,uint16 companion_id) view  external returns (bytes32 );
    //function getAttributeValue(string memory attrName,uint16 companion_id) view  external returns (bytes32);




}

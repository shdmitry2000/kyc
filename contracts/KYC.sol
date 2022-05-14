pragma solidity ^0.8.13;

import "./PermissionExtender.sol";
import "./KYCLib.sol";

/*
library KYCAttribLib {

        mapping(string => bytes32)  attributes;
*/


contract KYC is PermissionExtender {

    using KYCLib for KYCLib.KombuchaStorage;

    modifier onlyOperator {
            require(msg.sender == operatorContract);
            _;
        }

    address operatorContract;
    KYCLib.KombuchaStorage private self;




    constructor(address _operatorContract,uint16 _kycPerformer,string memory fullname,string memory id,string memory issued_country,
                string memory laddress, string memory sex, string memory date_of_birth,  bool  isSmoking) public {
               operatorContract=_operatorContract;
        operatorContract=_operatorContract;
        self.init( _kycPerformer, fullname, id, issued_country,
                                  laddress,  sex,  date_of_birth,    isSmoking);
    }



    function getAttributeValue(string memory attrName)  view public      onlyOperator returns (bytes32)
    {
        self.getAttributeValue(attrName);
    }

    function getKYCIssuer()  view   external onlyOperator returns (uint16)
    {
        return self.getKYCIssuer();
    }

    function getAttributeName(uint row)    view external onlyOperator virtual returns (bytes32)
    {
        return self.getAttributeName(row);
    }

    function getAttributeLength()   view external  onlyOperator returns (uint)
    {
        return self.getAttributeLength();
    }

    function getAttributeList()   external view onlyOperator returns (bytes32[] memory)
    {
       return self.getAttributeList();
    }

    function setAttributePermission(string memory  attributeName ,uint16 companion_id , uint8 permission)  external  onlyOperator
    {

        return self.setAttributePermission(attributeName , companion_id ,  permission);

     }



    function isAttributePermited(string memory  attributeName,uint16 companion_id) view public onlyOperator returns (uint8)
    {
            return self.isAttributePermited(attributeName , companion_id );

    }



    function getAttribute(string memory attributeName,uint16 companion_id) view public onlyOperator returns (bytes32 )
    {

        return self.getAttribute(attributeName , companion_id );
    }



}

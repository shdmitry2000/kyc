pragma solidity ^0.8.13;

import "./KYCInt.sol";
import "./KYCLib.sol";



contract KYC is KYCInt {

    using KYCLib for KYCLib.KYCStorage;

    modifier onlyOperator {
            require(msg.sender == operatorContract);
            _;
        }

    address operatorContract;
    KYCLib.KYCStorage private self;



    constructor(address _operatorContract ,string memory id, uint16 _kycPerformer,string[] memory   attributesList, string[] memory attributesVal)   public
    {

      //  require(attributesList.length==attributesVal.length , "Customer still not  exist !");
        operatorContract=_operatorContract;
        self.init(  id,_kycPerformer, attributesList,attributesVal);

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
/*
    function getAttributeValue(string memory attributeName,uint16 companion_id) view public onlyOperator returns (bytes32)
        {

            self.getAttributeValue(attributeName,companion_id);
        }
*/
}

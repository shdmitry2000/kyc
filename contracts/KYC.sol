pragma solidity ^0.6.4;
pragma experimental ABIEncoderV2;

import "./PermissionExtender.sol";



contract KYC is PermissionExtender {

    bytes32[] public  attributesList;
    //string[] public  attributesList;
   // address customer;
    uint8 kycPerformer;
    mapping(string => bytes32) internal attributes;
    
    constructor(uint8 _kycPerformer,string memory fullname,string memory id,string memory issued_country,
            string memory laddress, string memory sex, string memory date_of_birth,  bool  isSmoking) public {
           kycPerformer=_kycPerformer;
           // customer=_customer;
            attributesList.push(stringToBytes32("fullname"));
            attributes["fullname"]=stringToBytes32(fullname);
            attributesList.push(stringToBytes32("id"));
            attributes["id"]=stringToBytes32(id);
            attributesList.push(stringToBytes32("issued_country"));
            attributes["issued_country"]=stringToBytes32(issued_country);
            attributesList.push(stringToBytes32("address"));
            attributes["address"]=stringToBytes32(laddress);

            attributesList.push(stringToBytes32("sex"));
            attributes["sex"]=stringToBytes32(sex);

            attributesList.push(stringToBytes32("date_of_birth"));
            attributes["date_of_birth"]=stringToBytes32(date_of_birth);
    
            attributesList.push(stringToBytes32("smoking"));
            if(isSmoking)
                attributes["smoking"]=stringToBytes32("YES");
            else
                attributes["smoking"]=stringToBytes32("NO");

        }
        
        








function getAttributeValue(string memory attrName)  override  view internal virtual  returns (bytes32)
{
    return attributes[attrName];
}

/*
function getCustomerAddress()  override  view public virtual returns (address)
{
    return customer;
}
*/
    function getKYCPerformer()  override  view public virtual returns (uint8)
    {
        return kycPerformer;
    }

    function getAttributeName(uint row) override   view public virtual returns (bytes32)
    {
        if (row<attributesList.length)
            return attributesList[row];
        else
            return "";
    }

    function getAttributeLength()  override view public virtual returns (uint)
    {
        return attributesList.length;
    }

    function getAttributeList()  override view virtual public returns (bytes32[] memory)
        {
            return attributesList;
        }

//    function getFullData(address) constant public returns (string,string,string,string,string,boolean);


}

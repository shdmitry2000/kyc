pragma solidity ^0.8.13;

import "@openzeppelin/contracts/ownership/Ownable.sol"

import "./IdentityUtils.sol";

abstract contract PermissionExtender is Ownable,IdentityUtils{

    mapping(string => mapping(uint8 => int)) permissions;


    //    //***
    //    //*** MODIFIERS
    //    //***
    //    //premissions modifier for bank functions
    /*
    modifier onlyPermited() {
        if ( msg.sender != getCustomerAddress() ) {
            revert();
        }
        _;
    }
    */

    //    function setAttribute(String attrName) constant private returns (int);
    //    function setAttributeValue(String attrName ,string attrVallue) constant private returns (boolean);
    function getAttributeValue(string memory attrName) view internal virtual returns (bytes32);
    //function getCustomerAddress() view public virtual returns (address);
    function getKYCIssuer()   view  public virtual returns (uint8);
    function getAttributeName(uint row) view virtual public  returns (bytes32);
    function getAttributeLength() view virtual public returns (uint);


    function getAttributeList() view virtual public returns (bytes32[] memory);

    function setAttributePermission(string memory  attributeName ,uint8 companion_id , int permission)   public returns (int)
    {

        //        require(msg.sender == owner || msg.sender==getCustomerAddress());



         //        require(PermissionExtender(permissionExtenderAddress).getCustomerAddress ==getConsumerAddress(id));


         if (stringcompare(attributeName,"*") == 0)
         {
/*
            bytes32[] memory attrlist=getAttributeList();
            for (uint account_ind=0; account_ind < attrlist.length; account_ind++) {
                        string memory attrname=bytes32ToString(attrlist[account_ind]);
                        permissions[attrname][companion_id]=permission;
            }

*/

            permissions["fullname"][companion_id]=permission;
            permissions["id"][companion_id]=permission;
            permissions["address"][companion_id]=permission;
            permissions["issued_country"][companion_id]=permission;
            permissions["sex"][companion_id]=permission;
            permissions["smoking"][companion_id]=permission;
            permissions["date_of_birth"][companion_id]=permission;

         }
         else
             permissions[attributeName][companion_id]=permission;

     }



    function isAttributePermited(string memory  attrName,uint8 companion_id) view public returns (int)
    {
  //      if (msg.sender == owner)
  //          return 1;
  //      else
            return (permissions[attrName][companion_id]);

    }



    function getAttribute(string memory attrName,uint8 companion_id) view public returns (bytes32 )
    {

        if (isAttributePermited(attrName, companion_id)!=0)
        {
            return getAttributeValue(attrName);
        }
            else
                return stringToBytes32("not permited");

    }

//    function getAttributeString(string attrName) constant public returns (string )
//    {
//        return bytes32ToString(getAttribute(attrName));
//    }
}

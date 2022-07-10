pragma solidity ^0.8.13;

import "./StringLibrary.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./KYCInt.sol";


contract KYCStorage is KYCInt ,Ownable {
   using StringLibrary for string;
   using StringLibrary for bytes32;

 //   constructor()  Ownable() {}

//struct KYCStorage {
            bytes32[]   attributesList;
            mapping(string => mapping(uint16 => uint8)) permissions;

            uint16 kycIssuer;
            mapping(string => bytes32)  public attributes;




 //       }



    function addAttributeStr(string memory  attributeName ,string memory  attribute_value ) public onlyOwner
    {
        attributesList.push(attributeName.stringToBytes32());
        attributes[attributeName] = attribute_value.stringToBytes32();

    }

    function addAttributeBool(string memory  attributeName ,bool  attribute_value ) public onlyOwner
    {

            attributesList.push(attributeName.stringToBytes32());
            if (attribute_value)
                attributes[attributeName]=string("YES").stringToBytes32();
            else
                attributes[attributeName]=string("NO").stringToBytes32();
     }






    function setAttributePermission(string memory  attributeName ,uint16 companion_id , uint8 permission)  public onlyOwner
        {


             if (attributeName.compare("*") )
             {

               // bytes32[] memory attrlist=attributesList;
                for (uint account_ind=0; account_ind < attributesList.length; account_ind++) {
                            string memory attrname=attributesList[account_ind].bytes32ToString();
                            permissions[attrname][companion_id]=permission;
                }


/*
                permissions["fullname"][companion_id]=permission;
                permissions["id"][companion_id]=permission;
                permissions["address"][companion_id]=permission;
                permissions["issued_country"][companion_id]=permission;
                permissions["sex"][companion_id]=permission;
                permissions["smoking"][companion_id]=permission;
                permissions["date_of_birth"][companion_id]=permission;
*/
             }
             else
                 permissions[attributeName][companion_id]=permission;

         }

         function setKYCIssuer(uint16 _kycIssuer ) public onlyOwner
         {
             kycIssuer=_kycIssuer;
         }

         function getKYCIssuer()   view  external  returns (uint16)
         {
             return kycIssuer;

         }






        function getAttributeName(uint row)    view external   returns (bytes32)
        {
            if (row<attributesList.length)
                return attributesList[row];
            else
                return "";
        }

        function getAttributeLength()   view external   returns (uint)
        {
            return attributesList.length;
        }

        function getAttributeList()   external view  returns (bytes32[] memory)
        {
            return attributesList;
        }



        function isAttributePermited(string memory  attrName,uint16 companion_id) view public  returns (uint8)
        {
                return (permissions[attrName][companion_id]);

        }


        function getAttribute(string memory attributeName, uint16 companion_id)  view public       returns (bytes32)
            {
                if (isAttributePermited(attributeName, companion_id)!=0)
                {
                           return attributes[attributeName];
                }
                else
                    return string("not permited").stringToBytes32();




            }
/*
function getAttributeValue(string memory attributeName,uint16 companion_id)  view public       returns (bytes32)
        {
            if (isAttributePermited(attributeName, companion_id)!=0)
                {
                           return attributes[attributeName];
                }
                else
                    return string("not permited").stringToBytes32();

        }
*/
}
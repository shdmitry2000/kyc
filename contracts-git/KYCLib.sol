pragma solidity ^0.8.13;

import "./StringLibrary.sol";


library KYCLib {
        using StringLibrary for string;

        struct KYCStorage {
            bytes32[]   attributesList;
            mapping(string => mapping(uint16 => uint8)) permissions;

            uint16 kycPerformer;
          mapping(string => bytes32)  attributes;
        }

/*
        function init(KYCStorage storage self, uint16 _kycPerformer,string memory fullname,string memory id,string memory issued_country,
                string memory laddress, string memory sex, string memory date_of_birth,  bool  isSmoking) public {
               self.kycPerformer=_kycPerformer;
               // customer=_customer;
                self.attributesList.push(string("fullname").stringToBytes32());
                self.attributes["fullname"]=fullname.stringToBytes32();
                self.attributesList.push(string("id").stringToBytes32());
                self.attributes["id"]=id.stringToBytes32();
                self.attributesList.push(string("issued_country").stringToBytes32());
                self.attributes["issued_country"]=issued_country.stringToBytes32();
                self.attributesList.push(string("address").stringToBytes32());
                self.attributes["address"]=laddress.stringToBytes32();

                self.attributesList.push(string("sex").stringToBytes32());
                self.attributes["sex"]=sex.stringToBytes32();

                self.attributesList.push(string("date_of_birth").stringToBytes32());
                self.attributes["date_of_birth"]=date_of_birth.stringToBytes32();

                self.attributesList.push(string("smoking").stringToBytes32());
                if(isSmoking)
                    self.attributes["smoking"]=string("YES").stringToBytes32();
                else
                    self.attributes["smoking"]=string("NO").stringToBytes32();

            }

*/

function init(KYCStorage storage self ,string memory id, uint16 _kycPerformer,string[] memory   attributesList, string[] memory attributesVal)   public
            {

            self.kycPerformer=_kycPerformer;


            for (uint i=0; i < attributesList.length; i++) {
                self.attributesList.push(attributesList[i].stringToBytes32());
                self.attributes[attributesList[i]]=attributesVal[i].stringToBytes32();
            }

            self.kycPerformer=_kycPerformer;

            self.attributesList.push(string("id").stringToBytes32());
            self.attributes["id"]=id.stringToBytes32();




            }


    function setAttributePermission(KYCStorage storage self,string memory  attributeName ,uint16 companion_id , uint8 permission)  public
        {


             if (attributeName.compare("*") )
             {
    /*
                bytes32[] memory attrlist=getAttributeList(self);
                for (uint account_ind=0; account_ind < attrlist.length; account_ind++) {
                            string memory attrname=bytes32ToString(attrlist[account_ind]);
                            self.permissions[attrname][companion_id]=permission;
                }

    */

                self.permissions["fullname"][companion_id]=permission;
                self.permissions["id"][companion_id]=permission;
                self.permissions["address"][companion_id]=permission;
                self.permissions["issued_country"][companion_id]=permission;
                self.permissions["sex"][companion_id]=permission;
                self.permissions["smoking"][companion_id]=permission;
                self.permissions["date_of_birth"][companion_id]=permission;

             }
             else
                 self.permissions[attributeName][companion_id]=permission;

         }





            function getKYCIssuer(KYCStorage storage self)  view   external  returns (uint16)
            {
                return self.kycPerformer;
            }

            function getAttributeName(KYCStorage storage self,uint row)    view external   returns (bytes32)
            {
                if (row<self.attributesList.length)
                    return self.attributesList[row];
                else
                    return "";
            }

            function getAttributeLength(KYCStorage storage self)   view external   returns (uint)
            {
                return self.attributesList.length;
            }

            function getAttributeList(KYCStorage storage self)   external view  returns (bytes32[] memory)
                {
                    return self.attributesList;
                }



            function isAttributePermited(KYCStorage storage self,string memory  attrName,uint16 companion_id) view public  returns (uint8)
            {
                    return (self.permissions[attrName][companion_id]);

            }



            function getAttribute(KYCStorage storage self,string memory attrName,uint16 companion_id) view public  returns (bytes32 )
            {

                if (isAttributePermited(self,attrName, companion_id)!=0)
                {
                    return self.attributes[attrName];
                }
                    else
                        return string("not permited").stringToBytes32();

            }

/*
            function getAttributeValue(KYCStorage storage self,string memory attrName,uint16 companion_id) view public  returns (bytes32 )
            {

                if (isAttributePermited(self,attrName, companion_id)!=0)
                {
                    return self.attributes[attrName];
                }
                    else
                        return string("not permited").stringToBytes32();

            }

*/

}

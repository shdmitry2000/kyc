pragma solidity ^0.8.13;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./KYCInt.sol";
import "./KYCStorage.sol";
import "./KYCLib.sol";

/*
library KYCAttribLib {

        mapping(string => bytes32)  attributes;
*/


contract KYC is KYCInt,Ownable {

    using KYCLib for address;
    address public KYCexternalStorage;

/*
    constructor(address _KYCStorageContract,
    uint64 _kycPerformer,string memory fullname,string memory id,string memory issued_country,
                   string memory laddress, string memory sex, string memory date_of_birth,  bool  isSmoking)   public    {

            if (_KYCStorageContract!=address(0))
                  KYCexternalStorage=_KYCStorageContract;
              else
                  KYCexternalStorage=address(new KYCStorage());

            KYCexternalStorage.init( _kycPerformer, fullname, id, issued_country,
                                  laddress,  sex,  date_of_birth,    isSmoking);
      }


*/

constructor(address _KYCStorageContract ,string memory id, uint64 _kycPerformer,string[] memory   attributesList, string[] memory attributesVal)   public
{

    require(attributesList.length==attributesVal.length , "Customer still not  exist !");

/**
    if (_KYCStorageContract!=address(0)){
          KYCexternalStorage=_KYCStorageContract;
          }
      else
*/
        {
         KYCStorage  kycstor=new KYCStorage();
          KYCexternalStorage=address(kycstor);
          KYCexternalStorage.init( id,_kycPerformer, attributesList,  attributesVal);
        }




  }




/*
    constructor(address _operatorContract,uint64 _kycPerformer,string memory fullname,string memory id,string memory issued_country,
                string memory laddress, string memory sex, string memory date_of_birth,  bool  isSmoking) public {
               operatorContract=_operatorContract;
        operatorContract=_operatorContract;
        KYCStorageContract(_KYCStorageContract).init( _kycPerformer, fullname, id, issued_country,
                                  laddress,  sex,  date_of_birth,    isSmoking);
    }

*/


/*
    function getAttributeValue(string memory attrName,uint64 companion_id)  view public     returns (bytes32)
    {
        KYCexternalStorage.getAttributeValue(attrName,companion_id);
    }
*/

    function getKYCIssuer()   view  external returns (uint64)
    {
        return KYCexternalStorage.getKYCIssuer();
    }

    function getAttributeName(uint row)    view external  virtual returns (bytes32)
    {
        return KYCexternalStorage.getAttributeName(row);
    }

    function getAttributeLength()   view external   returns (uint)
    {
        return KYCexternalStorage.getAttributeLength();
    }

    function getAttributeList()   external view  returns (bytes32[] memory)
    {
       return KYCexternalStorage.getAttributeList();
    }

    function setAttributePermission(string memory  attributeName ,uint64 companion_id , uint8 permission)  external  onlyOwner
    {

        return KYCexternalStorage.setAttributePermission(attributeName , companion_id ,  permission);

     }



    function isAttributePermited(string memory  attributeName,uint64 companion_id) view public   returns (uint8)
    {
            return KYCexternalStorage.isAttributePermited(attributeName , companion_id );

    }



    function getAttribute(string memory attributeName,uint64 companion_id) view  external returns (bytes32 )
    {

        return KYCexternalStorage.getAttribute(attributeName , companion_id );
    }



}

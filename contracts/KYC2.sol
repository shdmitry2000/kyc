pragma solidity ^0.8.13;

import "./KYCInt.sol";
import "./KYCLib2.sol";



contract KYC2 is KYCInt,Ownable {

     using KYCLib2 for address;
      address public KYCexternalStorage;




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



      function getKYCIssuer()  view   external  returns (uint64)
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



      function isAttributePermited(string memory  attributeName,uint64 companion_id) view public  returns (uint8)
      {
              return KYCexternalStorage.isAttributePermited(attributeName , companion_id );

      }



      function getAttribute(string memory attributeName,uint64 companion_id) view public  returns (bytes32 )
      {

          return KYCexternalStorage.getAttribute(attributeName , companion_id );
      }
  /*
      function getAttributeValue(string memory attributeName,uint64 companion_id) view public  returns (bytes32)
          {

              KYCexternalStorage.getAttributeValue(attributeName,companion_id);
          }
  */
  }

pragma solidity ^0.8.13;


// Open Zeppelin libraries for controlling upgradability and access.
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
//import "@openzeppelin/contracts/access/Ownable.sol";
import "./KYCInt.sol";
import "./KYCStorage.sol";
import "./KYCLib.sol";
import "./StorAddressUpgradeable.sol";

/*
library KYCAttribLib {

        mapping(string => bytes32)  attributes;
*/

contract KYC is KYCInt,  StorAddressUpgradeable //,OwnableUpgradeable,Initializable,
    {

    using KYCLib for address;
    //address public KYCexternalStorage;

/*
    constructor(address _KYCStorageContract,
    uint64 _kycPerformer,string memory fullname,string memory id,string memory issued_country,
                   string memory laddress, string memory sex, string memory date_of_birth,  bool  isSmoking)   public    {

            if (_KYCStorageContract!=address(0))
                  externalStorage=_KYCStorageContract;
              else

                  externalStorage=address(new KYCStorage());

            externalStorage.init( _kycPerformer, fullname, id, issued_country,
                                  laddress,  sex,  date_of_birth,    isSmoking);
      }


*/


constructor(address _KYCStorageContract ,string memory id, uint64 _kycPerformer,string[] memory   attributesList, string[] memory attributesVal)   public
{

    require(attributesList.length==attributesVal.length , "Customer still not  exist !");


    /*
    if (_KYCStorageContract!=address(0)){
          externalStorage=_KYCStorageContract;
          }
      else
        {
        */
         KYCStorage  kycstor=new KYCStorage();
          externalStorage=address(kycstor);
          externalStorage.init( id,_kycPerformer, attributesList,  attributesVal);
          /*
        }
        */
       // __Ownable_init();
  }


/*
function initialize(address _KYCStorageContract,
                 string memory id, uint64 _kycPerformer,string[] memory   attributesList, string[] memory attributesVal)
                    public initializer {
              require(attributesList.length==attributesVal.length , "Customer still not  exist !");


                  if (_KYCStorageContract!=address(0)){
                        externalStorage=_KYCStorageContract;
                        }
                    else
                      {
                       KYCStorage  kycstor=new KYCStorage();
                        externalStorage=address(kycstor);
                        externalStorage.init( id,_kycPerformer, attributesList,  attributesVal);
                      }


           //   __Ownable_init();
          }

*/

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
        externalStorage.getAttributeValue(attrName,companion_id);
    }
*/

    function getKYCIssuer()   view  external returns (uint64)
    {
        return externalStorage.getKYCIssuer();
    }

    function getAttributeName(uint row)    view external  virtual returns (bytes32)
    {
        return externalStorage.getAttributeName(row);
    }

    function getAttributeLength()   view external   returns (uint)
    {
        return externalStorage.getAttributeLength();
    }

    function getAttributeList()   external view  returns (bytes32[] memory)
    {
       return externalStorage.getAttributeList();
    }

    function setAttributePermission(string memory  attributeName ,uint64 companion_id , uint8 permission)  external  onlyOwner
    {

        return externalStorage.setAttributePermission(attributeName , companion_id ,  permission);

     }



    function isAttributePermited(string memory  attributeName,uint64 companion_id) view public   returns (uint8)
    {
            return externalStorage.isAttributePermited(attributeName , companion_id );

    }



    function getAttribute(string memory attributeName,uint64 companion_id) view  external returns (bytes32 )
    {

        return externalStorage.getAttribute(attributeName , companion_id );
    }



}

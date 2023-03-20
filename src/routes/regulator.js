import express from 'express';
import {
    getAccounts,
    getCompaniesList,
     getCompaniesData,
     submitCompany,
     submitCustomer,
     submitKYC,
     setConsumerAttributePermission ,
     getConsumerAttributePermission,
     getConsumerAttributeValue,
     finishConsentRequestwithattr,
 //    getConsumerOracleAttributeValue,
     getConsumerAttributeName,
     getConsumerAttributeList,
     createConsentRequest,
     finishConsentRequest,
     getConsumer ,
     getConsentRequests,
     getCurrentKYCissuer,
     getCompanyIdbyAddress,
     connectCompanyAddress,
     getConsumerPermissionList,
     sendSms,
    } from '../service/regulator';
import log from "../utils/logger";

const router = express.Router({ mergeParams: true });
const zero_address = "0x0000000000000000000000000000000000000000";
//
///api/organizations/
///api/organizations/:register_id
///api/organizations/new
///api/organizations/{company_id}/consent/request   //submit consent request
////request permissions for user kyc
///api/organizations/{register_id}/customers/{id}/{attribut}/permission
///api/organizations/{register_id}/customers/{id}/{attribut}/value
///api/organizations/{register_id}/customers/{id}/oracle/{attribut}/value
///api/organizations/{register_id}/customers/{id}/attribute/{row}/name
///api/organizations/{register_id}/customers/{id}/attribute/list
///api/organizations/{register_id}/customers/{id}/kyc

//-----------------------------

//
///api/customers/  ????????????
///api/customers/:id //get customer data
///api/customers/new  // create new customer
///api/customers/kyc/submit:  //submit KYC
///api/customers/{id}/organizations/{register_id}/attribute/{attr_name}/permission

//--------------------------

///api/customers/:id/kyc/update
///api/customers/{id}/consent/request   //submit concent request

///api/organizations/:register_id/customers/:id/kyc/request  ???




/**
 * @swagger
 * /api/accounts:
 *   get:
 *     tags:
 *       - utility
 *     summary:  list od addresses on chain.
 *     description: list od addresses on chain..
 *     responses:
 *       200:
 *         description: A list of addressses.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       address:
 *                         type: array
 *                         description: The array of addresses.
 */
router.get('/accounts', async (req, res, next) => {
  try {
   log.info('getAccounts');
    const data = await getAccounts();
//    const str = JSON.stringify(data, null, 2);
    res.json({
      data
    });
  } catch (err) {
    res.status(500);
    next(err);
  }
});


/**
 * @swagger
 * /api/organizations:
 *   get:
 *     tags:
 *       - Company
 *     summary:  return a list of company id's.
 *     description: return a list of company id's.
 *     responses:
 *       200:
 *         description: A list of addressses.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       address:
 *                         type: array
 *                         description: The array of addresses.
 */
router.get('/organizations', async (req, res, next) => {
  try {
    const data = await getCompaniesList();
//    const str = JSON.stringify(data, null, 2);
    res.json({
      data
    });
  } catch (err) {
    res.status(500);
    next(err);
  }
});



/**
* @openapi
* /api/organizations/{register_id}:
*  get:
*    tags:
*      - Company
*    summary:  return a  company data for existing id.
*    description: return a  company data for existing id.
*    parameters:
*      - name: register_id
*        in: path
*        description: get the data of company
*        required: true
*        schema:
*          type: string
*    responses:
*      200:
*         description: Success
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 company_name:
*                    type: string
*                    description: company name
*                 company_address:
*                    type: string
*                    description: company local address
*                 register_id:
*                    type: integer
*                    description: company register i
*/
    router.get('/organizations/:register_id', async (req, res, next) => {
  try {
    log.info("register_id")
    let register_id = req.params.register_id;
    log.info(register_id)
    const data = await getCompaniesData(register_id);
//    const str = JSON.stringify(data, null, 2);
    log.info(data)
//    res.json({
//           data
//        });
    res.json({
      company_name : data[0],
      company_address:data[1],
      register_id:data[2],
    });
  } catch (err) {
    res.status(500);
    next(err);
  }
});



/**
* @openapi
* /api/sendSMS:
*  post:
*     tags:
*       - utility
*     summary:  send sms.
*     description: send sms.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
    *              phone_number:
    *                type: string
    *                description: the address   of company on chain
    *              sms_body:
    *                type: string
    *                description: the address   of company on chain
*     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     sms_delivery:
 *                       type: string
 *                       description: sms delivery status.
 *                       example: 0
*/



    router.post('/sendSMS', async (req, res, next) => {
  try {
    log.info("phone_number")
    let phone_number = req.body.phone_number;
    let msg=req.body.sms_body;
    log.info(phone_number);
    log.info(msg)
    const data = await sendSms(phone_number,msg);
//    const str = JSON.stringify(data, null, 2);
    log.info(data)
//    res.json({
//           data
//        });
    res.json({
      sms_delivery : data,
    });
  } catch (err) {
    res.status(500);
    next(err);
  }
});


/**
* @openapi
* /api/organizations/{address}/id:
*  get:
*    tags:
*      - Company
*    summary:  return a  company data for existing id.
*    description: return a  company id  for existing address .
*    parameters:
*      - name: address
*        in: path
*        description: get the data of company
*        required: true
*        schema:
*          type: string
*    responses:
*      200:
*         description: Success
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 company_id:
*                    type: string
*                    description: company id
*/
    router.get('/organizations/:address/id', async (req, res, next) => {
  try {
    log.info("register_id")
    let address = req.params.address;
    log.info(address)
    const data = await getCompanyIdbyAddress(address);
//    const str = JSON.stringify(data, null, 2);
    log.info(data)
    res.json({
           data
        });
//    res.json({
//      company_name : data[0],
//      company_address:data[1],
//      register_id:data[2],
//    });
  } catch (err) {
    res.status(500);
    next(err);
  }
});



/**
* @openapi
* /api/organizations/new:
*  post:
*     tags:
*       - admin
*     summary:  add new organisation (bank) to a system.
*     description: add new organisation (bank) to a system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
    *              address:
    *                type: string
    *                description: get the daaddress on chain  of company
    *              company_name:
    *                type: string
    *                description: company name
    *              company_address:
    *                type: string
    *                description: company presence address
    *              register_id:
    *                type: integer
    *                description: company register id
*     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: The user ID.
 *                       example: 0
 *                     name:
 *                       type: string
 *                       description: The user's name.
 *                       example: Leanne Graham
*/


router.post('/organizations/new', async (req, res, next) => {
  try {
//  const token = req.param('token');
    log.info("submitcompany begin")
    let address = req.body.address;
    let company_name = req.body.company_name;
    let company_address = req.body.company_address;
    let register_id=req.body.register_id
    log.info(req.body)
    log.info(address)
    log.info(company_name)
    log.info(company_address)
    log.info(register_id)
    const data = await submitCompany(address,company_name,company_address,register_id);

    res.json({
      success: true,
      message: 'submitcompany is confirmed',
      data
    });
  } catch (err) {
    res.status(500);
    next(err);
  }
});



/**
* @openapi
* /api/customers/{id}:
*  get:
*     tags:
*       - Customer
*     summary:  get customer data >  registred + hasKYC.
*     description: get customer data>  registred + hasKYC..
*     parameters:
*       - name: id
*         in: path
*         description: customer id
*         required: true
*         schema:
*           type: string
*     responses:
 *       200:
 *         description: A list of addressses.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       address:
 *                         type: array
 *                         description: The array of addresses.
*/

router.get('/customers/:id', async (req, res, next) => {
  try {
//  const token = req.param('token');
    log.info("getcustomer begin")
    let id = req.params.id;
    log.info(id)
//    let account_address = req.body.account_address;
    const data = await getConsumer(id);


    res.json({
      registered : data[1],
      verified:data[2],
      hasKYC:(  zero_address.localeCompare(data[3]) !=0 ),
      require_update:data[4],
    });
  } catch (err) {
    res.status(500);
    next(err);
  }
});


/**
* @openapi
* /api/customers/{id}/kyc_issuer:
*  get:
*     tags:
*       - Customer
*     summary:  get customer kyc issuer.
*     description: get customer kyc issuer.
*     parameters:
*       - name: id
*         in: path
*         description: customer id
*         required: true
*         schema:
*           type: string
*     responses:
 *       200:
 *         description: A list of addressses.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       address:
 *                         type: array
 *                         description: The array of addresses.
*/

router.get('/customers/:id/kyc_issuer', async (req, res, next) => {
  try {
//  const token = req.param('token');
    log.info("getKYCcustomer begin")
    let id = req.params.id;
    log.info(id)
//    let account_address = req.body.account_address;
    const data = await getCurrentKYCissuer(id);


    res.json({
      data
    });
  } catch (err) {
    res.status(500);
    next(err);
  }
});

/**
* @openapi
* /api/customers/new:
*  post:
*     tags:
*       - Company
*     summary:  add new customer(register customer).
*     description: add new customer(register customer).
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
    *              id:
    *                type: string
    *                description: get the id  of customer
*     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: The user ID.
 *                       example: 0
 *                     name:
 *                       type: string
 *                       description: The user's name.
 *                       example: Leanne Graham
*/


router.post('/customers/new', async (req, res, next) => {
  try {
//  const token = req.param('token');
    log.info("customers/new begin")
    let id = req.body.id;
    let account_address=zero_address;
//    let account_address = req.body.account_address;
    log.info(id)
    log.info(account_address)
    const data = await submitCustomer(account_address,id);

    res.json({
          success: true,
          message: 'submit customers is confirmed' ,
          data
        });
  } catch (err) {
    res.status(500);
    next(err);
  }
});



/**
* @openapi
* /api/organizations/{register_id}/connectbyaddress:
*  post:
*     tags:
*       - Company
*     summary:  connect company address to id.
*     description: connect company address to id.
*     parameters:
*      - name: register_id
*        in: path
*        description: company register id
*        required: true
*        schema:
*          type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
    *              address:
    *                type: string
    *                description: the address   of company on chain
*     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: The user ID.
 *                       example: 0
 *                     name:
 *                       type: string
 *                       description: The user's name.
 *                       example: Leanne Graham
*/


router.post('/organizations/:register_id/connectbyaddress', async (req, res, next) => {
  try {
//  const token = req.param('token');
    log.info("connectCompanyAddress begin")
    let company_registry_id=req.params.register_id;
    let account_address=req.body.address;
//    let account_address = req.body.account_address;
    log.info(id)
    log.info(account_address)
    const data = await connectCompanyAddress(account_address,company_registry_id);

    res.json({
          success: true,
          message: 'submit customers is confirmed' ,
          data
        });
  } catch (err) {
    res.status(500);
    next(err);
  }
});



/**
* @openapi
* /api/customers/kyc/submit:
*  post:
*     tags:
*       - Company
*     summary:  submit KYC data for customer.
*     description: submit KYC data for customer.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
    *              id:
    *                type: string
    *                description: customer identification number
    *              issued_country:
    *                type: string
    *                description: cbank_account
    *              fullname:
    *                type: string
    *                description: fullname
    *              address:
    *                type: string
    *                description: address
    *              date_of_birth:
    *                type: string
    *                description: creadit_card_number
    *              smoking:
    *                type: string
    *                description: smoking
   *              sex:
    *                type: string
    *                description: sex
   *              active_account:
    *                type: string
    *                description: smoking
    *              account_open_date:
     *                type: string
     *                description: smoking
    *              kyc_issuer_registry_id:
    *                type: integer
    *                description: the registry id of kyc issuer
    *              phone:
     *                type: string
     *                description: phone number
*     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: The customer id.
 *                       example: 0
 *                     name:
 *                       type: string
 *                       description: The user's name.
 *                       example: Leanne Graham
*/

router.post('/customers/kyc/submit', async (req, res, next) => {
  try {
//  const token = req.param('token');
    log.info("submitKYC begin")
//    let on_chain_address=req.body.on_chain_address;
    let id = req.body.id;
    let fullname= req.body.fullname;
    let issued_country =req.body.issued_country;
    let date_of_birth=req.body.date_of_birth;
    let sex=req.body.sex;
    let active_account=req.body.active_account;
    let account_open_date=req.body.account_open_date;
    let smoking=req.body.smoking;
    let kyc_issuer_registry_id=req.body.kyc_issuer_registry_id;
    let phone=req.body.phone;
    let laddress= req.body.address;





    const data = await submitKYC(fullname,id,issued_country, laddress, sex,
                                        date_of_birth,smoking,active_account,account_open_date,phone,kyc_issuer_registry_id);

    res.json({
      success: true,
      message: 'submitKYC is confirmed',
      data
    });
  } catch (err) {
    res.status(500);
    next(err);
  }
});

/**
* @openapi
* /api/organizations/{register_id}/consentrequest/new:
*  post:
*     tags:
*       - Company
*     summary:  request consent from customer.used via KYC issuer.
*     description: request consent from customer.used via KYC issuer.
*     parameters:
*      - name: register_id
*        in: path
*        description: company register id
*        required: true
*        schema:
*          type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
    *              id:
    *                type: string
    *                description: customer id
    *              kyc_issuer_registry_id:
    *                type: string
    *                description: kyc issuer registry id
*     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: The customer id.
 *                       example: 0
 *                     name:
 *                       type: string
 *                       description: The user's name.
 *                       example: Leanne Graham
*/


router.post('/organizations/:register_id/consentrequest/new', async (req, res, next) => {

  try {
//  const token = req.param('token');
    log.info("createConsentRequest begin")
     let id = req.body.id;
     let company_registry_id=req.params.register_id;
     let kyc_issuer_registry_id=req.body.kyc_issuer_registry_id;
     log.info(id)
     log.info(company_registry_id)

     const data = await createConsentRequest(id,company_registry_id,kyc_issuer_registry_id);

     res.json({
       success: true,
       message: 'submitKYC is confirmed',
       data
     });
   } catch (err) {
     res.status(500);
     next(err);
   }
 });

/**
* @openapi
* /api/organizations/{register_id}/consentrequest/close:
*  post:
*     tags:
*       - Company
*     summary:  close request consent from customer by report of finish the operation .performed by   KYC issuer.
*     description: close request consent from customer  by report of finish the operation .performed by   KYC issuer.
*     parameters:
*      - name: register_id
*        in: path
*        description: company register id
*        required: true
*        schema:
*          type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
    *              id:
    *                type: string
    *                description: customer id
    *              kyc_issuer_registry_id:
    *                type: string
    *                description: kyc issuer registry id
*     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: The customer id.
 *                       example: 0
 *                     name:
 *                       type: string
 *                       description: The user's name.
 *                       example: Leanne Graham
*/


router.post('/organizations/:register_id/consentrequest/close', async (req, res, next) => {

  try {
//  const token = req.param('token');
    log.info("finishConsentRequest begin")
     let id = req.body.id;
     let company_registry_id=req.params.register_id;
     let kyc_issuer_registry_id=req.body.kyc_issuer_registry_id;
     log.info(id)
     log.info(company_registry_id)

     const data = await finishConsentRequest(id,company_registry_id,kyc_issuer_registry_id,true);

     res.json({
       success: true,
       message: 'finish ConsentRequest is confirmed',
       data
     });
   } catch (err) {
     res.status(500);
     next(err);
   }
 });


/**
* @openapi
* /api/organizations/{register_id}/consentrequest/closewithattr:
*  post:
*     tags:
*       - Company
*     summary:  close request consent from customer by report of finish the operation .performed by   KYC issuer.
*     description: close request consent from customer  by report of finish the operation .performed by   KYC issuer.
*     parameters:
*      - name: register_id
*        in: path
*        description: company register id
*        required: true
*        schema:
*          type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
    *              id:
    *                type: string
    *                description: customer id
    *              kyc_issuer_registry_id:
    *                type: string
    *                description: kyc issuer registry id
    *              attributes:
    *                type: array
    *                items:
    *                  type: string
    *                description: array of attributes
*     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: The customer id.
 *                       example: 0
 *                     name:
 *                       type: string
 *                       description: The user's name.
 *                       example: Leanne Graham
*/


router.post('/organizations/:register_id/consentrequest/closewithattr', async (req, res, next) => {

  try {
//  const token = req.param('token');
    log.info("finishConsentRequest begin")
     let id = req.body.id;
     let company_registry_id=req.params.register_id;
     let kyc_issuer_registry_id=req.body.kyc_issuer_registry_id;
     let attributes=req.body.attributes;
     log.info(attributes);
     log.info(id);

     log.info(company_registry_id)

     const data = await finishConsentRequestwithattr(id,company_registry_id,kyc_issuer_registry_id,true,attributes);

     res.json({
       success: true,
       message: 'finish ConsentRequest is confirmed',
       data
     });
   } catch (err) {
     res.status(500);
     next(err);
   }
 });


/**
* @openapi
* /api/customers/consentrequest/list:
*  get:
*    tags:
*      - Company
*    summary:  list of  request consents  .include preformed flag and performance date.
*    description: list of  request consents  .include preformed flag and performance date.
*    parameters:
*     - name: user_id
*       in: query
*       description: user id
*       schema:
*         type: integer
*     - name: issuer_register_id
*       in: query
*       description: issuer register id
*       schema:
*         type: integer
*     - name:  requester_register_id
*       in: query
*       description: requester register id
*       schema:
*         type: integer
*    responses:
*      200:
*         description: Success
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 company_name:
*                    type: string
*                    description: company name
*                 company_address:
*                    type: string
*                    description: company local address
*/
   router.get('/customers/consentrequest/list', async (req, res, next) => {
  try {
    log.info("consentrequest")
    if (req.query.user_id !== undefined)   var user_id = req.query.user_id;
            else var user_id;
    if (req.query.issuer_register_id !== undefined)   var issuer_register_id = req.query.issuer_register_id;
          else var issuer_register_id;
    if (req.query.requester_register_id !== undefined)   var requester_register_id = req.query.requester_register_id;
          else var requester_register_id;
//    log.info(attributeName)
    const data = await getConsentRequests(user_id,issuer_register_id,requester_register_id);
//    const str = JSON.stringify(data, null, 2);
    log.info(data)
    res.json({
       data,
    });
  } catch (err) {
    res.status(500);
    next(err);
  }
});



/**
* @openapi
* /api/organizations/{register_id}/customers/{id}/{attributeName}/permission:
*  get:
*    tags:
*      - Company
*    summary:  get permission for company by attribute.performs  on company id+ customer id  .
*    description: get permission for company by attribute.performs  on company id+ customer id  .
*    parameters:
*      - name: register_id
*        in: path
*        description: company register id
*        required: true
*        schema:
*          type: integer
*      - name: id
*        in: path
*        description: customer id
*        required: true
*        schema:
*          type: string
*      - name: attributeName
*        in: path
*        description: attribut name
*        required: true
*        schema:
*          type: string
*    responses:
*      200:
*         description: Success
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 company_name:
*                    type: string
*                    description: company name
*                 company_address:
*                    type: string
*                    description: company local address
*/
   router.get('/organizations/:register_id/customers/:id/:attributeName/permission', async (req, res, next) => {
  try {
    log.info("register_id")
    let register_id = req.params.register_id;
    let id = req.params.id;
    let attributeName = req.params.attributeName;
    log.info(register_id)
    log.info(id)
    log.info(attributeName)
    const data = await getConsumerAttributePermission(id,register_id, attributeName);
//    const str = JSON.stringify(data, null, 2);
    log.info(data)
    res.json({
       data,
    });
  } catch (err) {
    res.status(500);
    next(err);
  }
});


/**
* @openapi
* /api/organizations/{register_id}/customers/{id}/{attribut}/value:
*  get:
*    tags:
*      - Company
*    summary:  get attribute value for company by attribute name.performs  on company id+ customer id  .
*    description: get attribute value for company by attribute name.performs  on company id+ customer id .
*    parameters:
*      - name: register_id
*        in: path
*        description: company register id
*        required: true
*        schema:
*          type: string
*      - name: id
*        in: path
*        description: customer id
*        required: true
*        schema:
*          type: string
*      - name: attribut
*        in: path
*        description: attribut name
*        required: true
*        schema:
*          type: string
*    responses:
*      200:
*         description: Success
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 company_name:
*                    type: string
*                    description: company name
*                 company_address:
*                    type: string
*                    description: company local address
*/
   router.get('/organizations/:register_id/customers/:id/:attributeName/value', async (req, res, next) => {
  try {
    log.info("register_id")
    let register_id = req.params.register_id;
    let id = req.params.id;
    let attributeName = req.params.attributeName;
    log.info(register_id)
    const data = await getConsumerAttributeValue(id,register_id, attributeName);
//    const str = JSON.stringify(data, null, 2);
    log.info(data)
    res.json({
       data,
    });
  } catch (err) {
    res.status(500);
    next(err);
  }
});



/**
* @openapi
* /api/organizations/{register_id}/customers/{id}/attribute/{attributeRow}/name:
*  get:
*    tags:
*      - Company
*    summary:  get attribute name by attribut place for company and customer id.  .
*    description:  get attribute name by attribut place for company and customer id.  .
*    parameters:
*      - name: register_id
*        in: path
*        description: company register id
*        required: true
*        schema:
*          type: string
*      - name: id
*        in: path
*        description: customer id
*        required: true
*        schema:
*          type: string
*      - name: attributeRow
*        in: path
*        description: number of attribut row
*        required: true
*        schema:
*          type: integer
*    responses:
*      200:
*         description: Success
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 company_name:
*                    type: string
*                    description: company name
*                 company_address:
*                    type: string
*                    description: company local address
*/
   router.get('/organizations/:register_id/customers/:id/attribute/:attributeRow/name', async (req, res, next) => {
  try {
    log.info("register_id")
    let register_id = req.params.register_id;
    let id = req.params.id;
    let attributeRow = req.params.attributeRow;
    log.info(register_id)
    const data = await getConsumerAttributeName(id,register_id, attributeRow);
//    const str = JSON.stringify(data, null, 2);
    log.info(data)
    res.json({
       data,
    });
  } catch (err) {
    res.status(500);
    next(err);
  }
});



/**
* @openapi
* /api/organizations/{register_id}/customers/{id}/attribute/list:
*  get:
*    tags:
*      - Company
*    summary:  get attribute list  for company and customer id.  .
*    description:  get attribute list  for company and customer id. .
*    parameters:
*      - name: id
*        in: path
*        description: customer id
*        required: true
*        schema:
*          type: string
*      - name: register_id
*        in: path
*        description: company register id
*        required: true
*        schema:
*          type: string
*    responses:
*      200:
*         description: Success
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 company_name:
*                    type: string
*                    description: company name
*                 company_address:
*                    type: string
*                    description: company local address
*/
   router.get('/organizations/:register_id/customers/:id/attribute/list', async (req, res, next) => {
  try {
    log.info("register_id")
    let register_id = req.params.register_id;
    let id = req.params.id;
    log.info(register_id)
    const data = await getConsumerAttributeList(id,register_id);
//    const str = JSON.stringify(data, null, 2);
    log.info(data)
    res.json({
       data,
    });
  } catch (err) {
    res.status(500);
    next(err);
  }
});


/**
* @openapi
* /api/organizations/{register_id}/customers/{id}/attribute/permissionlist:
*  get:
*    tags:
*      - Company
*    summary:  get all attributes  for company and customer id.  .
*    description:  get all attributes  for company and customer id.  .
*    parameters:
*      - name: id
*        in: path
*        description: customer id
*        required: true
*        schema:
*          type: string
*      - name: register_id
*        in: path
*        description: company register id
*        required: true
*        schema:
*          type: string
*    responses:
*      200:
*         description: Success
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 company_name:
*                    type: string
*                    description: company name
*                 company_address:
*                    type: string
*                    description: company local address
*/
   router.get('/organizations/:register_id/customers/:id/attribute/permissionlist', async (req, res, next) => {
  try {
  log.info("get all list of attributes")
    log.info("register_id")
    let register_id = req.params.register_id;
    let id = req.params.id;
    log.info(register_id)
    const data = await getConsumerPermissionList(id,register_id);
//    const str = JSON.stringify(data, null, 2);
    log.info(data)
    res.json({
       data,
    });
  } catch (err) {
    res.status(500);
    next(err);
  }
});


/**
* @openapi
* /api/customers/{id}/organizations/{company_id}/permission:
*  post:
*     tags:
*       - Customer
*     summary:  set permission for company by attribute.performs  on company id+ customer id  .
*     description:  set permission for company by attribute.performs  on company id+ customer id  .
*     parameters:
*      - name: id
*        in: path
*        description: id of customer
*        required: true
*        schema:
*          type: string
*      - name: company_id
*        in: path
*        description: company register id
*        required: true
*        schema:
*          type: string

 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
    *              attributeName:
    *                type: string
    *                description: attribute Name
    *              attributepermission:
    *                type: string
    *                description: attribute permission 0,1
*     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: The customer id.
 *                       example: 0
 *                     name:
 *                       type: string
 *                       description: The user's name.
 *                       example: Leanne Graham
*/

router.post('/customers/:id/organizations/:company_id/permission', async (req, res, next) => {
  try {
//  const token = req.param('token');
    log.info("permission begin")
    let company_registry_id = req.params.company_id;
    let id = req.params.id;
    let attributeName = req.body.attributeName;
    let attributepermission = req.body.attributepermission;
    log.info(company_registry_id)
    log.info(id)
    log.info(attributeName)
    log.info(attributepermission)
    const data = await setConsumerAttributePermission(id,company_registry_id, attributeName,attributepermission);
    res.json({
      success: true,
      message: 'set permission is confirmed',
      data
    });
  } catch (err) {
    res.status(500);
    next(err);
  }
});


export default router;
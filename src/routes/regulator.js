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
     getConsumerAttributeName,
     getConsumerAttributeList,
     createConsentRequest,
     finishConsentRequest,
     getConsumer ,
     getConsentRequests,
     getCurrentKYCPerformer,
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
///api/organizations/{register_id}/customers/{tz}/{attribut}/permission
///api/organizations/{register_id}/customers/{tz}/{attribut}/value
///api/organizations/{register_id}/customers/{tz}/attribute/{row}/name
///api/organizations/{register_id}/customers/{tz}/attribute/list
///api/organizations/{register_id}/customers/{tz}/kyc

//-----------------------------

//
///api/customers/  ????????????
///api/customers/:tz //get customer data
///api/customers/new  // create new customer
///api/customers/kyc/submit:  //submit KYC
///api/customers/{tz}/organizations/{register_id}/attribute/{attr_name}/permission

//--------------------------

///api/customers/:tz/kyc/update
///api/customers/{tz}/consent/request   //submit concent request

///api/organizations/:register_id/customers/:tz/kyc/request  ???


/**
 * @swagger
 * /api/accounts:
 *   get:
 *     tags:
 *       - utility
 *     summary:  return a list of companies.
 *     description: return a list of companies.
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
 *     summary:  return a list of companies.
 *     description: return a list of companies.
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
*                    type: string
*                    description: company register id

*/
    router.get('/organizations/:register_id', async (req, res, next) => {
  try {
    log.info("register_id")
    let register_id = req.params.register_id;
    log.info(register_id)
    const data = await getCompaniesData(register_id);
//    const str = JSON.stringify(data, null, 2);
    log.info(data)
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
* /api/organizations/new:
*  post:
*     tags:
*       - admin
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
    *                type: string
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
* /api/customers/{tz}:
*  get:
*     tags:
*       - Customer
*     parameters:
*       - name: tz
*         in: path
*         description: get the data of company
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

router.get('/customers/:tz', async (req, res, next) => {
  try {
//  const token = req.param('token');
    log.info("submitcustomer begin")
    let tz = req.params.tz;
    log.info(tz)
//    let account_address = req.body.account_address;
    const data = await getConsumer(tz);


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
* /api/customers/{tz}/kyc_manager:
*  get:
*     tags:
*       - Customer
*     parameters:
*       - name: tz
*         in: path
*         description: get the data of company
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

router.get('/customers/:tz/kyc_manager', async (req, res, next) => {
  try {
//  const token = req.param('token');
    log.info("submitcustomer begin")
    let tz = req.params.tz;
    log.info(tz)
//    let account_address = req.body.account_address;
    const data = await getCurrentKYCPerformer(tz);


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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
    *              tz:
    *                type: string
    *                description: get the tz  of customer
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
    let tz = req.body.tz;
    let account_address=zero_address;
//    let account_address = req.body.account_address;
    log.info(tz)
    log.info(account_address)
    const data = await submitCustomer(account_address,tz);

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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
    *              tz:
    *                type: string
    *                description: tz
    *              fullname:
    *                type: string
    *                description: fullname
    *              address:
    *                type: string
    *                description: address
    *              bank_account:
    *                type: string
    *                description: cbank_account
    *              creadit_card_number:
    *                type: string
    *                description: creadit_card_number
    *              smoking:
    *                type: string
    *                description: smoking
    *              isAlergic:
    *                type: boolean
    *                description: isAlergic
    *              kyc_manager_registry_id:
    *                type: integer
    *                description: company_registry_id
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

router.post('/customers/kyc/submit', async (req, res, next) => {
  try {
//  const token = req.param('token');
    log.info("submitKYC begin")
//    let on_chain_address=req.body.on_chain_address;
    let tz = req.body.tz;
    let fullname= req.body.fullname;
    let kyc_manager_registry_id=req.body.kyc_manager_registry_id;

    let address= req.body.address;
    let bank_account=req.body.bank_account;
    let creadit_card_number=req.body.creadit_card_number;
    let smoking=req.body.smoking;
    let isAlergic=req.body.isAlergic;

    const data = await submitKYC(tz,fullname,address,bank_account,creadit_card_number,smoking,isAlergic,kyc_manager_registry_id);

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
    *              tz:
    *                type: string
    *                description: tz
    *              kyc_manager_registry_id:
    *                type: string
    *                description: tz
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


router.post('/organizations/:register_id/consentrequest/new', async (req, res, next) => {

  try {
//  const token = req.param('token');
    log.info("createConsentRequest begin")
     let tz = req.body.tz;
     let company_registry_id=req.params.register_id;
     let kyc_manager_registry_id=req.body.kyc_manager_registry_id;
     log.info(tz)
     log.info(company_registry_id)

     const data = await createConsentRequest(tz,company_registry_id,kyc_manager_registry_id);

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
    *              tz:
    *                type: string
    *                description: tz
    *              kyc_manager_registry_id:
    *                type: string
    *                description: tz
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


router.post('/organizations/:register_id/consentrequest/close', async (req, res, next) => {

  try {
//  const token = req.param('token');
    log.info("finishConsentRequest begin")
     let tz = req.body.tz;
     let company_registry_id=req.params.register_id;
     let kyc_manager_registry_id=req.body.kyc_manager_registry_id;
     log.info(tz)
     log.info(company_registry_id)

     const data = await finishConsentRequest(tz,company_registry_id,kyc_manager_registry_id,true);

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



///**
//* @openapi
//* /api/customers/consentrequest/new:
//*  post:
//*     tags:
//*       - Company
// *     requestBody:
// *       required: true
// *       content:
// *         application/json:
// *           schema:
// *             type: object
// *             properties:
//    *              tz:
//    *                type: string
//    *                description: tz
//    *              company_registry_id:
//    *                type: string
//    *                description: company register id
//    *              kyc_manager_registry_id:
//    *                type: string
//    *                description: company register id
//*     responses:
// *       201:
// *         description: Created
// *         content:
// *           application/json:
// *             schema:
// *               type: object
// *               properties:
// *                 data:
// *                   type: object
// *                   properties:
// *                     id:
// *                       type: integer
// *                       description: The user ID.
// *                       example: 0
// *                     name:
// *                       type: string
// *                       description: The user's name.
// *                       example: Leanne Graham
//*/
//
//router.post('/customers/consentrequest/new', async (req, res, next) => {
//  try {
////  const token = req.param('token');
//    log.info("createConsentRequest begin")
//    let tz = req.body.tz;
//    let company_registry_id=req.body.company_registry_id;
//    let kyc_manager_registry_id=req.body.kyc_manager_registry_id;
//    log.info(tz)
//    log.info(company_registry_id)
//
//    const data = await createConsentRequest(tz,company_registry_id,kyc_manager_registry_id);
//
//    res.json({
//      success: true,
//      message: 'submitKYC is confirmed',
//      data
//    });
//  } catch (err) {
//    res.status(500);
//    next(err);
//  }
//});


/**
* @openapi
* /api/customers/consentrequest/list:
*  get:
*    tags:
*      - Company
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
    log.info("register_id")
//    log.info(attributeName)
    const data = await getConsentRequests();
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
* /api/organizations/{register_id}/customers/{tz}/{attributeName}/permission:
*  get:
*    tags:
*      - Company
*    parameters:
*      - name: register_id
*        in: path
*        description: company register id
*        required: true
*        schema:
*          type: integer
*      - name: tz
*        in: path
*        description: get the data of company
*        required: true
*        schema:
*          type: string
*      - name: attributeName
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
*/
   router.get('/organizations/:register_id/customers/:tz/:attributeName/permission', async (req, res, next) => {
  try {
    log.info("register_id")
    let register_id = req.params.register_id;
    let tz = req.params.tz;
    let attributeName = req.params.attributeName;
    log.info(register_id)
    log.info(tz)
    log.info(attributeName)
    const data = await getConsumerAttributePermission(tz,register_id, attributeName);
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
* /api/organizations/{register_id}/customers/{tz}/{attribut}/value:
*  get:
*    tags:
*      - Company
*    parameters:
*      - name: register_id
*        in: path
*        description: company register id
*        required: true
*        schema:
*          type: string
*      - name: tz
*        in: path
*        description: get the data of company
*        required: true
*        schema:
*          type: string
*      - name: attribut
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
*/
   router.get('/organizations/:register_id/customers/:tz/:attributeName/value', async (req, res, next) => {
  try {
    log.info("register_id")
    let register_id = req.params.register_id;
    let tz = req.params.tz;
    let attributeName = req.params.attributeName;
    log.info(register_id)
    const data = await getConsumerAttributeValue(tz,register_id, attributeName);
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
* /api/organizations/{register_id}/customers/{tz}/attribute/{attributeRow}/name:
*  get:
*    tags:
*      - Company
*    parameters:
*      - name: register_id
*        in: path
*        description: company register id
*        required: true
*        schema:
*          type: string
*      - name: tz
*        in: path
*        description: get the data of company
*        required: true
*        schema:
*          type: string
*      - name: attributeRow
*        in: path
*        description: get the data of company
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
   router.get('/organizations/:register_id/customers/:tz/attribute/:attributeRow/name', async (req, res, next) => {
  try {
    log.info("register_id")
    let register_id = req.params.register_id;
    let tz = req.params.tz;
    let attributeRow = req.params.attributeRow;
    log.info(register_id)
    const data = await getConsumerAttributeName(tz,register_id, attributeRow);
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
* /api/organizations/{register_id}/customers/{tz}/attribute/list:
*  get:
*    tags:
*      - Company
*    parameters:
*      - name: tz
*        in: path
*        description: get the data of company
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
   router.get('/organizations/:register_id/customers/:tz/attribute/list', async (req, res, next) => {
  try {
    log.info("register_id")
    let register_id = req.params.register_id;
    let tz = req.params.tz;
    log.info(register_id)
    const data = await getConsumerAttributeList(tz,register_id);
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

///**
//* @openapi
//* /api////api/organizations/{register_id}/customers/{tz}/kyc:
//*  get:
//*    tags:
//*      - Company
//*    parameters:
//*      - name: register_id
//*        in: path
//*        description: company register id
//*        required: true
//*        schema:
//*          type: string
//*      - name: tz
//*        in: path
//*        description: get the data of company
//*        required: true
//*        schema:
//*          type: string
//*    responses:
//*      200:
//*         description: Success
//*         content:
//*           application/json:
//*             schema:
//*               type: object
//*               properties:
//*                 company_name:
//*                    type: string
//*                    description: company name
//*                 company_address:
//*                    type: string
//*                    description: company local address
//*/
//   router.get('/organizations/:register_id/customers/:tz/kyc', async (req, res, next) => {
//  try {
//    log.info("register_id")
//    let register_id = req.params.register_id;
//    let tz = req.params.tz;
//    log.info(register_id)
//    data='not implemented yet';
//    res.json({
//           data,
//     });
//  } catch (err) {
//    res.status(500);
//    next(err);
//  }
//});

/**
* @openapi
* /api/customers/{tz}/organizations/{company_id}/permission:
*  post:
*     tags:
*       - Customer
*     parameters:
*      - name: tz
*        in: path
*        description: tz of customer
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
 *                       description: The user ID.
 *                       example: 0
 *                     name:
 *                       type: string
 *                       description: The user's name.
 *                       example: Leanne Graham
*/

router.post('/customers/:tz/organizations/:company_id/permission', async (req, res, next) => {
  try {
//  const token = req.param('token');
    log.info("permission begin")
    let company_registry_id = req.params.company_id;
    let tz = req.params.tz;
    let attributeName = req.body.attributeName;
    let attributepermission = req.body.attributepermission;
    log.info(company_registry_id)
    log.info(tz)
    log.info(attributeName)
    log.info(attributepermission)
    const data = await setConsumerAttributePermission(tz,company_registry_id, attributeName,attributepermission);
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
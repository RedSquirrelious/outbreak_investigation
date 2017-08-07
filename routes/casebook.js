var express = require('express');
var router = express.Router();

var case_controller = require('../controllers/caseController');
var food_controller = require('../controllers/foodController');
var germ_controller = require('../controllers/germController');
var lab_controller = require('../controllers/labController');
var medical_facility_controller = require('../controllers/medicalFacilityController');
var patient_controller = require('../controllers/patientController');
var prevention_tip_controller = require('../controllers/preventionTipController');
var self_care_controller = require('../controllers/selfCareController');
var symptom_controller = require('../controllers/symptomController');
var vendor_controller = require('../controllers/vendorController');

//cases, home
router.get('/', case_controller.index);

router.get('/case/create', case_controller.case_create_get);
router.post('/case/create', case_controller.case_create_post);

router.get('/case/:id/delete', case_controller.case_delete_get);
router.post('/case/:id/delete', case_controller.case_delete_post);

router.get('/case/:id/update', case_controller.case_update_get);
router.post('/case/:id/update', case_controller.case_update_post);

router.get('/case/:id', case_controller.case_detail);
router.get('/casebook', case_controller.case_list);

// foods
router.get('/food/create', food_controller.food_create_get);
router.post('/food/create', food_controller.food_create_post);

router.get('/food/:id/delete', food_controller.food_delete_get);
router.post('/food/:id/delete', food_controller.food_delete_post);

router.get('/food/:id/update', food_controller.food_update_get);
router.post('/food/:id/update', food_controller.food_update_post);

router.get('/food/:id', food_controller.food_detail);
router.get('/foods', food_controller.food_list);

// germs
router.get('/germ/create', germ_controller.germ_create_get);
router.post('/germ/create', germ_controller.germ_create_post);

router.get('/germ/:id/delete', germ_controller.germ_delete_get);
router.post('/germ/:id/delete', germ_controller.germ_delete_post);

router.get('/germ/:id/update', germ_controller.germ_update_get);
router.post('/germ/:id/update', germ_controller.germ_update_post);

router.get('/germ/:id', germ_controller.germ_detail);
router.get('/germs', germ_controller.germ_list);

//labs
router.get('/lab/create', lab_controller.lab_create_get);
router.post('/lab/create', lab_controller.lab_create_post);

router.get('/lab/:id/delete', lab_controller.lab_delete_get);
router.post('/lab/:id/delete', lab_controller.lab_delete_post);

router.get('/lab/:id/update', lab_controller.lab_update_get);
router.post('/lab/:id/update', lab_controller.lab_update_post);

router.get('/lab/:id', lab_controller.lab_detail);
router.get('/labs', lab_controller.lab_list);

//medical_facilities
router.get('/medical_facility/create', medical_facility_controller.medical_facility_create_get);
router.post('/medical_facility/create', medical_facility_controller.medical_facility_create_post);

router.get('/medical_facility/:id/delete', medical_facility_controller.medical_facility_delete_get);
router.post('/medical_facility/:id/delete', medical_facility_controller.medical_facility_delete_post);

router.get('/medical_facility/:id/update', medical_facility_controller.medical_facility_update_get);
router.post('/medical_facility/:id/update', medical_facility_controller.medical_facility_update_post);

router.get('/medical_facility/:id', medical_facility_controller.medical_facility_detail);
router.get('/medical_facilities', medical_facility_controller.medical_facility_list);

//patients
router.get('/patient/create', patient_controller.patient_create_get);
router.post('/patient/create', patient_controller.patient_create_post);

router.get('/patient/:id/delete', patient_controller.patient_delete_get);
router.post('/patient/:id/delete', patient_controller.patient_delete_post);

router.get('/patient/:id/update', patient_controller.patient_update_get);
router.post('/patient/:id/update', patient_controller.patient_update_post);

router.get('/patient/:id', patient_controller.patient_detail);
router.get('/patients', patient_controller.patient_list);

//prevention tips
router.get('/prevention_tip/create', prevention_tip_controller.prevention_tip_create_get);
router.post('/prevention_tip/create', prevention_tip_controller.prevention_tip_create_post);

router.get('/prevention_tip/:id/delete', prevention_tip_controller.prevention_tip_delete_get);
router.post('/prevention_tip/:id/delete', prevention_tip_controller.prevention_tip_delete_post);

router.get('/prevention_tip/:id/update', prevention_tip_controller.prevention_tip_update_get);
router.post('/prevention_tip/:id/update', prevention_tip_controller.prevention_tip_update_post);

router.get('/prevention_tip/:id', prevention_tip_controller.prevention_tip_detail);
router.get('/prevention_tips', prevention_tip_controller.prevention_tip_list);

//self-care recommendations
router.get('/recommendation/create', self_care_controller.self_care_create_get);
router.post('/recommendation/create', self_care_controller.self_care_create_post);

router.get('/recommendation/:id/delete', self_care_controller.self_care_delete_get);
router.post('/recommendation/:id/delete', self_care_controller.self_care_delete_post);

router.get('/recommendation/:id/update', self_care_controller.self_care_update_get);
router.post('/recommendation/:id/update', self_care_controller.self_care_update_post);

router.get('/recommendation/:id', self_care_controller.self_care_detail);
router.get('/recommendations', self_care_controller.self_care_list);

//symptoms
router.get('/symptom/create', symptom_controller.symptom_create_get);
router.post('/symptom/create', symptom_controller.symptom_create_post);

router.get('/symptom/:id/delete', symptom_controller.symptom_delete_get);
router.post('/symptom/:id/delete', symptom_controller.symptom_delete_post);

router.get('/symptom/:id/update', symptom_controller.symptom_update_get);
router.post('/symptom/:id/update', symptom_controller.symptom_update_post);

router.get('/symptom/:id', symptom_controller.symptom_detail);
router.get('/symptoms', symptom_controller.symptom_list);

//vendors
router.get('/vendor/create', vendor_controller.vendor_create_get);
router.post('/vendor/create', vendor_controller.vendor_create_post);

router.get('/vendor/:id/delete', vendor_controller.vendor_delete_get);
router.post('/vendor/:id/delete', vendor_controller.vendor_delete_post);

router.get('/vendor/:id/update', vendor_controller.vendor_update_get);
router.post('/vendor/:id/update', vendor_controller.vendor_update_post);

router.get('/vendor/:id', vendor_controller.vendor_detail);
router.get('/vendors', vendor_controller.vendor_list);

module.exports = router;
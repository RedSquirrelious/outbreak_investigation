#! /usr/bin/env node

console.log('This script populates the labs, patients, germs, cases, etc. to your database. Specified database as argument - e.g.: populatedb mongodb://your_username:your_password@your_dabase_url');

//Get arguments passed on command line
var userArgs = process.argv.slice(2);
if (!userArgs[0].startsWith('mongodb://')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}

var async = require('async')
var Case = require('./models/case')
var Food = require('./models/food')
var Germ = require('./models/germ')
var Lab = require('./models/lab')
var MedicalFacility = require('./models/medical_facility')
var Patient = require('./models/patient')
var PreventionTip = require('./models/prevention_tip')
var HomeCareTip = require('./models/home_care_tip')
var Symptom = require('./models/symptom')
var Vendor = require('./models/vendor')



var mongoose = require('mongoose');

require('dotenv').config();

var db_details = process.env.OI_DB_DETAILS;

var options = { 
  useMongoClient: true,
  socketTimeoutMS: 50000,
  keepAlive: true,
  reconnectTries: 30
};    

mongoose.connect(db_details, options);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error'));

db.once('open', function() {                        
});

var cases = []
var foods = []
var germs = []
var labs = []
var medical_facilities = []
var patients = []
var prevention_tips = []
var home_care_tips = []
var symptoms = []
var vendors = []


function foodCreate(name, type, prep, cb) {
  food_detail = 
    { name: name, 
      type: type,
      preparation: prep 
    }
  
  var food = new Food(food_detail);
       
  food.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Food: ' + food);
    foods.push(food)
    cb(null, food)
  }  );
}

function germCreate(full_name, short_name, sources, incubation, symptoms, duration, care, prevention, cb) {
  germ_detail = { 
    full_name: full_name,
    sources: sources,
    incubation_period: incubation,
    symptoms: symptoms,
    duration: duration,
    care: care,
    prevention: prevention
  }

  if (short_name != false) germ_detail.short_name = short_name

  var germ = new Germ(germ_detail);
       
  germ.save(function(err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New Germ: ' + germ);
    germs.push(germ)
    cb(null, germ);
  });
}

function labCreate(name, street_address, city, state, zip, work_phone, cb) {
  lab_detail = { 
    name: name,
    street_address: street_address,
    city: city,
    state: state,
    zip: zip,
    work_phone: work_phone
  }
    
  var lab = new Lab(lab_detail);    
  lab.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Lab: ' + lab);
    labs.push(lab)
    cb(null, lab)
  });
}

function medicalFacilityCreate(name, street_address, city, state, zip, work_phone, cb) {
  medical_facility_detail = { 
    name: name,
    street_address: street_address,
    city: city,
    state: state,
    zip: zip,
    work_phone: work_phone
  }
    
  var medical_facility = new MedicalFacility(medical_facility_detail);    
  medical_facility.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Medical Facility: ' + medical_facility);
    medical_facilities.push(medical_facility)
    cb(null, medical_facility)
  }  );
}

function patientCreate(first_name, family_name, dob, dod, street_address, city, state, zip, home_phone, work_phone, cell_phone, email, symptoms, cb) {
  patient_detail = { 
    first_name: first_name,
    family_name: family_name,
    symptoms: symptoms
  }

  if (dob != false) patient_detail.date_of_birth = dob
  if (dod != false) patient_detail.date_of_death = dod
  if (street_address != false) patient_detail.street_address= street_address
  if (city != false) patient_detail.city = city
  if (state != false) patient_detail.state = state
  if (zip != false) patient_detail.zip = zip
  if (home_phone != false) patient_detail.home_phone = home_phone
  if (work_phone != false) patient_detail.work_phone = work_phone
  if (cell_phone != false) patient_detail.cell_phone = cell_phone
  if (email != false) patient_detail.email = email
 
  var patient = new Patient(patient_detail);    
  patient.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Patient: ' + patient);
    patients.push(patient)
    cb(null, patient)
  }  );
}

function preventionTipCreate(recommendation, cb) {
  var tip = new PreventionTip({recommendation: recommendation});
  tip.save(function(err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Prevention Tip: ' + tip);
    prevention_tips.push(tip)
    cb(null, tip)
  });
}

function homeCareTipCreate(recommendation, cb) {
  var tip = new HomeCareTip({recommendation: recommendation});
  tip.save(function(err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Home Care Tip: ' + tip);
    home_care_tips.push(tip)
    cb(null, tip)
  });
}

function symptomCreate(symptom, cb) {
  var symptom = new Symptom({symptom: symptom});
  symptom.save(function(err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Symptom: ' + symptom);
    symptoms.push(symptom)
    cb(null, symptom)
  });
}

function vendorCreate(name, vendor_type, street_address, city, state, zip, poc_first_name, poc_family_name, work_phone, cell_phone, email, cb) {
  vendor_detail = { 
    name: name,
    vendor_type: vendor_type,
    street_address: street_address,
    city: city,
    state: state,
    zip: zip,
    poc_first_name: poc_first_name,
    poc_family_name: poc_family_name,
    work_phone: work_phone
  }
    
  if (cell_phone != false) vendor_detail.cell_phone = cell_phone
  if (email != false) vendor_detail.email = email
  
  var vendor = new Vendor(vendor_detail);    
  vendor.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Vendor: ' + vendor);
    vendors.push(vendor)
    cb(null, vendor)
  }  );
}

function caseCreate(date_r, date_s, germ, food_vendor, food, patient, other_patients, symptoms, lab_evidence, lab, medical_care, medical_facility, notes, cb) {
  case_detail = {
    date_reported: date_r,
    germ: germ,
    patient: patient,
    symptoms: symptoms
  }

  if(date_s != false) case_detail.date_started = date_s
  if(food_vendor != false) case_detail.food_vendor = food_vendor
  if(food != false) case_detail.food = food
  if(other_patients != false) case_detail.other_patients = other_patients
  if(lab_evidence != false) case_detail.lab_evidence = lab_evidence
  if(lab != false) case_detail.lab = lab
  if(medical_facility != false) case_detail.medical_facility = medical_facility
  if(notes != false) case_detail.notes = notes
}

function createLabs(cb) {
  async.parallel([
    function(callback) {
      labCreate('King County Public Health Laboratory', '325 9th Ave', 'Seattle', 'WA', '98104', '2067448950', callback)
    }
    ], cb);
}


function createPatients(cb) {
  async.parallel([
    function(callback) {
      patientCreate('Jane', 'Doe', '01-01-1985', false, '555 Main Street', 'Bellevue', 'WA', '98006', '2065551234', false, false, 'jdoe@somewhere.com', true, callback);
    },
    function(callback) {
      patientCreate('Linda', 'Doe', '02-02-1982', false, '666 Main Street', 'Bellevue', 'WA', '98006', '2065551235', '2064442345', '4158881234', 'ldoe@somewhere.com', true, callback);
    },
    function(callback) {
      patientCreate('Scott', 'Doe', '03-03-1989', false, '777 Main Street', 'Bellevue', 'WA', '98006', '2065551236','2064442347', '2028881236', 'sdoe@somewhere.com', true, callback);
    },
    ], cb);
}

function createMedicalFacilities(cb) {
  async.parallel([
    function(callback) {
      medicalFacilityCreate('Harborview Medical Center', '325 9th Ave', 'Seattle', 'WA', '98104', '2067443000', callback);
    },
    function(callback) {
      medicalFacilityCreate('Swedish First Hill Campus', '747 Broadway', 'Seattle', 'WA', '98122', '2063866000', callback);
    }
    ], cb);
}

function createVendors(cb) {
  async.series([
    function(callback) {
      vendorCreate('Taylor Shellfish', 'restaurant', '124 Republican Street', 'Seattle', 'WA', '98109', 'Jo', 'Blow', '2065014442', false, false, callback);
    },
    function(callback) {
      vendorCreate('Mi Tierra Restaurant', 'restaurant', '13408 NE 175th Street', 'Woodinville', 'WA', '98072', 'Bobby', 'Shingles', '4254835656', '2125551234', false, callback);
    },
    function(callback) {
      vendorCreate('Girin', 'restaurant', '501 Stadium Place S.', 'Seattle', 'WA', '98134', 'Carol', 'Carpenter', '2062574259', false, 'cc@somewhere.com', callback);
    } 
    ], cb);
}

function createFoods(cb) {
    async.series([
        function(callback) {
          foodCreate('oyster', 'seafood', 'raw', callback);
        },
        function(callback) {
          foodCreate('tilapia', 'seafood', 'raw', callback);
        },  
        function(callback) {        
          foodCreate('unknown', 'unknown', 'unknown', callback);
        }      
        ],
        // optional callback
        cb);
}

function createHomeCareTips(cb) {
  async.series([
    function(callback) {
      homeCareTipCreate('Drink plenty of fluids and get rest.', callback);
    },
    function(callback) {
      homeCareTipCreate('If you cannot drink enough fluids to prevent dehydration, call your doctor.', callback);
    },
    function(callback) {
      homeCareTipCreate('Antibiotics may be necessary if the infection spreads from the intestines to the blood stream.', callback);
    },
    function(callback) {
      homeCareTipCreate('In more severe cases, certain antibiotics can be used and can shorten the duration of symptoms if given early in the illness.', callback);
    },

    function(callback) {
      homeCareTipCreate('If you cannot drink enough fluids to prevent dehydration or if your symptoms are severe (including blood in your stools or severe abdominal pain), call your doctor.', callback);
    },
    function(callback) {
      homeCareTipCreate('Antibiotics should not be used to treat this infection.', callback);
    },   
    function(callback) {
      homeCareTipCreate('If you are very ill with fever or stiff neck, consult your doctor immediately.', callback);
    },  
    function(callback) {
      homeCareTipCreate('Antibiotics given promptly can cure the infection and, in pregnant women, can prevent infection of the fetus.', callback);
    },
    function(callback) {
      homeCareTipCreate('If you develop severe illness within a few days after eating raw or undercooked shellfish or after being exposed to warm coastal water, contact your doctor.', callback);
    }

    ], cb);
}


function createSymptoms(cb) {
  async.series([
    function(callback) {
      symptomCreate('Diarrhea, fever, abdominal cramps, vomiting', callback);
    },
    function(callback) {
      symptomCreate('Diarrhea tends to be watery and non-bloody. Diarrhea is more common in adults and vomiting is more common in children.', callback);
    },
    function(callback) {
      symptomCreate('Diarrhea, cramps, fever, and vomiting; diarrhea may be bloody', callback);
    },
    function(callback) {
      symptomCreate('Severe diarrhea that is often bloody, severe abdominal pain, and vomiting. Usually, little or no fever is present.', callback);
    },
    function(callback) {
      symptomCreate('Symptoms of HUS include decreased urine production, dark or tea-colored urine, and facial pallor.', callback);
    },   
    function(callback) {
      symptomCreate('Fever, stiff neck, confusion, weakness, vomiting, sometimes preceded by diarrhea', callback);
    },  
    function(callback) {
      symptomCreate('Diarrhea and abdominal cramps (not fever or vomiting)', callback);
    },
    function(callback) {
      symptomCreate('In healthy individuals: Diarrhea, vomiting, abdominal pain. In high-risk individuals: Sudden chills, fever, shock, skin lesions', callback);
    }
    ], cb);
}

function createPreventionTips(cb) {
  async.series([
    function(callback) {
      preventionTipCreate('If food is to be stored longer than two hours, keep hot foods hot (over 140°F) and cold foods cold (40°F or under).', callback);
    },
    function(callback) {
      preventionTipCreate('Store cooked food in a wide, shallow container and refrigerate as soon as possible.', callback);
    },
    function(callback) {
      preventionTipCreate('Avoid eating high-risk foods, including raw or lightly cooked eggs, undercooked ground beef or poultry, and unpasteurized milk', callback);
    },
    function(callback) {
      preventionTipCreate('Keep food properly refrigerated before cooking.', callback);
    },
    function(callback) {
      preventionTipCreate('Clean hands with soap and warm water before handling food. Clean surfaces before preparing food on them.', callback);
    },   
    function(callback) {
      preventionTipCreate('Separate cooked foods from ready-to-eat foods. Do not use utensils on cooked foods that were previously used on raw foods and do not place cooked foods on plates where raw foods once were unless it has been cleaned thoroughly.', callback);
    },  
    function(callback) {
      preventionTipCreate('Cook foods to a safe internal temperature. Use a meat thermometer to make sure foods are cooked to a safe temperature.', callback);
    }, 
    function(callback) {
      preventionTipCreate('Chill foods promptly after serving and when transporting from one place to another.', callback);
    },
    function(callback) {
      preventionTipCreate('Wash your hand after contact with animals, their food or treats, or their living environment.', callback);
    },
    function(callback) {
      preventionTipCreate('Wash hands frequently with soap and running water for at least 20 seconds, particularly after using the bathroom and before preparing food.', callback);
    },   
    function(callback) {
      preventionTipCreate('If you work in a restaurant or deli, avoid bare-hand contact with ready-to-eat foods.', callback);
    },  
    function(callback) {
      preventionTipCreate('Clean and disinfect surfaces contaminated by vomiting or diarrhea (use a bleach-based household cleaner as directed on the label). Clean and disinfect food preparation equipment and surfaces.', callback);
    },  

    function(callback) {
      preventionTipCreate('If you are ill with diarrhea or vomiting, do not cook, prepare, or serve food for others.', callback);
    },  
    function(callback) {
      preventionTipCreate('Wash fruits and vegetables and cook oysters and other shellfish thoroughly before eating them.', callback);
    },  
    function(callback) {
      preventionTipCreate('Wash clothing or linens soiled by vomit or fecal matter immediately. Remove the items carefully to avoid spreading the virus. Machine wash and dry.', callback);
    },  
    function(callback) {
      preventionTipCreate('Always cook meat, especially poultry, to safe minimum temperatures.', callback);
    },  
    function(callback) {
      preventionTipCreate('Keep raw meat, especially poultry, separate from other foods.', callback);
    },  
    function(callback) {
      preventionTipCreate('Do not drink raw or unpasteurized milk.', callback);
    },  
    function(callback) {
      preventionTipCreate('Avoid eating high-risk foods, especially undercooked ground beef, unpasteurized milk or juice, soft cheeses made from unpasteurized milk, or alfalfa sprouts.', callback);
    },  
    function(callback) {
      preventionTipCreate('Use a food thermometer to make sure that ground beef has reached a safe internal temperature of 160° F.', callback);
    },  
    function(callback) {
      preventionTipCreate('Wash hands before preparing food, after diapering infants, and after contact with cows, sheep, or goats, their food or treats, or their living environment.', callback);
    },  
    function(callback) {
      preventionTipCreate('Do not drink raw (unpasteurized) milk, and do not eat foods that have unpasteurized milk in them.', callback);
    },  

    function(callback) {
      preventionTipCreate('Rinse raw produce thoroughly under running tap water before eating.', callback);
    },  
    function(callback) {
      preventionTipCreate('Consume perishable and ready-to-eat foods as soon as possible.', callback);
    },  
    function(callback) {
      preventionTipCreate('Persons in higher risk groups should heat hot dogs, cold cuts, and deli meats before eating them.', callback);
    },  
    function(callback) {
      preventionTipCreate('Use a food thermometer', callback);
    },  
    function(callback) {
      preventionTipCreate('Keep food hot after cooking (at 140˚ F or above)', callback);
    },  

    function(callback) {
      preventionTipCreate('Microwave reheated food thoroughly (to 165˚F or above)', callback);
    },      
    function(callback) {
      preventionTipCreate('Refrigerate perishable foods within two hours (at 40˚F or below)', callback);
    },
    function(callback) {
      preventionTipCreate('Avoid eating raw or undercooked shellfish.', callback);
    }
    ], cb);
}

function createGerms(cb) {
    async.parallel([
        function(callback) {
          germCreate('Salmonella', false, 'Food: Contaminated eggs, poultry, meat, unpasteurized milk or juice, cheese, contaminated raw fruits and vegetables (alfalfa sprouts, melons), spices, and nuts, Animals and their environment: Particularly reptiles (snakes, turtles, lizards), amphibians (frogs), birds (baby chicks) and pet food and treats.', '12-72 hours', [symptoms[0]], '4-7 days', [home_care_tips[0], home_care_tips[1], home_care_tips[2]], [prevention_tips[2], prevention_tips[3], prevention_tips[4], prevention_tips[5], prevention_tips[6], prevention_tips[7], prevention_tips[8]], callback)
        },
        function(callback) {
          germCreate('Norovirus', 'norwalk virus', 'Produce, shellfish, ready-to-eat foods touched by infected food workers (salads, sandwiches, ice, cookies, fruit), or any other foods contaminated with vomit or feces from an infected person', '12-48 hours', [symptoms[0],symptoms[1]], '1-3 days', [home_care_tips[0], home_care_tips[1]], [prevention_tips[9], prevention_tips[10], prevention_tips[11], prevention_tips[12], prevention_tips[13], prevention_tips[14]], callback)
        },
        function(callback) {
          germCreate('Campylobacter', false, 'Raw and undercooked poultry, unpasteurized milk, contaminated water.', '2-5 days', [symptoms[2]], '', [home_care_tips[0], home_care_tips[1], home_care_tips[3]], [prevention_tips[16], prevention_tips[17], prevention_tips[18]], callback)
        },
        function(callback) {
          germCreate('Escherichia coli', 'E. coli', 'Contaminated food, especially undercooked ground beef, unpasteurized (raw) milk and juice, soft cheeses made from raw milk, and raw fruits and vegetables (such as sprouts).Contaminated water, including drinking untreated water and swimming in contaminated water. Animals and their environment: particularly cows, sheep, and goats. If you don’t wash your hands carefully after touching an animal or its environment, you could get an E. coli infection. Feces of infected people.', '1-10 days', [symptoms[3], symptoms[4]], '5-10 days', [home_care_tips[0], home_care_tips[4], home_care_tips[5]], [prevention_tips[18], prevention_tips[19], prevention_tips[20]], callback)
        },  
        function(callback) {
          germCreate('Listeria', false, 'Ready-to-eat deli meats and hot dogs. Refrigerated pâtés or meat spreads. Unpasteurized (raw) milk and dairy products. Soft cheese made with unpasteurized milk, such as queso fresco, Feta, Brie, Camembert. Refrigerated smoked seafood. Raw sprouts', '3-70 days', [symptoms[5]], 'Days to weeks', [home_care_tips[6], home_care_tips[7]], [prevention_tips[4], prevention_tips[5], prevention_tips[6], prevention_tips[22], prevention_tips[23], prevention_tips[24], prevention_tips[25], prevention_tips[26]], callback)
        }, 
        function(callback) {
          germCreate('Clostridium perfringens', 'C. perfringens', 'Beef, poultry, gravies.', '6-24 hours', [symptoms[6]], '24 hours or less', [home_care_tips[0], home_care_tips[1]], [prevention_tips[6], prevention_tips[15], prevention_tips[26], prevention_tips[27], prevention_tips[27], prevention_tips[28]], callback)
        },  
      function(callback) {
          germCreate('Bacillus cereus', 'B. cereus', 'A variety of foods, particularly rice and leftovers, as well as sauces, soups, and other prepared foods that have sat out too long at room temperature.', 'Diarrheal: 6-15 hours, Emetic (vomiting): 30 minutes to 6 hours', [symptoms[0]], '24 hours', [home_care_tips[0], home_care_tips[1]], [prevention_tips[0], prevention_tips[1]], callback)
        },  
      function(callback) {
          germCreate('Vibrio vulnificus', 'V. vulnificus', 'Raw or undercooked shellfish, particularly raw oysters', '1-7 days', [symptoms[7]], '2-8 days', [home_care_tips[8]], [prevention_tips[29]], callback)
        }   
        ], cb);
}



function createCases(cb) {
  async.parallel([
    function(callback) {
      caseCreate('1483991795', '1483559795', germs[7], vendors[0], foods[0], patients[0], false, symptoms[0], false, labs[0], medical_facilities[0], false, callback);
    },
    function(callback) {
      caseCreate('1489434995', '1489175795', germs[1], vendors[1], foods[2], patients[1], false, symptoms[0], false, labs[0], medical_facilities[1], null, callback);
    },
    function(callback) {
      caseCreate('1490126195', '1489866995', germs[1], vendors[2], foods[2], patients[2], false, symptoms[0], false, labs[0], medical_facilities[0], false, callback);
    }
    ], cb);
}


async.series([
  createFoods,
  createVendors,
  createPatients,
  createLabs,
  createMedicalFacilities,
  createSymptoms,
  createPreventionTips,
  createHomeCareTips,
  createGerms
  // createCases
],
// optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+ err.message);
    }
    else {
        console.log('seems ok');
        
    }
    //All done, disconnect from database
    mongoose.connection.close();
});




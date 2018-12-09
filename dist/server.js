'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _mongodb = require('mongodb');

var _issue = require('./issue.js');

var _issue2 = _interopRequireDefault(_issue);

require('babel-polyfill');

var _sourceMapSupport = require('source-map-support');

var _sourceMapSupport2 = _interopRequireDefault(_sourceMapSupport);

var _validator = require('validator');

var _validator2 = _interopRequireDefault(_validator);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _queryString = require('query-string');

var _queryString2 = _interopRequireDefault(_queryString);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

var _multer = require('multer');

var _multer2 = _interopRequireDefault(_multer);

var _multerGridfsStorage = require('multer-gridfs-storage');

var _multerGridfsStorage2 = _interopRequireDefault(_multerGridfsStorage);

var _gridfsStream = require('gridfs-stream');

var _gridfsStream2 = _interopRequireDefault(_gridfsStream);

var _methodOverride = require('method-override');

var _methodOverride2 = _interopRequireDefault(_methodOverride);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//To let Node.js report line numbers by using source maps, we need to install thesource-map-support module, and also call the library in the application once
//ES2015 
//ES2015 
_sourceMapSupport2.default.install(); //ES2015 
//ES2015 


// import config from './config';

const app = (0, _express2.default)();

app.use(_express2.default.static('static'));
app.use(_bodyParser2.default.json());

let db;

_mongodb.MongoClient.connect('mongodb://localhost').then(client => {
    db = client.db('merp');

    app.listen(3000, () => {
        console.log('App startedddddd on port 3000');
    });
}).catch(error => {
    console.log('ERROR:', error);
});

app.get('/api/employees', (req, res) => {
    const filter = {};
    // console.log(req);
    if (req.query.staff_code_type) filter.staff_code_type = req.query.staff_code_type;
    if (req.query.staff_code_number) {
        filter.staff_code_number = req.query.staff_code_number;
        filter.staff_code_number = Number(filter.staff_code_number);
    }
    if (req.query.nationality) filter.nationality = req.query.nationality;
    if (req.query.name) {
        const obj = {
            $search: req.query.name
        };
        filter.$text = obj;
    }
    if (req.query.department) filter.department = req.query.department;
    if (req.query.designation) filter.designation = req.query.designation;

    // if(req.query.effort_lte || req.query.effort_gte) filter.effort = {};
    // if(req.query.effort_lte)
    //     filter.effort.$lte = parseInt(req.query.effort_lte, 10);
    // if(req.query.effort_gte)
    //     filter.effort.$gte = parseInt(req.query.effort_gte, 10)
    // if(req.query.owner)
    //     filter.owner = req.query.owner;

    console.log("filter in mongofind", filter);

    db.collection('employees').find(filter).toArray().then(employees => {
        const metadata = { total_count: employees.length };
        res.json({ _metadata: metadata, records: employees });
    }).catch(error => {
        console.log(error);
        res.status(500).json({ message: `Internal Server Error: ${error}` });
    });
});

app.get('/api/employees/editEmployee/:id', (req, res) => {
    // console.log("Staff code fob", staff_code)

    let employeeID = req.params.id;
    let staff_code = employeeID.split('-');
    let staffct = staff_code[0]; //qs.stringify(staff_code[0]);
    let staffcn = Number(staff_code[1]); //staff_code[1];
    const query = {
        "staff_code_type": staffct,
        "staff_code_number": staffcn
    };
    console.log("Staff code type n number", query);
    // try {
    //     issueId = new ObjectId(req.params.id);
    // } catch (error){
    //     res.status(422).json({ message: `Invalid issue ID format: ${error}` });
    //     return;
    // }

    db.collection('employees').find(query).limit(1).next().then(employee => {
        if (!employee) res.status(404).json({ message: `No such issue: ${employeeID}` });else res.json(employee);
    }).catch(error => {
        console.log(error);
        res.status(500).json({ message: `Internal Server Error: ${error}` });
    });
});

app.get('/api/reports/renewals/', (req, res) => {

    const filter = {};
    // console.log(req);
    if (req.query.staff_code_type) filter.staff_code_type = req.query.staff_code_type;
    if (req.query.staff_code_number) {
        filter.staff_code_number = req.query.staff_code_number;
        filter.staff_code_number = Number(filter.staff_code_number);
    }
    if (req.query.nationality) filter.nationality = req.query.nationality;
    if (req.query.name) {
        const obj = {
            $search: req.query.name
        };
        filter.$text = obj;
    }
    if (req.query.department) filter.department = req.query.department;
    if (req.query.designation) filter.designation = req.query.designation;

    console.log("filter in mongofind", filter);

    const query = [{ $match: filter
    }, {
        $project: { staff_code_type: 1, staff_code_number: 1, name: 1,
            "civil.expiry_date": 1, "visa.expiry_date": 1, "passport.expiry_date": 1
        }
    }];
    db.collection('employees').aggregate(query).toArray().then(employees => {
        const metadata = { total_count: employees.length };
        res.json({ _metadata: metadata, records: employees });
    }).catch(error => {
        console.log(error);
        res.status(500).json({ message: `Internal Server Error: ${error}` });
    });
});

app.get('/api/reports/leave/', (req, res) => {

    const filter = {};
    // console.log(req);
    if (req.query.staff_code_type) filter.staff_code_type = req.query.staff_code_type;
    if (req.query.staff_code_number) {
        filter.staff_code_number = req.query.staff_code_number;
        filter.staff_code_number = Number(filter.staff_code_number);
    }
    if (req.query.nationality) filter.nationality = req.query.nationality;
    if (req.query.name) {
        const obj = {
            $search: req.query.name
        };
        filter.$text = obj;
    }
    if (req.query.department) filter.department = req.query.department;
    if (req.query.designation) filter.designation = req.query.designation;

    console.log("filter in mongofind", filter);

    db.collection('employees').find(filter).toArray().then(employees => {
        const metadata = { total_count: employees.length };
        res.json({ _metadata: metadata, records: employees });
    }).catch(error => {
        console.log(error);
        res.status(500).json({ message: `Internal Server Error: ${error}` });
    });
});

app.get('/api/reports/payroll', (req, res) => {

    const filter = {};
    // console.log(req);
    if (req.query.staff_code_type) filter.staff_code_type = req.query.staff_code_type;
    if (req.query.staff_code_number) {
        filter.staff_code_number = req.query.staff_code_number;
        filter.staff_code_number = Number(filter.staff_code_number);
    }
    if (req.query.nationality) filter.nationality = req.query.nationality;
    if (req.query.name) {
        const obj = {
            $search: req.query.name
        };
        filter.$text = obj;
    }
    if (req.query.department) filter.department = req.query.department;
    if (req.query.designation) filter.designation = req.query.designation;

    console.log("filter in mongofind", filter);

    db.collection('payroll').find(filter).toArray().then(employees => {
        const metadata = { total_count: employees.length };
        res.json({ _metadata: metadata, records: employees });
    }).catch(error => {
        console.log(error);
        res.status(500).json({ message: `Internal Server Error: ${error}` });
    });
});

app.get('/api/fleet', (req, res) => {

    db.collection('fleet').find().toArray().then(fleet => {
        const metadata = { total_count: fleet.length };
        res.json({ _metadata: metadata, records: fleet });
    }).catch(error => {
        console.log(error);
        res.status(500).json({ message: `Internal Server Error: ${error}` });
    });
});

app.get('/api/employee_add', (req, res) => {

    db.collection('employees').find().toArray().then(employees => {
        const metadata = { total_count: employees.length };
        res.json({ _metadata: metadata, records: employees });
    }).catch(error => {
        console.log(error);
        res.status(500).json({ message: `Internal Server Error: ${error}` });
    });
});

app.post('/api/employee_add', (req, res) => {
    const newEmployee = req.body;
    // console.log("Request body",req.file);

    if (newEmployee.dob) {
        newEmployee.dob = new Date(newEmployee.dob);
    }
    if (newEmployee.passport.issue_date) {
        newEmployee.passport.issue_date = new Date(newEmployee.passport.issue_date);
    }
    if (newEmployee.passport.expiry_date) {
        newEmployee.passport.expiry_date = new Date(newEmployee.passport.expiry_date);
    }
    if (newEmployee.license.issue_date) {
        newEmployee.license.issue_date = new Date(newEmployee.license.issue_date);
    }
    if (newEmployee.license.expiry_date) {
        newEmployee.license.expiry_date = new Date(newEmployee.license.expiry_date);
    }
    if (newEmployee.doj) {
        newEmployee.doj = new Date(newEmployee.doj);
    }

    if (newEmployee.dot) {
        newEmployee.dot = new Date(newEmployee.dot);
    }

    if (newEmployee.civil.issue_date) {
        newEmployee.civil.issue_date = new Date(newEmployee.civil.issue_date);
    }
    if (newEmployee.civil.expiry_date) {
        newEmployee.civil.expiry_date = new Date(newEmployee.civil.expiry_date);
    }
    if (newEmployee.visa.issue_date) {
        newEmployee.visa.issue_date = new Date(newEmployee.visa.issue_date);
    }
    if (newEmployee.visa.expiry_date) {
        newEmployee.visa.expiry_date = new Date(newEmployee.visa.expiry_date);
    }

    console.log("New employee before inserting in db ", newEmployee);

    db.collection('employees').insertOne(newEmployee).then(result => db.collection('employees').findOne({ _id: result.insertedId })).then(query_result => db.collection('employees').count().then(metadata => res.json({ _metadata: metadata, new_employee: query_result }))).catch(err => {
        console.log(err);
        res.status(500).json({ message: `Internal Server Error: ${err}` });
    });
});

app.post('/api/reports/payroll_edit', (req, res) => {
    const payroll = req.body;
    // console.log("Request body",req.file);

    if (payroll.doj) {
        payroll.doj = new Date(payroll.doj);
    }

    console.log("New employee before inserting in db ", payroll);
    let collection = 'payroll';
    db.collection(collection).replaceOne({ staff_code_type: payroll.staff_code_type, staff_code_number: payroll.staff_code_number }, payroll, { upsert: true }).then(result => db.collection(collection).findOne({ _id: result.insertedId })).then(query_result => db.collection(collection).count().then(metadata => res.json({ _metadata: metadata, payroll: query_result }))).catch(err => {
        console.log(err);
        res.status(500).json({ message: `Internal Server Error: ${err}` });
    });
});

app.post('/api/fleet/addVehicle', (req, res) => {
    const newVehicle = req.body;
    // console.log("Request body",req.file);

    if (newVehicle.dop) {
        newVehicle.dop = new Date(newVehicle.dob);
    }
    if (newVehicle.registration.issue_date) {
        newVehicle.registration.issue_date = new Date(newVehicle.registration.issue_date);
    }
    if (newVehicle.registration.expiry_date) {
        newVehicle.registration.expiry_date = new Date(newVehicle.registration.expiry_date);
    }

    if (newVehicle.insurance.issue_date) {
        newVehicle.insurance.issue_date = new Date(newVehicle.insurance.issue_date);
    }
    if (newVehicle.insurance.expiry_date) {
        newVehicle.insurance.expiry_date = new Date(newVehicle.insurance.expiry_date);
    }

    // console.log("New employee before inserting in db ", newEmployee)

    db.collection('fleet').insertOne(newVehicle).then(result => db.collection('fleet').findOne({ _id: result.insertedId })).then(query_result => db.collection('fleet').count().then(metadata => res.json({ _metadata: metadata, new_vehicle: query_result }))).catch(err => {
        console.log(err);
        res.status(500).json({ message: `Internal Server Error: ${err}` });
    });
});

app.post('/api/auth', (req, res) => {
    var _req$body = req.body;
    const username = _req$body.username,
          password = _req$body.password;


    db.collection('login').find({ username: username }).then(user => {
        if (user) {
            if (password === user.password) {
                const token = _jsonwebtoken2.default.sign({
                    id: user._id,
                    username: user.username
                }, config.jwtSecret);
                res.json({ token: token });
            } else {
                res.status(401).json({ errors: { form: 'Invalid Credentials' } });
            }
        } else {
            res.status(401).json({ errors: { form: 'Invalid Credentials' } });
        }
    });
});

app.put('/api/employees/editEmployee/:id', (req, res) => {
    //   let issueId;
    //   try {
    //     issueId = new ObjectId(req.params.id);
    //   } catch (error) {
    //     res.status(422).json({ message: `Invalid issue ID format: ${error}` });
    //     return;
    //   }
    let employeeID = req.params.id;
    let staff_code = employeeID.split('-');
    let staffct = staff_code[0]; //qs.stringify(staff_code[0]);
    let staffcn = Number(staff_code[1]); //staff_code[1];
    const query = {
        "staff_code_type": staffct,
        "staff_code_number": staffcn
    };
    const newEmployee = req.body;
    delete newEmployee._id;
    //   console.log("issueId =>",issueId);

    //   console.log("issue =>",issue);


    //   const err = Issue.validateIssue(issue);
    //   if (err) {
    //     res.status(422).json({ message: `Invalid request: ${err}` });
    //     return;
    //   }
    if (newEmployee.dob) {
        newEmployee.dob = new Date(newEmployee.dob);
    }
    if (newEmployee.doj) {
        newEmployee.doj = new Date(newEmployee.doj);
    }

    if (newEmployee.dot) {
        newEmployee.dot = new Date(newEmployee.dot);
    }

    if (newEmployee.civil.issue_date) {
        newEmployee.civil.issue_date = new Date(newEmployee.civil.issue_date);
    }
    if (newEmployee.civil.expiry_date) {
        newEmployee.civil.expiry_date = new Date(newEmployee.civil.expiry_date);
    }
    if (newEmployee.visa.issue_date) {
        newEmployee.visa.issue_date = new Date(newEmployee.visa.issue_date);
    }
    if (newEmployee.visa.expiry_date) {
        newEmployee.visa.expiry_date = new Date(newEmployee.visa.expiry_date);
    }

    console.log("EMPLOYEE UPDATE in db ", newEmployee);

    db.collection('employees').updateOne(query, { $set: newEmployee }).then(() => db.collection('employees').find({ query: query }).limit(1).next()).then(savedEmployee => {
        res.json(savedEmployee);
    }).catch(error => {
        console.log(error);
        res.status(500).json({ message: `Internal Server Error: ${error}` });
    });
});

app.delete('/api/issues/:id', (req, res) => {
    let issueId;
    try {
        issueId = new _mongodb.ObjectId(req.params.id);
    } catch (error) {
        res.status(422).json({ message: `Invalid issue ID format: ${error}` });
        return;
    }

    db.collection('issues').deleteOne({ _id: issueId }).then(deleteResult => {
        if (deleteResult.result.n === 1) res.json({ status: 'OK' });else res.json({ status: 'Warning: object not found' });
    }).catch(error => {
        console.log(error);
        res.status(500).json({ message: `Internal Server Error: ${errror}` });
    });
});

app.get('*', (req, res) => {
    res.sendFile(_path2.default.resolve('static/index.html'));
});

// app.listen(3000, function(){
//     console.log('App started on port 3000');
// });

// function validateIssue(issue) {
//     for(const field in issue ){
//         const type = issueFieldType[field];
//     if(!type) {
//         delete issue[field];
//     } else if ( type == 'required' && !issue[field]){
//         return `${field} is required.`;
//     }
// }

// if(!validIssueStatus[issue.status])
//     return `${issue.status} is not a valid status.`;

// return null;

// }
//# sourceMappingURL=server.js.map
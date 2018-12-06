'use strict';
import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';


const EmployeeFieldType = {
   
    name: 'required', 
    nationality: 'optional',
    staff_code_type: 'required', staff_code_number: 'required',
    department: 'required', designation: 'required', 
    // reporting: 'required',
    dob: 'required',
    doj: 'required',
    // salary: 'required',
    };

function checkDuplicates(employee,db_employees){
    console.log("employee duplicates to check", employee)
    console.log("db employees", db_employees)

    for (var i=0; i < db_employees.length; i++){
        var emp= db_employees[i]
        console.log("emp", emp)
        console.log("emp staff code ", emp.staff_code_type,emp.staff_code_number)


        if (emp.staff_code_type === employee.staff_code_type && emp.staff_code_number === employee.staff_code_number){
            console.log("Duplicate found")
            return true;
        }
    }
    return false;
}

function validateEmployee(employee) {
    const emptyFields = {};
    console.log("employee to check", employee)

    for( var field in employee ){
         const type = EmployeeFieldType[field];
        // console.log("field ", employee.field)
    // if(!type) {
    //     delete employee[field];
    // }
    if ( type== 'required' && field === 'salary' &&  !employee[field].basic){
        emptyFields['salary_basic'] = true;
    }
    else if ( type == 'required' && (!employee[field] || employee[field] === 'default')){
        // return `${field} is required.`;
        emptyFields[field] = true
    }

}
// console.log("validateEmployee function before return emptyFields object :", emptyFields)
return emptyFields;

// if(!validIssueStatus[issue.status])
//     return `${issue.status} is not a valid status.`;

// return null;

}

function validateInput(data){
    let errors = {}

    if(Validator.isNull(data.username)) {
        errors.username = 'Username is required'
    }

    if(Validator.isNull(data.password)) {
        errors.password = 'Password is required'
    }

    return {
        errors,
        isValid : isEmpty(errors)
    }
}

function convertIssue(issue) {
    if(issue.created) issue.created = new Date(issue.created);
    if(issue.completionDate) issue.completionDate = new Date(issue.completionDate);
    return cleanupIssue(issue);
}

function cleanupIssue(issue) {
  const cleanedUpIssue = {};
  Object.keys(issue).forEach(field => {
    if (issueFieldType[field]) cleanedUpIssue[field] = issue[field];
  });
//   console.log("issue list returned issue =>",issue);
  return cleanedUpIssue;

}

// module.exports = {
//     validateIssue : validateIssue
// };

export default {                              //ES2015
    validateEmployee,
    checkDuplicates,
    cleanupIssue,
    convertIssue,
    validateInput
};



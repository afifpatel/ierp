'use strict';
import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

const validIssueStatus = {
    New: true,
    Open: true,
    Assigned: true,
    Fixed: true,
    Verified: true,
    Closed: true,
    };

const issueFieldType = {
    status: 'required',
    owner: 'required',
    effort: 'optional',
    created: 'required',
    completionDate: 'optional',
    title: 'required',

    name: 'required', 
    nationality: 'optional',
    staff_code_type: 'required', staff_code_number: 'required',
    department: 'required', designation: 'required', 
    // reporting: 'required',
    dob: 'required', doj: 'required',
    salary:{
        basic: 'required',
        hra: 'optional',
        fa: 'optional',
        sa: 'optional',
        other: 'optional',
    },
    };

function validateIssue(issue) {
    for(const field in issue ){
        const type = issueFieldType[field];
    if(!type) {
        delete issue[field];
    } else if ( type == 'required' && !issue[field]){
        return `${field} is required.`;
    }
}

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
    validateIssue,
    cleanupIssue,
    convertIssue,
    validateInput
};



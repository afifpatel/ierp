'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _validator = require('validator');

var _validator2 = _interopRequireDefault(_validator);

var _isEmpty = require('lodash/isEmpty');

var _isEmpty2 = _interopRequireDefault(_isEmpty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const validIssueStatus = {
    New: true,
    Open: true,
    Assigned: true,
    Fixed: true,
    Verified: true,
    Closed: true
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
    salary: {
        basic: 'required',
        hra: 'optional',
        fa: 'optional',
        sa: 'optional',
        other: 'optional'
    }
};

function validateIssue(issue) {
    for (const field in issue) {
        const type = issueFieldType[field];
        if (!type) {
            delete issue[field];
        } else if (type == 'required' && !issue[field]) {
            return `${field} is required.`;
        }
    }

    // if(!validIssueStatus[issue.status])
    //     return `${issue.status} is not a valid status.`;

    // return null;
}

function validateInput(data) {
    let errors = {};

    if (_validator2.default.isNull(data.username)) {
        errors.username = 'Username is required';
    }

    if (_validator2.default.isNull(data.password)) {
        errors.password = 'Password is required';
    }

    return {
        errors: errors,
        isValid: (0, _isEmpty2.default)(errors)
    };
}

function convertIssue(issue) {
    if (issue.created) issue.created = new Date(issue.created);
    if (issue.completionDate) issue.completionDate = new Date(issue.completionDate);
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

exports.default = { //ES2015
    validateIssue: validateIssue,
    cleanupIssue: cleanupIssue,
    convertIssue: convertIssue,
    validateInput: validateInput
};
//# sourceMappingURL=issue.js.map
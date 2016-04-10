// Configure accounts-ui 8.3
// import { Accounts } from 'meteor/accounts-base';
//
// Accounts.ui.config({
//     passwordSignupFields: 'USERNAME_ONLY'
// });

import { Accounts } from 'meteor/accounts-base';

Accounts.ui.config({
    passwordSignupFields: 'USERNAME_ONLY',
});
import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';

import './task.html';

// Define helper to check ownership 10.6
Template.task.helpers({
    isOwner() {
        return this.owner === Meteor.userId();
    }
});
// Add event handlers for Task buttons 5.3
Template.task.events({
    'click .toggle-checked'() {
        // Set the checked property to the opposite of its current value
        // commented out after adding to imports/api/tasks.js 9.4
        // Tasks.update(this._id, {
        //     $set: { checked: ! this.checked },
        // });

        // Replace update and remove with methods
        // Set the checked property to the opposite of its current value 9.4
        Meteor.call('tasks.setChecked', this._id, !this.checked);
    },
    'click .delete'() {
        Meteor.call('tasks.remove', this._id);
    },
    // Add event handler to call the setPrivate method 10.8
    'click .toggle-private'() {
        Meteor.call('tasks.setPrivate', this._id, !this.private);
    }
});

// import { Meteor } from 'meteor/meteor';
// import { Template } from 'meteor/templating';
//
// import './task.html';
//
// Template.task.helpers({
//     isOwner() {
//         return this.owner === Meteor.userId();
//     },
// });
//
// Template.task.events({
//     'click .toggle-checked'() {
//         // Set the checked property to the opposite of its current value
//         Meteor.call('tasks.setChecked', this._id, !this.checked);
//     },
//     'click .delete'() {
//         Meteor.call('tasks.remove', this._id);
//     },
//     'click .toggle-private'() {
//         Meteor.call('tasks.setPrivate', this._id, !this.private);
//     },
// });
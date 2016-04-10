/**
 * Created by mroien on 4/9/16.
 */

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Tasks } from '../api/tasks.js';
// import Task component from the body
import  './task.js';
import './body.html';

// Add state dictionary to the body 7.3
Template.body.onCreated(function bodyOnCreated() {
    this.state = new ReactiveDict();
    // Subscribe to tasks 10.3
    Meteor.subscribe('tasks')
});

Template.body.helpers({
    tasks() {
        // Add helpers to body template 7.5
        const instance = Template.instance();
        if (instance.state.get('hideCompleted')) {
            // If hide completed is checked, filter tasks
            return Tasks.find({ checked: {$ne: true } }, { sort: { createdAt: -1 } });
        }
        // Otherwise, return all of the tasks
        // Show newest tasks at the top 4.3
        return Tasks.find({}, {sort: {createdAt: -1 } });
    },
    // Add incompletedCoount helper to body 7.6
    incompleteCount() {
        return Tasks.find({ checked: {$ne: true } }).count();
    }
});

// Add event handler for form submit 4.2
Template.body.events({
    'submit .new-task'(event) {
        // Prevent default browser form submit
        event.preventDefault();

        // Get value from form element
        const target = event.target;
        const text = target.text.value;

        // Insert a task into the collection
        // commented out after adding it to import/api/tasks.js for username checks 9.3
        // Tasks.insert({
        //     text,
        //     createdAt: new Date(), //current time
        //     // Update insert to include use date 8.5
        //     owner: Meteor.userId(), //current userId
        //     username: Meteor.user().username // current username
        // });

        // Replace insert with addText method 9.3
        Meteor.call('tasks.insert', text);

        // Clear Form
        target.text.value = '';
    },
    // Add event handler for checkbox 7.4
    'change .hide-completed input'(event, instance) {
        instance.state.set('hideCompleted', event.target.checked);
    }
});


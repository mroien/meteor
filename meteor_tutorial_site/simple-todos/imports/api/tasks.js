// /**
//  * Created by mroien on 4/9/16.
//  */
// // create tasks collection 3.1
//
// import { Meteor } from 'meteor/meteor';
// import { Mongo } from 'meteor/mongo';
// import { check } from 'meteor/check';
//
// export const Tasks = new Mongo.Collection('tasks');
//
// // Add publication for tasks 10.2
// if (Meteor.isServer) {
//     // This code only runs on the server
//     Meteor.publish('tasks', function tasksPublication() {
//         // Only publish tasks the user is allowed to see 10.9
//         return Tasks.find({
//             $or: [
//                 { private: { $ne: true } },
//                 { owner: this.userId }
//             ]
//         });
//     });
// }
// // Define some methods 9.2
// Meteor.methods({
//     'tasks.insert'(text) {
//         check(text, String);
//
//         // Make sure the user is logged in before inserting a task
//         if (! this.userId) {
//             throw new Meteor.Error('not-authorized');
//         }
//
//         Tasks.insert({
//             text,
//             createdAt: new Date(),
//             owner: Meteor.userId(),
//             username: Meteor.users.findOne(this.userId).username
//         });
//     },
//     'tasks.remove'(taskId) {
//         check(taskId, String);
//
//         // Add some extra security to methods 10.10
//         const task = Tasks.findOne(taskId);
//         if (task.private && task.owner !== this.userId) {
//             // If the task if private, make sure only the owner can delete it
//             throw new Meteor.Error('not-authorized');
//         }
//
//         Tasks.remove(taskId);
//     },
//     'tasks.setChecked'(taskId, setChecked) {
//         check(taskId, String);
//         check(setChecked, Boolean);
//
//         // Add some extra security to methods 10.10
//         const task = Tasks.findOne(taskId);
//         if (task.private && task.owner !== Meteor.userId()) {
//             // If the task is private, make sure only the owner can check it off
//             throw new Meteor.Error('not-authorized');
//         }
//
//         Tasks.update(taskId, { $set: {checked: setChecked } });
//     },
//     // Define method to set tasks to private 10.7
//     'tasks.setPrivate'(taskId, setToPrivate) {
//         check(taskId, String);
//         check(setToPrivate, Boolean);
//
//         const task = Tasks.findOne(taskId);
//
//         // Make sure only the task owner can make a task private
//         if (task.owner !== Meteor.userId()) {
//             throw new Meteor.Error('not-authorized');
//         }
//
//         Tasks.update(taskId, { $set: { private: setToPrivate } });
//     }
// });

import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Tasks = new Mongo.Collection('tasks');

if (Meteor.isServer) {
    // This code only runs on the server
    // Only publish tasks that are public or belong to the current user
    Meteor.publish('tasks', function tasksPublication() {
        return Tasks.find({
            $or: [
                { private: { $ne: true } },
                { owner: this.userId },
            ],
        });
    });
}

Meteor.methods({
    'tasks.insert'(text) {
        check(text, String);

        // Make sure the user is logged in before inserting a task
        if (! this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        Tasks.insert({
            text,
            createdAt: new Date(),
            owner: this.userId,
            username: Meteor.users.findOne(this.userId).username,
        });
    },
    'tasks.remove'(taskId) {
        check(taskId, String);

        const task = Tasks.findOne(taskId);
        if (task.private && task.owner !== this.userId) {
            // If the task is private, make sure only the owner can delete it
            throw new Meteor.Error('not-authorized');
        }

        Tasks.remove(taskId);
    },
    'tasks.setChecked'(taskId, setChecked) {
        check(taskId, String);
        check(setChecked, Boolean);

        const task = Tasks.findOne(taskId);
        if (task.private && task.owner !== this.userId) {
            // If the task is private, make sure only the owner can check it off
            throw new Meteor.Error('not-authorized');
        }

        Tasks.update(taskId, { $set: { checked: setChecked } });
    },
    'tasks.setPrivate'(taskId, setToPrivate) {
        check(taskId, String);
        check(setToPrivate, Boolean);

        const task = Tasks.findOne(taskId);

        // Make sure only the task owner can make a task private
        if (task.owner !== this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        Tasks.update(taskId, { $set: { private: setToPrivate } });
    },
});
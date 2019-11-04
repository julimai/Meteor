import {Meteor} from 'meteor/meteor';
import {Template} from 'meteor/templating';
import {Gifts} from '../api/gifts.js';
import {ReactiveDict} from 'meteor/reactive-dict';
import './body.html';
import './gift.js';

Template.body.onCreated(function bodyOnCreated() {
    this.state=new ReactiveDict();
    Meteor.subscribe('gifts');
});

Template.body.helpers({
    gifts() {
    const instance = Template.instance();
    if(instance.state.get('hideCompleted')){
        return Gifts.find({checked: {$ne: true}}, {sort: {createdAt: -1}});
    }

        return Gifts.find({}, {sort: {createdAt: -1}});
    },
    incompleteCount() {
        return Gifts.find({ checked: { $ne: true }}).count();
    },
});

 
Template.body.events({
    'submit .new-gift'(event) {
      // Prevent default browser form submit
      event.preventDefault();
   
      // Get value from form element
      const target = event.target;
      const text = target.text.value;
   
      Meteor.call('gifts.insert', text);
   
      // Clear form
      target.text.value = '';
    },
    'change .hide-completed input' (event, instance) {
        instance.state.set('hideCompleted', event.target.checked);

    },
  });
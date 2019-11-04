import { Meteor } from 'meteor/meteor';

 
import { Template } from 'meteor/templating';
 
import './gift.html';

Template.gift.helpers({
    isOwner() {
        return this.owner === Meteor.userId();
    },
});
 
Template.gift.events({
  'click .toggle-checked'() {
    // Set the checked property to the opposite of its current value
    Meteor.call('gifts.setChecked', this._id, !this.checked);
  },
  'click .delete'() {
    Meteor.call('gifts.remove', this._id);
  },
  'click .toggle-private'(){
      Meteor.call('gifts.setPrivate',this._id, !this.private);
  },
});
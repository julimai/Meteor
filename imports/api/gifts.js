import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
 
export const Gifts = new Mongo.Collection('gifts');

if (Meteor.isServer) {
    // This code only runs on the server
     // Only publish gifts that are public or belong to the current user
  Meteor.publish('gifts', function giftsPublication() {
    return Gifts.find({
      $or: [
        { private: { $ne: true } },
        { owner: this.userId },
      ],
    });
    });
  }
   

Meteor.methods({
  'gifts.insert'(text) {
    check(text, String);
 
    // Make sure the user is logged in before inserting a gift
    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }
 
    Gifts.insert({
      text,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username,
    });
  },
  'gifts.remove'(giftId) {
    check(giftId, String);
 
    const gift = Gifts.findOne(giftId);
    if (gift.private && gift.owner !== Meteor.userId()) {
      // If the gift is private, make sure only the owner can delete it
      throw new Meteor.Error('not-authorized');
    }
 

    Gifts.remove(giftId);
  },
  'gifts.setChecked'(giftId, setChecked) {
    check(giftId, String);
    check(setChecked, Boolean);
 
    const gift = Gifts.findOne(giftId);
    if (gift.private && gift.owner !== Meteor.userId()) {
      // If the gift is private, make sure only the owner can check it off
      throw new Meteor.Error('not-authorized');
    }
 

    Gifts.update(giftId, { $set: { checked: setChecked } });
  },

  'gifts.setPrivate'(giftId, setToPrivate) {
    check(giftId, String);
    check(setToPrivate, Boolean);
 
    const gift = Gifts.findOne(giftId);
 
    // Make sure only the gift owner can make a gift private
    if (gift.owner !== Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }
 
    Gifts.update(giftId, { $set: { private: setToPrivate } });
  },

});
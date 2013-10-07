Rooms = new Meteor.Collection('rooms');

if (Meteor.isServer && Rooms.find().count() == 0) {

  var roomsA = [
    {name: 'Small Talk', members: 3, last_activity: '1 minute ago', id: 0, 
      messages: [
        {author: 'Tom', text: 'Hi there Sacha!'},
        {author: 'Sacha', text: 'Hey Tom, how are you?'},
        {author: 'Tom', text: 'Good thanks!'},
      ]},
    {name: 'Big Talk', members: 2, last_activity: '5 minutes ago', id: 1},
    {name: 'Trees', members: 0, last_activity: '3 days ago', id: 2}
  ];
  
 for (var i = 0; i < roomsA.length; i++) {
	  Rooms.insert(roomsA[i]);
  }; 
}	  

 
 
if (Meteor.isClient) {



Meteor.Router.add({
  '/': 'home',
  'add': function () { return 'test'},
  '/rooms/:id': function(id) {
    Session.set('currentRoomId', id);
    return 'chatRoom2'
  }
});


Template.room.events({
    'click .goToRoom': function(e, t){
      console.log("You clicked");
      console.log(this);
       Meteor.Router.to('/rooms/' + this.name);
       Session.set('realCurrentRoomId', this._id);
     },
     'click .createRoom': function(e, t) {
	     console.log("You clicked");
	     Rooms.insert({name: chatRoomName.value, members: 0, last_activity: 'Never'});
	     
     }
  });
  
Template.chatRoom2.events({
	'click .sendMessage': function(e, t) {
		Rooms.update(Session.get('realCurrentRoomId'), {$push: {messages: {author: authorName.value, text: the_message.value}}});
		console.log("You clicked");
		the_message.value = '';
		return false;
	}
	
});


 Template.room.rooms = function () {
	 return Rooms.find();
 };
 
 Template.chatRoom.id = function() {
 		var id = Session.get('currentRoomId', id);
	 return id;
 };
 
 Template.chatRoom2.helpers({
	 room: function() {
	    return Rooms.findOne({name: Session.get('currentRoomId')});
	 }
 });
 
 
console.log(Rooms.find().fetch());
console.log(Rooms.find(Session.get('currentRoomId')).fetch()._id);


}
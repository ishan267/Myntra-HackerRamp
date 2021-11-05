var socket = io();

console.log("Here it starts");

socket.on('connect',()=>{
  console.log('connected');
  var params = jQuery.deparam(window.location.search);

  socket.emit('add-session',{
        "session": {
            "id": 1636150670847,
            "title": "Ko",
            "date": {
                "date": 6,
                "month": 10,
                "year": 2021
            },
            "time": {
                "hour": 3,
                "minute": 47
            },
            "members": [
                "GhgR6m57mmaEZ4GMoicKuB6YzMv1",
                "Y7z8PA4X3oa1J8s7LdJUqKSCWCs2",
                "RX1dV5bEfHZxETs9mD3THqXd3f23"
            ],
            "adminId": "GhgR6m57mmaEZ4GMoicKuB6YzMv1"
        }
    },callback=>{
    console.log(callback);
  });

socket.on('disconnect',()=>{
    console.log('disconnected from the server');
});


function scrollToBottom(){
     //Selectors
      var messages = jQuery('#messages');
      var newMessage = messages.children('li:last-child');
     //Heights
     var clientHeight = messages.prop('clientHeight');
     var scrollTop = messages.prop('scrollTop');
     var scrollHeight = messages.prop('scrollHeight');
     var newMessageHeight = newMessage.innerHeight();
     var lastMessageHeight = newMessage.prev().innerHeight();

     if(clientHeight+scrollTop+newMessageHeight+lastMessageHeight>=scrollHeight){
      messages.scrollTop(scrollHeight);
     }
}

socket.on('newMessage',(message)=>{
       var formattedTime = moment(message.createAt).format('h:mm a');
       var template = jQuery('#message-template').html();
       var html = Mustache.render(template,{
           text: message.text,
           from: message.from,
           createAt: formattedTime
       });

   jQuery('#messages').append(html);
   scrollToBottom();
});

jQuery('#message-form').on('submit',(e)=>{
   e.preventDefault();  //preventing the default behaviour of submit button
   
   var sender_id = jQuery('[name=sen_id]');
   var messageTextBox = jQuery('[name=message]');
   var tag_ = jQuery('[name=tag]');
   var receiver_id = jQuery('[name=rec_id]');

   socket.emit('createMessage',{
        mid: new Date().getTime(),
        sen_id: sender_id.val(),
        msg: messageTextBox.val(),
        tag: tag_.val(),
        rec_id: receiver_id.val()
   },function(){
       messageTextBox.val('');
   })
});

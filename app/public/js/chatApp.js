var chatForm = document.forms.chatForm;

if(chatForm) {
  var chatUser = document.querySelector('#chat-user');
  var chatMessage = document.querySelector('#chat-message');

  chatForm.addEventListener('submit', function(event) {
    event.preventDefault();

    console.log('been clicked');
    showMessage({
      username: chatUser.value,
      message: chatMessage.value
    });

    chatMessage.value = '';
    chatMessage.focus();
  });
}


function showMessage(data) {
  var chatDisplay = document.querySelector('.chat-display');
  var newMessage = document.createElement('p');

  newMessage.className = 'chat-text';
  newMessage.innerHTML = '<strong>' + data.username + '</strong>' + "     " + data.message;

  chatDisplay.insertBefore(newMessage, chatDisplay.firstChild);
}

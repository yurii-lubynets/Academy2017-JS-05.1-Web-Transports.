(() => {
    const NAME_INPUT = document.querySelector('.username__input');
    const SIGN_IN_BTN = document.querySelector('.signIn__btn');
    const MESSAGE_FIELD = document.querySelector('.message__field');
    const SEND_MESSAGE_BTN = document.querySelector('.msg__btn');

    let userName = document.querySelector('.userName');
    let messageHistory = document.querySelector('.messageHistory');
    let userIsTyping = document.querySelector('.userIsTyping');
    
    let history = [];
    let renderedHistory = [];
    let users = [];
    let renderedUsers = [];
    
    let ajax = new XMLHttpRequest();

    const getHistory = () => {
        ajax.open("GET", '/messages', true);
        ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        ajax.send();
        ajax.onreadystatechange = () => {
            if (ajax.readyState === XMLHttpRequest.DONE && ajax.status === 200) {
                history = JSON.parse(ajax.responseText);
                renderHistory();
                getUsers();
            }
        };
    };
    const getUsers = () => {
        ajax.open("GET", '/users', true);
        ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        ajax.send();
        ajax.onreadystatechange = () => {
            if (ajax.readyState === XMLHttpRequest.DONE && ajax.status === 200) {
                users = JSON.parse(ajax.responseText);
                renderUsers();
            }
        };
    };
    const renderHistory = () => {
        if (history) {
            messageHistory.innerHTML = "";
            renderedHistory = history;
            history.map((message) => {
                let itemMessage = document.createElement("li");
                itemMessage.classList.add('itemMessage');
                itemMessage.innerText = message.user + ': ' + message.message;
                messageHistory.appendChild(itemMessage);
            });
        }
    };
    const renderUsers = () => {
        console.log(users);
        if (users.length !== 0) {
            userIsTyping.innerText = '';
            let typingUsers = [];
            users.map((el) => {
                if (el.isTyping === "true") {
                    typingUsers.push(el.user);
                }
            });
            if(typingUsers.length !== 0) {
                userIsTyping.innerText = typingUsers.join(',') + ' is typing...';
                while (typingUsers.length) {
                    typingUsers.pop();
                }
            }
        }
    };
    userName.innerText = "User Name";
    SIGN_IN_BTN.addEventListener('click', () => {
        NAME_INPUT.value ? (userName.innerText = NAME_INPUT.value ) : "User Name";
        ajax.open('POST', '/users', true);
        ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        ajax.send("user=" + NAME_INPUT.value);
        ajax.onreadystatechange = () => {
            if (ajax.readyState === XMLHttpRequest.DONE && ajax.status === 200) {
                NAME_INPUT.value = '';
            }
        }
    });
    SEND_MESSAGE_BTN.addEventListener('click', () => {
        let message = MESSAGE_FIELD.value;
        ajax.open('POST', '/messages', true);
        ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        ajax.send("message=" + message + "&user=" + userName.innerText);
        ajax.onreadystatechange = () => {
            if (ajax.readyState === XMLHttpRequest.DONE && ajax.status === 200) {
                MESSAGE_FIELD.value = '';
            }
        }

    });
    MESSAGE_FIELD.addEventListener('focus', () => {
        ajax.open('PUT', '/users', true);
        ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        ajax.send("isTyping=" + true + "&user=" + userName.innerText);
    });
    MESSAGE_FIELD.addEventListener('blur', () => {
        ajax.open('PUT', '/users', true);
        ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        ajax.send("isTyping=" + false + "&user=" + userName.innerText);
    });   
    getHistory();
    setInterval(() => {getHistory();}, 500)
})();
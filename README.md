### Academy 2017: Web Transports.

## На домашнє завдання необхідно реалізувати простий веб використовуючи Polling на AJAX (з XMLHttpRequest) Backend - NodeJS.

# Вимоги до завдання:
1. При завантаженні чату повинно з’являтися випливаюче вікно з формою для збереження імені та ніку.
2. Сам інтерфейс чату повинен містити список повідомлень, поле для вводу повідомлення і кнопку надіслати.
3. Збоку від списку повідомлень повинен міститися список учасників чату:
	* Елемент списку повинен містити імя користувача та нік
4. Інтерфейс повинен бути акуратним та простим, можна використати bootstrap, або будь яку іншу бібліотеку.
5. Чат повинен містити історію з 100 повідомлень (очищення за принципом FIFO). Вся історія доступна кожному користувачу, незважаючи коли він підключився.
6. Коли користувач набирає текст, то в чаті під текстовим полем показати це у форматі: “@userName is typing …”
7. Якщо ввести повідомлення у форматі “@nicName”, то у користувача котрому воно адресоване воно повинно бути підсвічене (background іншого кольору наприклад)

function attachEvents() {

    document.getElementById('refresh').addEventListener('click', loadMessages);

    document.getElementById('submit').addEventListener('click', onSubmit)

    loadMessages();
}

let authorInput = document.querySelector('[name="author"]');
let contentInput = document.querySelector('[name="content"]');
let list = document.getElementById('messages');


attachEvents();

async function onSubmit() {
    let author = authorInput.value;
    let content = contentInput.value;

    let result = await createMessage({ author, content });

    contentInput.value = '';
    list.value += '\n' + `${author}: ${content}`;

}

async function loadMessages() {

    let url = 'http://localhost:3030/jsonstore/messenger';

    let res = await fetch(url);
    let data = await res.json();

    let messages = Object.values(data);

    list.value = messages.map(m => `${m.author}: ${m.content}`).join('\n');
}

async function createMessage(message) {

    let url = 'http://localhost:3030/jsonstore/messenger';

    let options = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(message)
    };

    let res = await fetch(url, options);
    let result = await res.json();

    return result;
}


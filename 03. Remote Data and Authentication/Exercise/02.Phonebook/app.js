function attachEvents() {
    document.getElementById('btnLoad').addEventListener('click', loadContacts);
    document.getElementById('btnCreate').addEventListener('click', onCreate);

    list.addEventListener('click', onDelete);

    loadContacts();
}

let list = document.getElementById('phonebook');
let personInput = document.getElementById('person');
let phoneInput = document.getElementById('phone');

attachEvents();

async function onDelete(event){

    let id = event.target.dataset.id;
    if(id != undefined){
        await deleteContact(id);
        event.target.parentElement.remove();
    }
}

async function onCreate() {
    let person = personInput.value;
    let phone = phoneInput.value;

    let result = await createContact({ person, phone });

    list.appendChild(createItem(result));
}

async function loadContacts() {
    let res = await fetch('http://localhost:3030/jsonstore/phonebook');
    let data = await res.json();

    list.replaceChildren(...Object.values(data).map(createItem));
}

function createItem(contact) {
    let liElement = document.createElement('li');
    liElement.innerHTML = `${contact.person}: ${contact.phone} <button data-id="${contact._id}">Delete</button>`;
    return liElement;
}

async function createContact(contact) {
    let res = await fetch('http://localhost:3030/jsonstore/phonebook', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(contact)
    });
    let result = await res.json();

    return result;
}

async function deleteContact(id) {
    let res = await fetch('http://localhost:3030/jsonstore/phonebook' + id, {
        method: 'delete'
    });
    let result = await res.json();

    return result;
}
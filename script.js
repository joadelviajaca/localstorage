const form = document.getElementById('userForm');
const nameField = document.getElementById('name');
const emailField = document.getElementById('email');
const addressField = document.getElementById('address');
const list = document.getElementById('userList');
const editFormButton = form.getElementsByTagName('button')[0];
const users = JSON.parse(localStorage.getItem('users')) || [];
// Modificado para git
// let users = JSON.parse(localStorage.getItem('users'));
// if (!users){
//     users = [];
// }
console.log(users)
form.addEventListener('submit', addUser);
// Cambios en la rama 
users.forEach(student => {
    addUserToList(student.name, student.email, student.address);
});

function addUserToList(name, email, address) {
    const student = document.createElement('li');
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Borrar';
    deleteButton.addEventListener('click', deleteUser);
    const editButton = document.createElement('button');
    editButton.textContent = 'Editar';
    editButton.addEventListener('click', editUser);
    student.textContent = `Nombre: ${name} - Email: ${email} - Address: '${address}`;
    student.appendChild(deleteButton);
    student.appendChild(editButton);
    list.appendChild(student);
}

function addUser(event) {
    event.preventDefault();
    let name = nameField.value;
    let email = emailField.value;
    let address = addressField.value;

    
    if (name.length && email.length && address.length) {
        if(editFormButton.textContent === 'Editar usuario'){
            const editStudent = users.find( student => student.name = name );
            editStudent.name = name;
            editStudent.email = email;
            editStudent.address = address;
            const elements = Array.from(list.children);
            const studentLi = elements.find( element => element.textContent.contains(name));
            
        }
        else{

            addUserToList(name, email, address);
            users.push({ name, email, address });
        }
        localStorage.setItem('users', JSON.stringify(users));
    }
    else {
        alert('Todos los campos son obligatorios');
    }
}

function editUser(event){
    const textStudent = event.target.parentElement.textContent;
    const splitStudent = textStudent.split('-');
    const name = splitStudent[0].split(':')[1].trim();
    const email = splitStudent[1].split(':')[1].trim();
    const address = splitStudent[2].split(':')[1].replace('BorrarEditar', '')
    nameField.value = name;
    emailField.value = email;
    addressField.value = address;
    editFormButton.textContent = 'Editar usuario';
}


function deleteUser(event) {
    // const deleteButton = event.target;
    // console.log(deleteButton);
    // const student = deleteButton.parentElement;
    // console.log(student);
    const student = event.target.parentElement;
    list.removeChild(student);
}


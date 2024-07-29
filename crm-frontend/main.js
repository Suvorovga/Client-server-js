// Массив клиентов
let clientsArray = [];

// Параметры сортировки
let sortType = 'id';
let sortDir = true;

// Массив с возможными значениями типов контактов
const typeOfContactsArray = ['Телефон', 'Email', 'Facebook', 'VK', 'Другое'];

// Модальное окно при добавлении или изменении клиента (type = Добавить или Изменить)
function clientForm(obj, type = false) {
    // Создание элементов формы
    const $newClientContainerBackground = document.createElement('div');
    const $newClientContainer = document.createElement('div');
    const $newClientTitle = document.createElement('p');

    const $newClientSurNameContainer =  document.createElement('div');
    const $newClientSurName =  document.createElement('input');
    const $newClientSurNameError = document.createElement('p');

    const $newClientNameContainer =  document.createElement('div');
    const $newClientName =  document.createElement('input');
    const $newClientNameError = document.createElement('p');

    const $newClientLastName =  document.createElement('input');

    const $newClientContactContainer = document.createElement('div');

    const $addNewContact = document.createElement('button');
    const $addNewContactImage = document.createElement('div');
    const $addNewContactText = document.createElement('span');

    const $newClientButtonsContainer = document.createElement('div');
    const $newClientSave = document.createElement('button');
    const $newClientCancel = document.createElement('button');

    const $newClientClose = document.createElement('button');

    // Добавление классов для элементов формы
    $newClientContainerBackground.classList.add('newclient__container-background');
    $newClientContainer.classList.add('newclient__container');
    $newClientTitle.classList.add('newclient__title');
    $newClientSurNameContainer.classList.add('newclient__surname-container');
    $newClientSurName.classList.add('newclient__surname');
    $newClientSurNameError.classList.add('newclient__surname-error');
    $newClientNameContainer.classList.add('newclient__name-container');
    $newClientName.classList.add('newclient__name');
    $newClientNameError.classList.add('newclient__name-error');
    $newClientLastName.classList.add('newclient__lastname');
    $newClientContactContainer.classList.add('newclient__contact-container');
    $addNewContact.classList.add('newclient__new-contact-button');
    $addNewContactImage.classList.add('newclient__new-contact-image');
    $addNewContactText.classList.add('newclient__new-contact-text');
    $newClientButtonsContainer.classList.add('newclient__buttons-container');
    $newClientSave.classList.add('newclient__save-button');
    $newClientCancel.classList.add('newclient__cancel-button');
    $newClientClose.classList.add('newclient__close-button');

    // Добавление контента для элементов формы
    $addNewContactText.textContent = 'Добавить контакт';
    $newClientSurNameError.textContent = 'Введите фамилию';
    $newClientNameError.textContent = 'Введите имя';
    $newClientSave.textContent = 'Сохранить';

    // Создание DOM
    $newClientSurNameContainer.append($newClientSurName, $newClientSurNameError);
    $newClientNameContainer.append($newClientName, $newClientNameError);
    $addNewContact.append($addNewContactImage, $addNewContactText);
    $newClientButtonsContainer.append($newClientSave, $newClientCancel)
    $newClientContainer.append($newClientTitle, $newClientSurNameContainer, $newClientNameContainer, $newClientLastName,$newClientContactContainer, $addNewContact, $newClientButtonsContainer, $newClientClose);
    $newClientContainerBackground.append($newClientContainer)
    document.body.append($newClientContainerBackground);

    // Условия при добавлении нового клиента
    if(type === false) {
        $newClientTitle.textContent = 'Новый клиент';
        $newClientSurName.placeholder = 'Фамилия*';
        $newClientName.placeholder = 'Имя*';
        $newClientLastName.placeholder = 'Отчество';
        $newClientCancel.textContent = 'Отмена';
    }

    // Условия при изменении клиента
    if(type === true) {
        const $newClientSurNameTitle = document.createElement('span');
        const $newClientNameTitle = document.createElement('span');
        const $newClientLastNameTitle = document.createElement('span');

        $newClientSurNameTitle.textContent = 'Фамилия*';
        $newClientNameTitle.textContent = 'Имя*';
        $newClientLastNameTitle.textContent = 'Отчество';
        $newClientTitle.textContent = 'Изменить данные';
        $newClientCancel.textContent = 'Удалить';

        $newClientSurNameTitle.classList.add('newclient__surname-title');
        $newClientNameTitle.classList.add('newclient__name-title');
        $newClientLastNameTitle.classList.add('newclient__lastname-title');

        $newClientSurName.before($newClientSurNameTitle);
        $newClientName.before($newClientNameTitle);
        $newClientLastName.before($newClientLastNameTitle);

        $newClientSurName.value = obj.surname;
        $newClientName.value = obj.name;
        $newClientLastName.value = obj.lastName;

        for (item of obj.contacts) {
            let newTypeOfContactsArray = [...typeOfContactsArray];

            for (i in newTypeOfContactsArray) {
                let empty = null;
                if (newTypeOfContactsArray[i] == item.type) {
                    empty = newTypeOfContactsArray[i];
                    newTypeOfContactsArray[i] = newTypeOfContactsArray[0];
                    newTypeOfContactsArray[0] = newTypeOfContactsArray[i];
                }
            }

            const addNewContact = addNewClientContact(newTypeOfContactsArray);
            addNewContact.$typeOfContactText.textContent = `${item.type}`;
            addNewContact.$contactInput.value = `${item.value}`;
            $newClientContactContainer.append(addNewContact.$contactContainer);
        }
    }

    // Закрытие формы добавления нового клиента
    $newClientClose.addEventListener('click', () => {
        $newClientContainerBackground.remove();
        $newClientContainer.remove();
    })

    $newClientCancel.addEventListener('click', () => {
        if (type === false) {
            $newClientContainerBackground.remove();
            $newClientContainer.remove();
        } else {
            $newClientContainer.remove();
            $newClientContainerBackground.remove();
            deleteClient(obj);
        }

    })

    if ($newClientContainerBackground) {
		document.addEventListener("keydown", (e) => {
        	if (e.code == "Escape") {
				    $newClientContainerBackground.remove();
				    $newClientContainer.remove();
        	}
      	})
    }

    $newClientContainerBackground.addEventListener('click', e => {
        const withinBoundaries = e.composedPath().includes($newClientContainer);

        if ( !withinBoundaries ) {
            $newClientContainerBackground.remove();
            $newClientContainer.remove();
        }
    })

    // Добавление нового контакта клиента при нажатии на кнопку "Добавить контакт"
    $addNewContact.addEventListener('click', () => {

        // Удаление кнопки добавления нового клиента при количестве контактов 10 шт
        const chosenContact = document.querySelectorAll('.contact-container');
        if (chosenContact.length >= 9) {
            $addNewContact.style.display = 'none';
        }

        const addNewContact = addNewClientContact(typeOfContactsArray);
        $newClientContactContainer.append(addNewContact.$contactContainer);

        // Удаление контакта клиента
        addNewContact.$contactDeleteButton.addEventListener('click', () => {
            $addNewContact.style.display = 'inline-flex';
        })

    })

    // Нажатие на кнопку сохранить
    $newClientSave.addEventListener('click', async function() {
        // Валидация
        if ($newClientName.value.trim() == '') {
            $newClientNameError.style.display = 'block';
        } else {
            $newClientNameError.style.display = 'none';
        }

        if ($newClientSurName.value.trim() == '') {
            $newClientSurNameError.style.display = 'block';
        } else {
            $newClientSurNameError.style.display = 'none';
        }

        if ($newClientSurName.value.trim() !== '' && $newClientName.value.trim() !== '') {
            // Создание массива выбранных контактов клиента
            const contactsArray = [];
            const chosenContacts = document.querySelectorAll('.contact-container');

            for (item of chosenContacts) {
                const chosenContactsType = item.querySelector('.type-of-contact-text').textContent;
                const chosenContactsValue = item.querySelector('.contact-input').value;

                if (chosenContactsValue.trim() !== '') {
                    const contactInfo = {
                        type: `${chosenContactsType}`,
                        value: `${chosenContactsValue}`,
                    }

                    contactsArray.push(contactInfo);
                }
            }

            // Добавление информации о клиенте на сервер
            if (type === false) {
                const response = await fetch('http://localhost:3000/api/clients', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      name: `${$newClientName.value}`,
                      surname: `${$newClientSurName.value}`,
                      lastName: `${$newClientLastName.value}`,
                      contacts: [...contactsArray],
                    })
                });

                if (response.status == 200 || 201) {
                    $newClientContainerBackground.remove();
                    $newClientContainer.remove();
                    renderTableClients();
                }
            }

            if (type === true) {
                const response = await fetch(`http://localhost:3000/api/clients/${obj.id}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      name: `${$newClientName.value}`,
                      surname: `${$newClientSurName.value}`,
                      lastName: `${$newClientLastName.value}`,
                      contacts: [...contactsArray],
                    })
                });

                if (response.status == 200 || 201) {
                    $newClientContainerBackground.remove();
                    $newClientContainer.remove();
                    renderTableClients();
                }
            }
        }
    })
}

// Всплывающая форма с удалением клента
function deleteClient(obj) {
    // Создание элементов формы
    const $deleteClientContainerBackground = document.createElement('div');
    const $deleteClientContainer = document.createElement('div');
    const $deleteClientTitle = document.createElement('p');
    const $deleteClientText = document.createElement('p');

    const $deleteClientButtonsContainer = document.createElement('div');
    const $deleteClientSave = document.createElement('button');
    const $deleteClientCancel = document.createElement('button');

    // Добавление классов
    $deleteClientContainerBackground.classList.add('newclient__container-background');
    $deleteClientContainer.classList.add('newclient__container', 'deleteclient__container');
    $deleteClientTitle.classList.add('deleteclient__title');
    $deleteClientText.classList.add('deleteclient__text');
    $deleteClientButtonsContainer.classList.add('newclient__buttons-container');
    $deleteClientSave.classList.add('newclient__save-button');
    $deleteClientCancel.classList.add('newclient__cancel-button');

    // Контент
    $deleteClientTitle.textContent = 'Удалить клиента';
    $deleteClientText.textContent = 'Вы действительно хотите удалить данного клиента?';
    $deleteClientSave.textContent = 'Удалить';
    $deleteClientCancel.textContent = 'Отмена';

    // Создание DOM
    $deleteClientButtonsContainer.append($deleteClientSave, $deleteClientCancel);
    $deleteClientContainer.append($deleteClientTitle, $deleteClientText, $deleteClientButtonsContainer);
    $deleteClientContainerBackground.append($deleteClientContainer);
    document.body.append($deleteClientContainerBackground);

    // Нажатие кнопки "Отмена"
    $deleteClientCancel.addEventListener('click', () => {
        $deleteClientContainerBackground.remove();
        $deleteClientContainer.remove();
    })

    // Нажатие кнопки "Удалить"
    $deleteClientSave.addEventListener('click', async function() {
        const response = await fetch(`http://localhost:3000/api/clients/${obj.id}`, {
            method: 'DELETE',
          });

        if (response.status == 200 || 201) {
            $deleteClientContainerBackground.remove();
            $deleteClientContainer.remove();
            renderTableClients()
        }
    })

}

// Функция добавления нового контакта клиента для всплывающей формы
function addNewClientContact(array) {
    // Создание элементов при добавлении контакта клиента
    const $contactContainer = document.createElement('div');

    const $typeOfContactContainer = document.createElement('div');
    const $typeOfContactText = document.createElement('span');
    const $typeOfContactImage = document.createElement('span');
    const $typesOfContacts = document.createElement('div');

    const $contactInput = document.createElement('input');

    const $contactDeleteButton = document.createElement('button');

    // Добавление классов для контакта клиента
    $contactContainer.classList.add('contact-container');

    $typeOfContactContainer.classList.add('type-of-contact-container');
    $typeOfContactText.classList.add('type-of-contact-text');
    $typeOfContactImage.classList.add('type-of-contact-image');
    $typesOfContacts.classList.add('types-of-contacts');

    $contactInput.classList.add('contact-input');

    $contactDeleteButton.classList.add('contact-delete-button');

    // Выбранное значение типа контактов по умолчанию при добавлении контакта клиента
    $typeOfContactText.textContent = array[0];
    $contactInput.type = 'tel';
    $contactInput.placeholder = '+7(123)123-45-67';

    // Выпадающий список типов контактов на основе массива возможных значений
    for (i = 1; i < array.length; i++) {
        const $typeOfContacts = document.createElement('span');
        $typeOfContacts.textContent = array[i];
        $typesOfContacts.append($typeOfContacts);

        // Выбор одного из элементов выпадающего списка
        $typeOfContacts.addEventListener('click', () => {
            let empty = null;
            empty = $typeOfContactText.textContent;
            $typeOfContactText.textContent = $typeOfContacts.textContent;
            $typeOfContacts.textContent = empty;

                // Тип инпута в завсимости от типа контакта
            switch ($typeOfContactText.textContent) {
                case 'Телефон':
                    $contactInput.type = 'tel';
                    $contactInput.placeholder = '+7(123)123-45-67';
                    break;
                case 'Email':
                    $contactInput.type = 'email';
                    $contactInput.placeholder = 'abc@xyz.com';
                    break;
                default:
                    $contactInput.type = 'text';
                    $contactInput.placeholder = '';
            }
        })

    }

    // Открытие выпадающего списка типов контактов
    $typeOfContactContainer.addEventListener('click', () => {
        $typesOfContacts.classList.toggle('active');
        $typeOfContactImage.classList.toggle('active');
    })

    // Создание DOM
    $typeOfContactContainer.append($typeOfContactText, $typeOfContactImage, $typesOfContacts);
    $contactContainer.append($typeOfContactContainer, $contactInput, $contactDeleteButton);

     // Удаление контакта клиента
     $contactDeleteButton.addEventListener('click', () => {
        $contactContainer.remove();
    })

    return {
        $contactContainer,
        $typeOfContactText,
        $contactInput,
        $contactDeleteButton,
    }
}

// Функция создания одного клиента
function createClient(obj) {
    // Создание элементов
    const $clientTr = document.createElement('tr');
    const $clientIdTd = document.createElement('td');
    const $clientFioTd = document.createElement('td');
    const $clientAddTd = document.createElement('td');
    const $clientChangeTd = document.createElement('td');
    const $clientContactsTd = document.createElement('td');
    const $clientChangeButtonTd = document.createElement('td');
    const $clientRemoveButtonTd = document.createElement('td');


    const $clientId = document.createElement('span');
    const $clientFio = document.createElement('span');
    const $clientAddDate = document.createElement('span');
    const $clientAddTime = document.createElement('span');
    const $clientChangeDate = document.createElement('span');
    const $clientChangeTime = document.createElement('span');
    const $clientContacts = document.createElement('div');

    const $clientChange = document.createElement('button');
    const $clientChangeImage = document.createElement('span');
    const $clientChangeText = document.createElement('span');

    const $clientRemove = document.createElement('button');
    const $clientRemoveImage = document.createElement('span');
    const $clientRemoveText = document.createElement('span');

    const $tableBody = document.querySelector('.crm-table__body');

    // Добавление классов
    $clientContacts.classList.add('client-contacts-container');
    $clientContactsTd.classList.add('client-contacts-td');

    $clientChange.classList.add('client-change-container');
    $clientChangeImage.classList.add('client-change-image');
    $clientChangeText.classList.add('client-change-text');

    $clientRemove.classList.add('client-remove-container');
    $clientRemoveImage.classList.add('client-remove-image');
    $clientRemoveText.classList.add('client-remove-text');

    $clientAddDate.classList.add('client-add-date');
    $clientAddTime.classList.add('client-add-time');
    $clientChangeDate.classList.add('client-change-date');
    $clientChangeTime.classList.add('client-change-time');


    // Создание DOM
    $clientIdTd.append($clientId);
    $clientFioTd.append($clientFio);
    $clientAddTd.append($clientAddDate, $clientAddTime);
    $clientChangeTd.append($clientChangeDate, $clientChangeTime);
    $clientContactsTd.append($clientContacts);
    $clientChange.append($clientChangeImage, $clientChangeText);
    $clientChangeButtonTd.append($clientChange);
    $clientRemove.append($clientRemoveImage, $clientRemoveText);
    $clientRemoveButtonTd.append($clientRemove);
    $clientTr.append($clientIdTd, $clientFioTd, $clientAddTd, $clientChangeTd, $clientContactsTd, $clientChangeButtonTd, $clientRemoveButtonTd);

    $tableBody.append($clientTr);

    // Контент
    $clientId.textContent = `${obj.id}`;
    $clientFio.textContent = `${obj.surname} ${obj.name} ${obj.lastName}`;
    $clientAddDate.textContent = `${obj.addDate}`;
    $clientAddTime.textContent = `${obj.addTime}`;
    $clientChangeDate.textContent = `${obj.changeDate}`;
    $clientChangeTime.textContent = `${obj.changeTime}`;
    $clientChangeText.textContent = `Изменить`;
    $clientRemoveText.textContent = `Удалить`;

    // Рендер контактов клиента (появление кнопки, если контактов больше 4)
    const contactsLength = obj.contacts.length;
    if (contactsLength > 4) {
        const $buttonMoreContacts = document.createElement('div');
        $buttonMoreContacts.classList.add('button-more-contacts');
        $buttonMoreContacts.textContent = `+${contactsLength - 4}`;

        for (i = 0; i < 4; i++) {
            createContact(obj.contacts[i], $clientContacts);
        }

        $clientContacts.append($buttonMoreContacts);

        $buttonMoreContacts.addEventListener('click', () => {
            $buttonMoreContacts.remove();
            for (i = 4; i < contactsLength; i++) {
                createContact(obj.contacts[i], $clientContacts);
            }
        })
    } else {
        for (contact of obj.contacts) {
            createContact(contact, $clientContacts);
        }
    }

    // Нажатие на кнопку "Изменить"
    $clientChange.addEventListener('click', () => {
        clientForm(obj, true);
    })

    // Нажатие на кнопку "Изменить"
    $clientRemove.addEventListener('click', () => {
        deleteClient(obj);
    })
}

// Функция создания иконки контакта в таблице
function createContact(contact, clientContacts) {
    const $contactContainer = document.createElement('div');
        const $contactText = document.createElement('div');
        const $contactType = document.createElement('span');
        const $contactlink = document.createElement('a');

        $contactContainer.classList.add('contact-container-image');
        $contactText.classList.add('contact-container-text');

        $contactText.append($contactType, $contactlink)
        $contactContainer.append($contactText);
        clientContacts.append($contactContainer);

        $contactType.textContent = `${contact.type}: `;
        $contactlink.textContent = `${contact.value}`;

        switch (contact.type) {
            case 'Телефон':
            $contactContainer.classList.add('tel');
            $contactlink.href = `tel:${contact.value}`;
            break;
            case 'Email':
            $contactContainer.classList.add('mail');
            $contactlink.href = `mailto:${contact.value}`;
            break;
            case 'Facebook':
            $contactContainer.classList.add('facebook');
            $contactlink.href = `${contact.value}`;
            break;
            case 'VK':
            $contactContainer.classList.add('vk');
            $contactlink.href = `${contact.value}`;
            break;
            case 'Другое':
            $contactContainer.classList.add('other');
            break;
        }

        return $contactContainer
}

// Создание таблицы клиентов
async function renderTableClients(array) {
    document.querySelector('.crm-table__body').innerHTML = '';
    const filterValue = document.querySelector('.crm-header__search');

     const response = await fetch(`http://localhost:3000/api/clients/?search=${filterValue.value.trim()}`, {
        method: 'GET',
    });
    const data = await response.json();
    // array = [...data];

    // Подготовка
    array = data.map(obj => {
        return {
            ...obj,
            fioSort: `${obj.surname}${obj.name}${obj.lastName}`.toLowerCase(),
            addDate: `${obj.createdAt.substr(8, 2)}.${obj.createdAt.substr(5, 2)}.${obj.createdAt.substr(0, 4)}`,
            addTime: `${obj.createdAt.substr(11, 5)}`,
            changeDate: `${obj.updatedAt.substr(8, 2)}.${obj.updatedAt.substr(5, 2)}.${obj.updatedAt.substr(0, 4)}`,
            changeTime: `${obj.updatedAt.substr(11, 5)}`,
      	}
    })

    // for (obj of array) {
    //     obj.fioSort = `${obj.surname}${obj.name}${obj.lastName}`.toLowerCase();
    //     obj.addDate = `${obj.createdAt.substr(8, 2)}.${obj.createdAt.substr(5, 2)}.${obj.createdAt.substr(0, 4)}`;
    //     obj.addTime = `${obj.createdAt.substr(11, 5)}`;
    //     obj.changeDate = `${obj.updatedAt.substr(8, 2)}.${obj.updatedAt.substr(5, 2)}.${obj.updatedAt.substr(0, 4)}`;
    //     obj.changeTime = `${obj.updatedAt.substr(11, 5)}`;
    // }

    // Сортировка
    array = array.sort(function(a, b) {
        let sort = a[sortType] < b[sortType];
        if (sortDir == false) sort = a[sortType] > b[sortType];
        if (sort) return -1;
    })

    // Отрисовка
    for (client of array) {
        createClient(client);
    }

}

// Нажатие на кнопку "Добавить нового клиента"
document.querySelector('.add-client-button').addEventListener('click', () => {
    clientForm();
});

// Отрисовка таблицы при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    renderTableClients(clientsArray);
})

// Нажатие на поля таблицы для сортировки
document.querySelector('.crm-table__head__id').addEventListener('click', (e) => {
    const svg = document.querySelector('.crm-table__head__id svg');
    sortType = 'id';
    renderTableClients(clientsArray);
    sortDir == false ? svg.classList.remove('rotate') : svg.classList.add('rotate');
    sortDir = !sortDir;
});

document.querySelector('.crm-table__head__fio').addEventListener('click', (e) => {
    const svg = document.querySelector('.crm-table__head__fio svg');
    sortType = 'fioSort';
    renderTableClients(clientsArray);
    sortDir == true ? svg.classList.add('rotate') : svg.classList.remove('rotate');
    sortDir = !sortDir;
});

document.querySelector('.crm-table__head__create-date').addEventListener('click', (e) => {
    const svg = document.querySelector('.crm-table__head__create-date svg');
    sortType = 'createdAt';
    renderTableClients(clientsArray);
    sortDir == true ? svg.classList.remove('rotate') : svg.classList.add('rotate');
    sortDir = !sortDir;
});

document.querySelector('.crm-table__head__last-change').addEventListener('click', (e) => {
    const svg = document.querySelector('.crm-table__head__last-change svg');
    sortType = 'updatedAt';
    renderTableClients(clientsArray);
    sortDir == true ? svg.classList.remove('rotate') : svg.classList.add('rotate');
    sortDir = !sortDir;
});


// Фильтрация
let delay = null;

document.querySelector('.crm-header__search').addEventListener('input', () => {

    clearTimeout(delay)
    delay = setTimeout(function() {
        renderTableClients(clientsArray);
    },
        1000
    );
})

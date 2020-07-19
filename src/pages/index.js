import '../pages/index.css';
import Card from '../scripts/components/Card.js';
import Section from '../scripts/components/Section.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import Api from '../scripts/components/Api.js';
import PopupDeleteConfirm from '../scripts/components/PopupDeleteConfirm.js';
import {popUp,
    nameInput, 
    jobInput, 
    cardBtn, 
    editAvatar} from '../scripts/utils/constants.js';
import FormValidator from '../scripts/components/FormValidator';
import UserInfo from '../scripts/components/UserInfo';
import { data } from 'autoprefixer';

// переменная хранит данные о пользователе
let profileInfo;

// создаём экземпляр класса UserINfo
const userInfo = new UserInfo({name: '.profile__name', job: '.profile__about', avatar: '.profile__img'});

// создаем экземпляр класса API
const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-12',
    headers: {
      authorization: '627f7bad-0dfb-4267-9517-9e8391316bf9',
      'Content-Type': 'application/json'
    }
});

// создаем экземпляр попапа для редактировать профиль
const profilePopup = new PopupWithForm('.popup', (formData) => {
    profilePopup.setLoadingButtonText();
    //Записываем данные на страницу
    api.setUserInfo(formData) // отправляем данные о профиле на сервер
        .then(data => userInfo.setUserInfo(data))
        .then(() => profilePopup.close())
        .catch((err) => {
            profilePopup.setDefaultButtonText();
            console.log(err)
        }) 
});
profilePopup.setEventListeners();

// создаём экземпляр попапа для редактирования аватара
const avatarPopup = new PopupWithForm('.popup__avatar', (formData) => {
    avatarPopup.setLoadingButtonText();
    api.setUserAvatar(formData)
        .then((data) => {
            userInfo.setUserAvatar(data);
        })
        .then(() => avatarPopup.close())
        .catch((err) => {
            avatarPopup.setDefaultButtonText();
            console.log(err)
        })
});

avatarPopup.setEventListeners();
// ставим слушатель на редактирование аватара
editAvatar.addEventListener('click', () => {
    editAvatarValidation.formErrorsReset();
    avatarPopup.setDefaultButtonText();
    avatarPopup.open();
})

// создаём экземпляр класса попапа удаления карточки
const deleteCardPopup = new PopupDeleteConfirm('.popup_delete', (item, card) => {
    api.deleteCard(item._id)
    .then(() => {
    card.cardDelete();
    })
    .then(() => deleteCardPopup.close())
    .catch(err => console.log(err))
});
 deleteCardPopup.setEventListeners();

//создаём экземпляр класса Section для отрисовки элементов.
const sectionRender= new Section({
    //запускаем функцию создния карточки 
    renderer: (item) => {
    //создаём экземпляр класса Card с данными из формы   
    const card = new Card(item,
        () => imagePopup.open(item),
        '#template',
        () => api.putLike(item._id),
        () => api.deleteLike(item._id),
        () => {
            deleteCardPopup.setCard(item, card);
            deleteCardPopup.open();
        },
        profileInfo);
    //Вставляем карточку в контейнер
    sectionRender.addItem(card.generateCard());
}}, '.elements');

// Ловим клик по кнопке редактирования профиля   
popUp.addEventListener('click', () => {
    profilePopup.setDefaultButtonText();
    //очищаем ошибки валидации в форме
    profileValidation.formErrorsReset();
    //записываем данные в форму попапа
    const data = userInfo.getUserInfo();
    nameInput.value = data.name;
    jobInput.value = data.job;
    //открываем попап
    profilePopup.open();
}); 

// создаём экземпляр класса попапа с картинкой
const imagePopup = new PopupWithImage('.popup_image');
imagePopup.setEventListeners();

// создаём экземпляр попапа для добавленя картоки
const addCardPopup = new PopupWithForm('.popup_card', (formData) => {
    // получаем данные через API и отрисовываем карточку
    addCardPopup.setLoadingButtonText();
    api.postNewCard(formData)
        .then((data) => sectionRender.renderItems([data]))
        .then (() => addCardPopup.close())
        .catch((err) => {
            addCardPopup.setDefaultButtonText();
            console.log(err)
        });
        
});
addCardPopup.setEventListeners();

// ловим клик по кнопке добавления карточки
cardBtn.addEventListener('click', () => {
    addCardPopup.setDefaultButtonText();
    //очищаем ошибки в форме
    addCardValidation.formErrorsReset();
    //открываем попап
    addCardPopup.open();
});

// создаем экземпляры класса для валидации и вызываем методы для запуска валидации на формах.
const profileValidation = new FormValidator({              // создаем экземпляр клааса с валидацией
    formSelector: '#profile-form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
});
profileValidation.enableValidation();

const addCardValidation = new FormValidator({              // создаем экземпляр клааса с валидацией
    formSelector: '#card-form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
});
addCardValidation.enableValidation();

const editAvatarValidation = new FormValidator({              // создаем экземпляр клааса с валидацией
    formSelector: '.popup__avatar',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
});
editAvatarValidation.enableValidation();


////
Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then((value) => {
        profileInfo = value[0];
        userInfo.setUserInfo(value[0]);
        userInfo.setUserAvatar(value[0]);
        sectionRender.renderItems(value[1]);
    })
    .catch(err => console.log(err));
    
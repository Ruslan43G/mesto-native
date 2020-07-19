const profilePopup = document.querySelector('#profile-form'); // выбираем попап редактирования профиля
const popUp = document.querySelector('.profile__edit-btn'); // выбираем кнопку редактировать в профиле
const name = document.querySelector('.profile__name'); // выбираем имя в профиле
const job = document.querySelector('.profile__about'); // выбираем о себе в профиле
const nameInput = document.querySelector('#profile-input-name'); // выбираем форму ввода имени в попапе редактирования профиля
const jobInput = document.querySelector('#profile-input-about'); // выбираем форму ввода о себе в попапе реадктирования профиля
const formElement = document.querySelector('#profile-form'); // Находим форму редактирования профиля в DOM
const cardBtn = document.querySelector('.profile__add-btn'); // находим в DOM кнопку добавления карточки.
const formCardElement = document.querySelector('#card-form'); // Находим в DOM форму попапа карточки.
const popupImage = document.querySelector('.popup_image'); // попап с картинкой
const formInput = Array.from(document.querySelectorAll('.popup__input')); // создаем массив инпутов 
const errorSpan = Array.from(document.querySelectorAll('.popup__error')); // создаём массив спанов с ошибкой
const forms = Array.from(document.querySelectorAll('.popup__container')); // массив форм
const editAvatar = document.querySelector('.profile__img-hover');
// Массив с данными для карточки при загрузке.
const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

export {profilePopup, popUp, name, job, nameInput, jobInput, formElement, cardBtn, formCardElement, popupImage, formInput, errorSpan, forms, initialCards, editAvatar};
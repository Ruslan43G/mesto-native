import React from 'react';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import api from '../utils/Api.js';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
//основной компонент. Содержит секцию с профилем и карточками.
export default function Main (props) {
    //переменные состояния
    const [cards, setCards] = React.useState([]); //массив картчоек
    //подписка на контекст юзера
    const user = React.useContext(CurrentUserContext);
    // хук при монтировании компонента
    React.useEffect(() => {
        //ждём ответа от 2х запросов api (инфа о пользователе и массив карточек)
        api.getInitialCards()
        .then((value) => {
            setCards(value.map(item => (             //отрисовываем карточки
                <Card key={item._id} card={item} onClick={props.onCardClick} />
            )));
        })
        .catch(err => console.log(err));               //вывод в консоль на случай ошибки
    }, [])
    //Отрисовка компонента
    return (
        <> 
            <section className="profile">
                <img className="profile__img" src={user.avatar} alt="автар пользователя"/>
                <div className="profile__img-hover" onClick={props.onEditAvatar}></div>
                <div className="profile__info">
                    <h1 className="profile__name">{user.name}</h1>
                    <button className="profile__edit-btn" onClick={props.onEditProfile} type="button"></button>
                    <p className="profile__about">{user.about}</p>
                </div>
                <button className="profile__add-btn" onClick={props.onAddPlace} type="button"></button>
            </section>
            <main className="elements">
                {cards}
            </main>
            <PopupWithForm name='popup_profile' handler={props.onEditProfile} title='Редактировать профиль' children={
                    <>
                        <input className="popup__input" id="profile-input-name" name="name" type="text" placeholder="Имя" minLength="2" maxLength="40" pattern="^[А-Яа-яЁёA-Za-z\s-]+$" required />
                        <span className="popup__error" id="profile-input-name-error"></span>
                        <input className="popup__input" id="profile-input-about" name="job" type="text" placeholder="О себе" minLength="2" maxLength="200" required />
                        <span className="popup__error" id="profile-input-about-error"></span>
                    </>
                    } isOpen={props.profileIsOpenen}
                    onClose={props.onClose}/>
            <PopupWithForm name='popup_card' handler={props.onAddPlace} title='Новое место' children={
                <>
                    <input className="popup__input" id="card-name-input" name="name" type="text" placeholder="Название" minLength="1" maxLength="30" required />
                    <span className="popup__error" id="card-name-input-error"></span>
                    <input className="popup__input" id="card-url-input" name="link" type="url" placeholder="Ссылка на картинку"  required />
                    <span className="popup__error" id="card-url-input-error"></span>
                </>
            } isOpen={props.addCardIsOpen}
            onClose={props.onClose}/>
            <PopupWithForm name='popup_avatar' handler={props.onEditAvatar} title='Обновить аватар' children={
                <>
                    <input className="popup__input" id="avatar-url-input" name="avatar" type="url" placeholder="Введите url" required />
                    <span className="popup__error" id="avatar-url-input-error"></span>
                </>
            } isOpen={props.avatarIsOpen}
            onClose={props.onClose}/>
            <ImagePopup card={props.card} onClose={props.onClose}/>
        </>
    )
}


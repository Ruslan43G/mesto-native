import React from 'react';
import api from '../utils/Api.js';
import Card from './Card.js';
//основной компонент. Содержит секцию с профилем и карточками.
export default function Main (props) {
    //переменные состояния
    const [userName, setUserName] = React.useState(''); // имя пользователя
    const [userDescription, setUserDescription] = React.useState(''); //описание пользователя
    const [userAvatar, setUserAvatar] = React.useState(''); // Аватар
    const [cards, setCards] = React.useState([]); //массив картчоек
    // хук при монтировании компонента
    React.useEffect(() => {
        //ждём ответа от 2х запросов api (инфа о пользователе и массив карточек)
        Promise.all([api.getUserInfo(), api.getInitialCards()])
            .then(([userData, initialCards]) => {
                setUserName(userData.name);                 //устанавливаем имя
                setUserDescription(userData.about);         //устанавливаем описание
                setUserAvatar(userData.avatar);             //устанавливаем аватар
                setCards([...initialCards]);                //записываем массив карточек в стейт переменную
            })
            .catch(err => console.log(err));               //вывод в консоль на случай ошибки
            
    }, [])
    //Отрисовка компонента
    return (
        <> 
            <section className="profile">
                <img className="profile__img" src={userAvatar} alt="автар пользователя"/>
                <div className="profile__img-hover" onClick={props.onEditAvatar}></div>
                <div className="profile__info">
                    <h1 className="profile__name">{userName}</h1>
                    <button className="profile__edit-btn" onClick={props.onEditProfile} type="button"></button>
                    <p className="profile__about">{userDescription}</p>
                </div>
                <button className="profile__add-btn" onClick={props.onAddPlace} type="button"></button>
            </section>
            <main className="elements">
                {cards.map(item => <Card key={item._id} card={item} onDeleteClick={props.onDeleteClick} onClick={props.onCardClick} />)}
            </main>
        </>
    )
}


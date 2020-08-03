import React from 'react';
import api from '../utils/Api.js';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
//основной компонент. Содержит секцию с профилем и карточками.
export default function Main (props) {
    //переменные состояния
    const [cards, setCards] = React.useState([]); //массив картчоек
    //подписка на контекст юзера
    const user = React.useContext(CurrentUserContext);
    //функция снять поставить лайк
    function handleCardLike(card) {
        const isLiked = card.likes.some(item => item._id === user._id);
        api.handleLike(card._id, isLiked)
            .then((newCard) => {
                const newCards = cards.map(item => item._id === card._id ? newCard : item);
                setCards(newCards);
            })
            .catch(err => console.log(err));    
    }
    //функция уалить карточку
    function handleCardDelete (card) {
        api.deleteCard(card._id)
            .then(() => {
                const newCards = cards.filter(item => item._id !== card._id);
                setCards(newCards);
            })
            .catch(err => console.log(err))
    }
    // хук при монтировании компонента
    React.useEffect(() => {
        //ждём ответа от 2х запросов api (инфа о пользователе и массив карточек)
        api.getInitialCards()
            .then((value) => {
                setCards([...value]);
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
                {cards.map(item => <Card key={item._id} card={item} onTrashClick={handleCardDelete} onLikeClick={handleCardLike} onDeleteClick={props.onDeleteClick} onClick={props.onCardClick} />)}
            </main>
        </>
    )
}


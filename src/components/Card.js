import React from 'react';
//компонент карточки
export default function Card (props) {                                                                       // создаём класс для карточки
    //хэндлер клика по картинке для открытия попапа
    function handleClick() {
        props.onClick(props.card)
    }
    // отрисовка компонента
    return (
        <div className="elements__item" data-owner="">
            <img className="elements__img" onClick={handleClick} src={props.card.link} alt={props.card.name} />
            <button className="elements__trash" type="button"></button>
            <h3 className="elements__title">{props.card.name}</h3>
            <button className="elements__like" type="button"></button>
            <p className="elements__like-counter">{props.card.likes.length}</p>
        </div>
    )

}
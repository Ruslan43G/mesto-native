import React from 'react';

export default function PopupWithForm (props) {
    return (
        <section className={props.isOpen ? `popup ${props.name} popup_opened` : `popup ${props.name}`}>
            <form className='popup__container' id="profile-form" noValidate>
                <button className="popup__icon-close" onClick={props.onClose} type="button"></button>
                <h3 className="popup__title popup__title_form">{props.title}</h3>
                {props.children}
                <button className="popup__button popup__button_form" id="profile-save-button" onClick={props.handler} type="submit" aria-label="Сохранить">Сохранить</button>
            </form>
        </section>
    )
}
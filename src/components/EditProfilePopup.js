import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

export default function EitProfilePopup (props) {
    const user = React.useContext(CurrentUserContext);
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    React.useEffect(() => {
        setName(user.name);
        setDescription(user.about)
    }, [user])

    function handleNameInput(evt) {
        setName(evt.target.value)
    }

    function handleAboutInput(evt) {
        setDescription(evt.target.value)
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        props.onSubmit({
            name: name,
            about: description
        })
    }

    return (
        <section className={props.isOpen ? `popup popup_profile popup_opened` : `popup popup_profile`}>
            <form className='popup__container' onSubmit={handleSubmit} id="profile-form" noValidate>
                <button className="popup__icon-close" onClick={props.onClose} type="button"></button>
                <h3 className="popup__title popup__title_form">Редактировать профиль</h3>
                <input className="popup__input" value={name} onChange={handleNameInput} id="profile-input-name" name="name" type="text" placeholder="Имя" minLength="2" maxLength="40" pattern="^[А-Яа-яЁёA-Za-z\s-]+$" required />
                <span className="popup__error" id="profile-input-name-error"></span>
                <input className="popup__input" value={description} onChange={handleAboutInput} id="profile-input-about" name="job" type="text" placeholder="О себе" minLength="2" maxLength="200" required />
                <span className="popup__error" id="profile-input-about-error"></span>
                <button className="popup__button popup__button_form" id="profile-save-button" type="submit" aria-label="Сохранить">Сохранить</button>
            </form>
        </section>
    )
}
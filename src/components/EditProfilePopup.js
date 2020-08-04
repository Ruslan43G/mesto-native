import React from 'react';
import PopupWithForm from './PopupWithForm.js';
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
        <PopupWithForm name='popup_profile' buttonText='Сохранить' onSubmit={handleSubmit} title='Редактировать профиль' isOpen={props.isOpen} onClose={props.onClose} isLoading={props.isLoading}>
            <>
                <input value={name} onChange={handleNameInput} className="popup__input" id="profile-input-name" name="name" type="text" placeholder="Имя" minLength="2" maxLength="40" pattern="^[А-Яа-яЁёA-Za-z\s-]+$" required />
                <span className="popup__error" id="profile-input-name-error"></span>
                <input value={description} onChange={handleAboutInput} className="popup__input" id="profile-input-about" name="job" type="text" placeholder="О себе" minLength="2" maxLength="200" required />
                <span className="popup__error" id="profile-input-about-error"></span>
            </>
        </ PopupWithForm>
    )
}
import React from 'react';
import PopupWithForm from './PopupWithForm';

export default function AddPlacePopup (props) {
    const [newCard, setNewCard] = React.useState({name: '', link: ''});

    function handleNameinput(evt) {
        setNewCard({...newCard, name: evt.target.value})
    }

    function handleLinkInput(evt) {
        setNewCard({...newCard, link: evt.target.value})
    }

    function handleOnSubmit(evt) {
        evt.preventDefault();
        props.onSubmit(newCard);
        setNewCard({name: '', link: ''});
    }

    return (
        <PopupWithForm name='popup_card' buttonText='Создать' onSubmit={handleOnSubmit} title='Новое место' isOpen={props.isOpen} onClose={props.onClose} isLoading={props.isLoading}>
            <>
                <input className="popup__input" onChange={handleNameinput} id="card-name-input" name="name" type="text" placeholder="Название" minLength="1" maxLength="30" required />
                <span className="popup__error" id="card-name-input-error"></span>
                <input className="popup__input" onChange={handleLinkInput} id="card-url-input" name="link" type="url" placeholder="Ссылка на картинку"  required />
                <span className="popup__error" id="card-url-input-error"></span>
            </>
        </PopupWithForm>
    )
}
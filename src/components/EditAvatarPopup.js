import React from 'react';
import PopupWithForm from './PopupWithForm';

export default function EditAvatarPopup (props) {
    const avatarRef = React.useRef();

    function handleSubmit (evt) {
        evt.preventDefault();
        props.onSubmit({avatar: avatarRef.current.value});
    }

    return (
        <PopupWithForm name='popup_avatar' buttonText='Сохранить' onSubmit={handleSubmit} title='Обновить аватар' isOpen={props.isOpen} onClose={props.onClose} isLoading={props.isLoading}>
            <>
                <input ref={avatarRef} className="popup__input" id="avatar-url-input" name="avatar" type="url" placeholder="Введите url" required />
                <span className="popup__error" id="avatar-url-input-error"></span>
            </>
        </PopupWithForm>  
    )
}
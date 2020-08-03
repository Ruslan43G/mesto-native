import React from 'react';

export default function EditAvatarPopup (props) {
    const avatarRef = React.useRef();

    function handleSubmit (evt) {
        evt.preventDefault();
        props.onSubmit({avatar: avatarRef.current.value});
    }

    return (
        <section className={props.isOpen ? `popup popup_avatar popup_opened` : `popup popup_avatar`}>
            <form onSubmit={handleSubmit} className='popup__container' id="profile-form" noValidate>
                <button className="popup__icon-close" onClick={props.onClose} type="button"></button>
                <h3 className="popup__title popup__title_form">Обновить аватар</h3>
                <input ref={avatarRef}  className="popup__input" id="avatar-url-input" name="avatar" type="url" placeholder="Введите url" required />
                <span className="popup__error" id="avatar-url-input-error"></span>
                <button className="popup__button popup__button_form" id="profile-save-button" type="submit" aria-label="Сохранить">Сохранить</button>
            </form>
        </section>
    )
}
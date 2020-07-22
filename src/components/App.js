import React from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';

function App() {
  // [переменные состояния]
  const [profileIsOpen, setProfileIsOpen] = React.useState(false); // попап профиля
  const [avatarIsOpen, setAvatarIsOpen] = React.useState(false); // попап авата
  const [addCardIsOpen, setAddCardIsOpen] = React.useState(false); // попап добавления карточки
  const [selectedCard, setSelectedCard] = React.useState({        // попап картинки
    isOpen: true,
    link: '',
    name: ''
  });
  // функция закрытия всех попапов. Переводит переменные состояния в необходимые значения
  function closeAllPopups() {
    setProfileIsOpen(false);
    setAvatarIsOpen(false);
    setAddCardIsOpen(false);
    setSelectedCard({
      ...selectedCard,
      isOpen: true,
    });
  }
 // Хэндлеры для открытия попапов
  function handleEditAvatarClick () {
    setAvatarIsOpen(true);
  }
  function handleEditProfileClick () {
    setProfileIsOpen(true);
  }
  function handleAddPlaceClick () {
    setAddCardIsOpen(true);
  }
  function handleCardClick (props) {
    setSelectedCard({
      isOpen: false,
      link: props.link,
      name: props.name
    });
  }
  // рендер основной страницы
  return (
    <div className="page">
      <Header />
      <Main 
      onEditAvatar={handleEditAvatarClick} 
      onEditProfile={handleEditProfileClick} 
      onAddPlace={handleAddPlaceClick}
      onCardClick={handleCardClick}
      />
      <Footer />
      <PopupWithForm name='popup_profile' handler={handleEditProfileClick} title='Редактировать профиль' children={
                    <>
                        <input className="popup__input" id="profile-input-name" name="name" type="text" placeholder="Имя" minLength="2" maxLength="40" pattern="^[А-Яа-яЁёA-Za-z\s-]+$" required />
                        <span className="popup__error" id="profile-input-name-error"></span>
                        <input className="popup__input" id="profile-input-about" name="job" type="text" placeholder="О себе" minLength="2" maxLength="200" required />
                        <span className="popup__error" id="profile-input-about-error"></span>
                    </>
                    } isOpen={profileIsOpen}
                    onClose={closeAllPopups}/>
      <PopupWithForm name='popup_card' handler={handleAddPlaceClick} title='Новое место' children={
                <>
                    <input className="popup__input" id="card-name-input" name="name" type="text" placeholder="Название" minLength="1" maxLength="30" required />
                    <span className="popup__error" id="card-name-input-error"></span>
                    <input className="popup__input" id="card-url-input" name="link" type="url" placeholder="Ссылка на картинку"  required />
                    <span className="popup__error" id="card-url-input-error"></span>
                </>
            } isOpen={addCardIsOpen}
            onClose={closeAllPopups}/>
      <PopupWithForm name='popup_avatar' handler={handleEditAvatarClick} title='Обновить аватар' children={
                <>
                    <input className="popup__input" id="avatar-url-input" name="avatar" type="url" placeholder="Введите url" required />
                    <span className="popup__error" id="avatar-url-input-error"></span>
                </>
            } isOpen={avatarIsOpen}
            onClose={closeAllPopups}/>
      <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
    </div> 
  );
}

export default App;

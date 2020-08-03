import React from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import api from '../utils/Api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import PopupWithForm from './PopupWithForm.js';
import EditProfilePopup from './EditProfilePopup.js';
import ImagePopup from './ImagePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';

function App() {
  // [переменные состояния]
  const [currentUser, setCurrentUser] = React.useState({name: '', about: '', avatar: '', _id: ''}); // переменная состояния пользователя
  const [profileIsOpen, setProfileIsOpen] = React.useState(false); // попап профиля
  const [avatarIsOpen, setAvatarIsOpen] = React.useState(false); // попап авата
  const [addCardIsOpen, setAddCardIsOpen] = React.useState(false); // попап добавления карточки
  const [selectedCard, setSelectedCard] = React.useState({        // попап картинки
    isOpen: true,
    link: '',
    name: ''
  });

  //эффект при монтировании
  React.useEffect(() => {
    api.getUserInfo()
      .then(res => setCurrentUser({name: res.name, about: res.about, avatar: res.avatar, _id: res._id}))
      .catch(err => console.log(err))
  }, [])
  const [deleteIsOpen, setDeleteIsOpen] = React.useState(false);
  // функция закрытия всех попапов. Переводит переменные состояния в необходимые значения
  function closeAllPopups() {
    setProfileIsOpen(false);
    setAvatarIsOpen(false);
    setAddCardIsOpen(false);
    setDeleteIsOpen(false);
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
  function handleDeleteClick() {
    setDeleteIsOpen(true);
  }
  function handleUpdateUser(data) {
    api.setUserInfo(data)
      .then((res) => {
        setCurrentUser({...currentUser, name: res.name, about: res.about});
        closeAllPopups();  
      })
      .catch(err => console.log(err));
  }
  function handleUpdateAvatar(data) {
    api.setUserAvatar(data)
      .then((res) => {
        setCurrentUser({...currentUser, avatar: res.avatar});
        closeAllPopups();
      })
      .catch(err => console.log(err));
  }
  // рендер основной страницы
  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Main 
        onEditAvatar={handleEditAvatarClick} 
        onEditProfile={handleEditProfileClick} 
        onAddPlace={handleAddPlaceClick}
        onCardClick={handleCardClick}
        onDeleteClick={handleDeleteClick}
        />
        <Footer />
        <EditProfilePopup isOpen={profileIsOpen} onClose={closeAllPopups} onSubmit={handleUpdateUser}/>
        <PopupWithForm name='popup_card' buttonText='Создать' handler={handleAddPlaceClick} title='Новое место' children={
                  <>
                      <input className="popup__input" id="card-name-input" name="name" type="text" placeholder="Название" minLength="1" maxLength="30" required />
                      <span className="popup__error" id="card-name-input-error"></span>
                      <input className="popup__input" id="card-url-input" name="link" type="url" placeholder="Ссылка на картинку"  required />
                      <span className="popup__error" id="card-url-input-error"></span>
                  </>
              } isOpen={addCardIsOpen}
              onClose={closeAllPopups}/>
        <EditAvatarPopup isOpen={avatarIsOpen} onClose={closeAllPopups} onSubmit={handleUpdateAvatar}/>
        <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
        <PopupWithForm name='popup_delete' buttonText='Да' title='Вы уверены?' isOpen={deleteIsOpen} onClose={closeAllPopups}/>
      </CurrentUserContext.Provider>
      </div> 
  );
}

export default App;

import React from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import api from '../utils/Api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function App() {
  // [переменные состояния]
  const [currentUser, setCurrentUser] = React.useState({name: '', about: '', avatar: ''}); // переменная состояния пользователя
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
      .then(res => setCurrentUser({name: res.name, about: res.about, avatar: res.avatar}))
      .catch(err => console.log(err))
  }, [])
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
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Main 
        onEditAvatar={handleEditAvatarClick} 
        onEditProfile={handleEditProfileClick} 
        onAddPlace={handleAddPlaceClick} 
        profileIsOpenen={profileIsOpen} 
        avatarIsOpen={avatarIsOpen} 
        addCardIsOpen={addCardIsOpen}
        onClose={closeAllPopups}
        card={selectedCard}
        onCardClick={handleCardClick}
        />
        <Footer />
        </CurrentUserContext.Provider>
    </div> 
  );
}

export default App;

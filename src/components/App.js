import React from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';

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
      profileIsOpenen={profileIsOpen} 
      avatarIsOpen={avatarIsOpen} 
      addCardIsOpen={addCardIsOpen}
      onClose={closeAllPopups}
      card={selectedCard}
      onCardClick={handleCardClick}
      />
      <Footer />
    </div> 
  );
}

export default App;

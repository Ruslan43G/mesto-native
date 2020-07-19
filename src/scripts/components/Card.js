export default class Card {                                                                       // создаём класс для карточки

    constructor (item, handleCardClick, selector, putLike, deleteLike, deleteCard, userInfo) {                                                 // объявляем конструктор с данными и селектором
        this._link = item.link;
        this._name = item.name;
        this._likes = item.likes;
        this._id = item._id;
        this._handleCardClick = handleCardClick;
        this._selector = selector;
        this._putLike = putLike;
        this._deleteLike = deleteLike;
        this._owner = item.owner;
        this._deleteCard = deleteCard;
        this._userInfo = userInfo;
    }

    _getCardTemplate() {
        const elementsItem = document.
        querySelector(this._selector).
        content.
        querySelector('.elements__item').
        cloneNode(true);                                            // получаем карточку из шаблона
        this._element = elementsItem;
        return this._element;
    }
    
    // функция постановки лайка
    _toggleLike (evt) {
        if (evt.target.classList.contains('elements__like_active')) {
            this._deleteLike(this._id)
                .then((res) => {
                    evt.target.classList.remove('elements__like_active');  // удалем модификатор
                    this._element.querySelector('.elements__like-counter').textContent = res.likes.length;
                })
                .catch(err => console.log(err));
            return;
        }
        this._putLike(this._id)
            .then((res) => {
                evt.target.classList.add('elements__like_active');  // добавляем модификатор
                this._element.querySelector('.elements__like-counter').textContent = res.likes.length;
            })
            .catch(err => console.log(err));
    };
    
    // функция удаления картчоки
    cardDelete () {    
        this._element.remove();
        this._element.removeEventListener('click', this._cardHandler); // удаляем слушатели      
    };

    // функция определяет клики по карточке
    _cardClickHandler (evt) {
        if (evt.target.classList.contains('elements__like')) {   // лайк
            this._toggleLike(evt);
        }
        if (evt.target.classList.contains('elements__img')) {   // попап с картинкой
            this._handleCardClick({link : this._link, name: this._name});
        }
        if (evt.target.classList.contains('elements__trash')) {  // удаление
            this.openDeletePopup();
        } 
    };

    // функция устанавливает слушатель на карточку
    _setCardEventListeners() {
        this._cardHandler = this._cardClickHandler.bind(this);
        this._element.addEventListener('click', this._cardHandler);
    }

    // метод проверяет отправителя карточки и скрывает иконку удаления
    _checkCardOwner () {
        if (this._userInfo._id === this._owner._id) { 
            return 
        } else { 
            this._element.querySelector('.elements__trash').classList.add('elements__trash_hidden'); 
        } 
    } 

    // метод проверяет если лайк поставил я, то накидывает модификатор.
    _checkLikeOwner() {
        if (this._likes.find(item => item._id === this._userInfo._id)) {
            this._element.querySelector('.elements__like').classList.add('elements__like_active');
        }  
    }

    openDeletePopup() {
        this._deleteCard();
    }

    // метод наполняет карточку данными
    generateCard() {
        this._getCardTemplate();                                      // получаем разметку
        this._setCardEventListeners();                                // устанавливаем слушатели
        this._element.querySelector('.elements__img').src = this._link;  // вставляем картинку
        this._element.querySelector('.elements__img').alt = this._name;  // устанавливаем значение атрибута alt
        this._element.querySelector('.elements__like-counter').textContent = this._likes.length; // счётчик лайков
        this._element.querySelector('.elements__title').textContent = this._name; // вставляем название
        this._element.dataset.owner = this._owner._id;
        this._element.id = this._id;
        this._checkLikeOwner();
        this._checkCardOwner();
        return this._element;    // возвращаем готовую карточку
    }
}
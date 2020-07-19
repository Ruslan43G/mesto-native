export default class FormValidator {

    constructor (data) {
        this._element = document.querySelector(data.formSelector);                           // форма
        this._inputList = Array.from(this._element.querySelectorAll(data.inputSelector));    // Массив инпутов в форме
        this._submitButton = this._element.querySelector(data.submitButtonSelector);         // Кнопка сабмит в форме
        this._inactiveButtonClass = data.inactiveButtonClass;                                // Модификатор неактивной кнопки
        this._inputErrorClass = data.inputErrorClass;                                        // Модификатор инпута с ошибкой
        this._errorClass = data.errorClass;                                                  // Модификатор спана с ошибкой
    }

    // функция для показа ошибки валидации
    _showInputError (formElement, inputElement, errorMessage) {
        const errorElement = formElement.querySelector(`#${inputElement.id}-error`);       // выбираем спан элемнент куда выводим ошибку
        inputElement.classList.add(this._inputErrorClass);                                   // добавляем полюю ввода модификатор со стилем ошибки
        errorElement.textContent = errorMessage;                                           // выводим сообщение об ошибке в спан элемент
        errorElement.classList.add(this._errorClass);                                        // Добавлем спану модификатор со стилем ошибки
    }

    // функция для скрытия ошибки валидации
    _hideInputError (formElement, inputElement) {
        const errorElement = formElement.querySelector(`#${inputElement.id}-error`);        // выбираем спан элемнент куда выводим ошибку
        inputElement.classList.remove(this._inputErrorClass);                                 // удаляем у поля ввода модификатор со стилем ошибки
        errorElement.classList.remove(this._errorClass);                                      // удаляем у спана модификатор со стилем ошибки
        errorElement.textContent = '';                                                      // убираем текст ошибки
    }

    // функция проверяет корректность введеных данных
    _checkInputValidity (formElement, inputElement) {
        if(!inputElement.validity.valid) {                                                        // если поле ввода не валидно
            this._showInputError(formElement, inputElement, inputElement.validationMessage);       // выводим функцию показа ошибки
        } else {                                                                                  // если валидно
            this._hideInputError(formElement, inputElement);                                       // выводим функцию спрятать ошибку
        }
    }

    // функция возвращает информацию о наличии ошибки валидации
    _hasInvalidInput (inputList) {
        return inputList.some((inputElement) => {                                               // проходим все ипуты до первого невалидного
            return !inputElement.validity.valid;                                                // и возвращаем его
        })
    }

    // функция включает и выключает кнопку отправить
    _toggleButtonState (inputList, buttonElement) {
        if (this._hasInvalidInput(inputList)) {                                             // если есть невалидный импут
            buttonElement.classList.add(this._inactiveButtonClass);                         // добавляем кнопке сабмит модификатор "неактивна"
            buttonElement.disabled = true;                                            // добавляем кнопке атрибут disabled
        } else {                                                                      // если все импуты валидны 
            buttonElement.classList.remove(this._inactiveButtonClass);                      // удаляем модификатор
            buttonElement.disabled = false;                                           // убираем атрибут  
        }
    }

    // функция устанавливает слушатели инпута на формы
    _setFormEventListeners (formElement) {
        //this._toggleButtonState(inputList, buttonElement);                               // выключаем кнопку
        this._inputList.forEach((inputElement) => {                                            // проходим по массиву инпутов
            inputElement.addEventListener('input', () => {                         // каждому добавляем слушатель ввода
                this._checkInputValidity (formElement, inputElement);                    // функцию проверки игпутов и вывода ошибки 
                this._toggleButtonState (this._inputList , this._submitButton);                      // выключение кнопки
            });
        });
    }

    // функция запускающая процесс валидации
    enableValidation () {    
        this._setFormEventListeners(this._element);                                 // вызываем метод на форму
    };

    // Метод для сброса ошибок
    formErrorsReset() {
        this._inputList.forEach((input) => input.classList.remove(this._inputErrorClass));
        const errors = Array.from(this._element.querySelectorAll('.popup__error'));
        errors.forEach((error) => {
            error.classList.remove(this._inputErrorClass);
            error.textContent = '';
        });
        if (this._element.classList.contains('popup__container-profile')) {
            this._submitButton.classList.remove(this._inactiveButtonClass);                      // удаляем модификатор
            this._submitButton.disabled = false;
            return;
        }
        this._toggleButtonState(this._inputList, this._submitButton);
    }

}
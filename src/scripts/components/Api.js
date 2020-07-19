export default class Api {
    constructor(options) {
        this._url = options.baseUrl;
        this._headers = options.headers;
    }

    postNewCard (formData) {
        return fetch (`${this._url}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: formData.name,
                link: formData.link
            })    
            }
        )
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`${res.status} ${res.statusText}`);
        });
    }

    getInitialCards() {
        return fetch(`${this._url}/cards`, {
            headers: this._headers
        })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`${res.status} ${res.statusText}`);
        });  
    }

    getUserInfo() {
        return fetch(`${this._url}/users/me`, {
            headers: this._headers
            })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status} ${res.statusText}`);
            });   

    }

    setUserInfo(newUserData) {
        return fetch (`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: newUserData.name,
                about: newUserData.job
            })    
            }
        )
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`${res.status} ${res.statusText}`);
        })
    }

    setUserAvatar (newUserData) {
        return fetch (`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: newUserData.avatar
            })    
            }
        )
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status} ${res.statusText}`);
        })
    }

    putLike(cardId) {
        
        return fetch(`${this._url}/cards/likes/${cardId}`, {
            method: 'PUT',
            headers: this._headers
            })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status} ${res.statusText}`);
            });
    }

    deleteLike(cardId) {
        return fetch(`${this._url}/cards/likes/${cardId}`, {
            method: 'DELETE',
            headers: this._headers
            })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status} ${res.statusText}`);
            });
    }

    deleteCard(cardId) {
        return fetch(`${this._url}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers
        })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status} ${res.statusText}`);
        });
    }

}

class Api {
    constructor({ address, headers }) {
        this._address = address;
        this._headers = headers;
    }


    _returnResultStatus(res) {
        if (res.ok) {
            return res.json();
        } return Promise.reject(`Не получилось: ${res.status}${res.statusText}${res.type} and ${res.headers}`);
    }

    getInitialCards() {
        return fetch(`${this._address}/cards`, {
            headers: this._headers,
            credentials: 'include'
        })
            .then(this._returnResultStatus)
    }

    getUserInfo() {
        return fetch(`${this._address}/users/me`, {
            credentials: 'include',
            headers: this._headers,
        })
            .then(this._returnResultStatus)
    }

    setUserInfo({ name, about }) {
        return fetch(`${this._address}/users/me`, {
            method: 'PATCH',
            credentials: 'include',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                about: about
            })
        })
            .then(this._returnResultStatus)
    }

    setUserAvatar(avatar) {
        return fetch(`${this._address}/users/me/avatar`, {
            method: 'PATCH',
            credentials: 'include',
            headers: this._headers,
            body: JSON.stringify({
                avatar: avatar
            })
        })
            .then(this._returnResultStatus)
    }


    addCard({ name, link }) {
        return fetch(`${this._address}/cards`, {
            method: 'POST',
            credentials: 'include',
            headers: this._headers,
            body: JSON.stringify({
                name,
                link
            })
        })
            .then(this._returnResultStatus)
    }

    deleteCard(cardId) {
        return fetch(`${this._address}/cards/${cardId}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: this._headers
        })
            .then(this._returnResultStatus)
    }

    addLike(cardId) {
        return fetch(`${this._address}/cards/${cardId}/likes`, {
            method: 'PUT',
            credentials: 'include',
            headers: this._headers
        })
            .then(this._returnResultStatus)
    }

    removeLike(cardId) {
        return fetch(`${this._address}/cards/${cardId}/likes`, {
            method: 'DELETE',
            credentials: 'include',
            headers: this._headers
        })
            .then(this._returnResultStatus)
    }
}

const apiMesto = new Api({
    address: `https://api.mesto.dom.nomoredomains.rocks`,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
})

export default apiMesto;
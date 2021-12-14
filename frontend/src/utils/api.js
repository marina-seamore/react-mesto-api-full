
class Api {
    constructor({ address, cohortId, headers }) {
        this._address = address;
        this._cohortId = cohortId;
        this._headers = headers;
    }


    _returnResultStatus(res) {
        if (res.ok) {
            return res.json();
        } return Promise.reject(`Не получилось: ${res.status}${res.statusText}`);
    }

    getInitialCards() {
        return fetch(`${this._address}/${this._cohortId}/cards`, {
            headers: this._headers
        })
            .then(this._returnResultStatus)
    }

    getUserInfo() {
        return fetch(`${this._address}/${this._cohortId}/users/me`, {
            headers: this._headers
        })
            .then(this._returnResultStatus)
    }

    setUserInfo({ name, about }) {
        return fetch(`${this._address}/${this._cohortId}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                about: about
            })
        })
            .then(this._returnResultStatus)
    }

    setUserAvatar( avatar ) {
        return fetch(`${this._address}/${this._cohortId}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: avatar
            })
        })
            .then(this._returnResultStatus)
    }


    addCard({ name, link }) {
        return fetch(`${this._address}/${this._cohortId}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name,
                link
            })
        })
            .then(this._returnResultStatus)
    }

    deleteCard(cardId) {
        return fetch(`${this._address}/${this._cohortId}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers
        })
            .then(this._returnResultStatus)
    }

    addLike(cardId) {
        return fetch(`${this._address}/${this._cohortId}/cards/likes/${cardId}`, {
            method: 'PUT',
            headers: this._headers
        })
            .then(this._returnResultStatus)
    }

    removeLike(cardId) {
        return fetch(`${this._address}/${this._cohortId}/cards/likes/${cardId}`, {
            method: 'DELETE',
            headers: this._headers
        })
            .then(this._returnResultStatus)
    }
}

const apiMesto = new Api({
    address: `https://mesto.nomoreparties.co/v1`,
    cohortId: `cohort-23`,
    headers: {
    authorization: `2f40adb1-d905-40eb-b5eb-fef99da08bb6`,
    'Content-Type': 'application/json'
    }
})

export default apiMesto;
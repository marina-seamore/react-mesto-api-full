export const base_url = `https://api.mesto.dom.nomoredomains.rocks`

function _returnResultStatus(res) {
    if (res.ok) {
        return res.json();
    } return Promise.reject(`Не получилось: ${res.status}${res.statusText} type:${res.type} and ${res.headers}`);
}

export const register = (email, password) => {
    return fetch(`${base_url}/signup`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password }),
    })
        .then((res) => _returnResultStatus(res))
}

export const login = (email, password) => {
    return fetch(`${base_url}/signin`, {
        credentials: 'include',
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    })
        .then((res) => _returnResultStatus(res))
}

export const userCheck = (token) => {
    return fetch(`${base_url}/users/me`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            "Content-Type": "application/json",
            'Accept': 'application/json'
        }
    })
        .then((res) => _returnResultStatus(res))
}
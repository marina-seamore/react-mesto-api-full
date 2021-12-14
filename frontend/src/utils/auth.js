export const base_url = `https://auth.nomoreparties.co`

function _returnResultStatus(res) {
    if (res.ok) {
        return res.json();
    } return Promise.reject(`Не получилось: ${res.status}${res.statusText}`);
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
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    })
        .then((res) => _returnResultStatus(res))
        .then((data) => {
            console.log(`Token on login: ${data.token}`)
            localStorage.setItem('jwt', data.token)
            return data
        })
}

export const userCheck = (token) => {
    return fetch(`${base_url}/users/me`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`,
        }
    })
        .then((res) => _returnResultStatus(res))
}
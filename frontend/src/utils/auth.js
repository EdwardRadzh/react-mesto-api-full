export const BASE_URL = 'https://api.radzhabov.students.nomoredomains.monster';

// export const logout = (token) => {
//     return fetch(`${BASE_URL}/logout`, {
//         method: 'POST',
//         credentials: 'include',
//         headers: {
//             'Accept': 'application/json',
//             'Content-type': 'application/json',
//             'Authorization': `Bearer ${token}`,
//         }
//     })
//     .then((res) => {
//         if (res.ok) {
//             return res.json;
//         }
//         return Promise.reject(`Ошибка: ${res.status}`)
//     })
// }

export const register = (email, password) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        // credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        body: JSON.stringify({ email, password }),
    })
    .then((response) => {
        if (response.status !==400) {
            return response.json();
        } else {
            throw new Error("некорректно заполнено одно из полей ")
        }
    })
    .then((res) => {
        return res;
    })
} 

export const authorize = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        // credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password }),
    })
    .then((response) => {
        if(response.ok) {
            return response.json();
        }
        if(response.status === 400) {
            throw new Error("не передано одно из полей")
        }
        if(response.status === 401) {
            throw new Error("пользователь с email не найден")
        }
    })
    .then((data) => {
        if(data.token) {
            localStorage.setItem('jwt', data.token);
            return data;
        }
        return;
    })
}

// export const checkToken = (token) => {
//     return fetch(`${BASE_URL}/users/me`, {
//         method: 'GET',
//         headers: {
//             'Accept': "application/json",
//             "Content-Type": "application/json",
//             "Authorization" : `Bearer ${token}`,
//         }
//     })
//     .then((response) => {
//         if(response.ok) {
//             return response.json();
//         }
//         if(response.status === 400) {
//             throw new Error("токен не передан или передан не в том формате");
//         }
//         if(response.status === 401) {
//             throw new Error("переданный токен некорректен");
//         }
//     })
//     .then((data) => {
//         return data;
//     })
// }
export const getContent = token => {
    return fetch(`${BASE_URL}/users/me`, {
    //   credentials: 'include',
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${token}`
      }
    })
    .then((response) => {
        if (response.ok) {
            return response.json();
        }
        return Promise.reject(`Ошибка: ${response.status}`)
    })
  }
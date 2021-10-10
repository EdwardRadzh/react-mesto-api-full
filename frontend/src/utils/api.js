export class Api {
  constructor(options) {
    this._url = options.baseUrl;
    this._headers = options.headers;
  }

  _checkError(res) {
    if (!res.ok) {
      return Promise.reject(`Error: ${res.status}`);
    }
    return res.json();
  }

  //Загрузка информации о пользователе с сервера
  getUserInfo(token) {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      // credentials: 'include',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
    }
    }).then(this._checkError)
  }

  //Загрузка карточек с сервера
  getCards(token) {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      // credentials: 'include',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
    }
    }).then(this._checkError)
  }

  //Редактирование профиля
  setUserInfoChanges(data, token) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      // credentials: 'include',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
    },
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    }).then(this._checkError)
  }

  //Добавление новой карточки
  postCard(data, token) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      // credentials: 'include',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
    },
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    }).then(this._checkError)
  }

  //Обновление аватара пользователя
  setUserAvatar(data, token) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      // credentials: 'include',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
    },
      body: JSON.stringify({
        avatar: data.avatar
      })
    }).then(this._checkError)
  }

  //Удаление карточки
  deleteCard(data, token) {
    return fetch(`${this._url}/cards/${data}`, {
      method: 'DELETE',
      // credentials: 'include',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
    }
    }).then(this._checkError)
  }

  // //Удалить лайк
  deleteLike(data, token) {
    return fetch(`${this._url}/cards/likes/${data._id}`, {
      method: 'DELETE',
      // credentials: 'include',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
    },
    }).then(this._checkError)
  }

  // //Добваить лайк
  setLike(data, token) {
    return fetch(`${this._url}/cards/likes/${data._id}`, {
      method: 'PUT',
      // credentials: 'include',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
    },
    }).then(this._checkError)
  }

  //Проверка постановки лайка
  // changeLikeCardStatus(card, isLikes) {
  //   if (isLikes) {
  //     return this.setLike(card);
  //   } else {
  //     return this.deleteLike(card);
  //   }
  // }

  //Проверка постановки лайка
  changeLikeCardStatus(data, isNotLiked, token) {
    return fetch(`${this._url}/cards/${data}/likes`, {
      method: isNotLiked ? "PUT" : "DELETE",
      // credentials: 'include',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
    },
    })
      .then(this._checkError)
  }
}

const api = new Api({
  baseUrl: 'https://api.radzhabov.students.nomoredomains.monster',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api
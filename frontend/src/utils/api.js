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
  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers
    }).then(this._checkError)
  }

  //Загрузка карточек с сервера
  getCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: this._headers
    }).then(this._checkError)
  }

  //Редактирование профиля
  setUserInfoChanges(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    }).then(this._checkError)
  }

  //Добавление новой карточки
  postCard(data) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    }).then(this._checkError)
  }

  //Обновление аватара пользователя
  setUserAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar
      })
    }).then(this._checkError)
  }

  //Удаление карточки
  deleteCard(data) {
    return fetch(`${this._url}/cards/${data}`, {
      method: 'DELETE',
      headers: this._headers
    }).then(this._checkError)
  }

  //Удалить лайк
  deleteLike(data) {
    return fetch(`${this._url}/cards/likes/${data._id}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then(this._checkError)
  }

  //Добваить лайк
  setLike(data) {
    return fetch(`${this._url}/cards/likes/${data._id}`, {
      method: 'PUT',
      headers: this._headers,
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
  changeLikeCardStatus(data, isNotLiked) {
    return fetch(`${this._url}/cards/likes/${data}`, {
      method: isNotLiked ? "PUT" : "DELETE",
      headers: this._headers,
    })
      .then(this._checkError)
  }
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-25',
  headers: {
    authorization: '81d77c87-7194-433b-a4bb-047f8939c4ec',
    'Content-Type': 'application/json'
  }
});

export default api
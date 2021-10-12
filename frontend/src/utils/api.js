export class Api {
  constructor(options) {
    this._url = options.baseUrl;
    this._headers = options.headers;
  }

  getHeader() {
    const token = localStorage.getItem('jwt');
    return {
        ...this._headers,
        Authorization: `Bearer ${token}`,
    }
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
      headers: this.getHeader(),
    })
    .then(this._checkError)
  }

  //Загрузка карточек с сервера
  getCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: this.getHeader(),
    }).then(this._checkError)
  }

  // загрузка основной информации с сервера
  getInitialData() {
    return Promise.all([this.getUserInfo(), this.getCards()]);
  }

  //Редактирование профиля
  setUserInfoChanges(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this.getHeader(),
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
      headers: this.getHeader(),
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
      headers: this.getHeader(),
      body: JSON.stringify({
        avatar: data.avatar
      })
    }).then(this._checkError)
  }

  //Удаление карточки
  deleteCard(data) {
    return fetch(`${this._url}/cards/${data}`, {
      method: 'DELETE',
      headers: this.getHeader(),
    }).then(this._checkError)
  }

  // //Удалить лайк
  deleteLike(data) {
    return fetch(`${this._url}/cards/${data}/likes`, {
      method: 'DELETE',
      headers: this.getHeader(),
    }).then(this._checkError)
  }

  // // //Добваить лайк
  // setLike(data, token) {
  //   return fetch(`${this._url}/cards/${data}/likes`, {
  //     method: 'PUT',
  //     headers: this.getHeader(),
  //   }).then(this._checkError)
  // }

  //Проверка постановки лайка
  changeLikeCardStatus(data, isNotLiked) {
    return fetch(`${this._url}/cards/${data}/likes`, {
      method: isNotLiked ? "PUT" : "DELETE",
      headers: this.getHeader(),
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
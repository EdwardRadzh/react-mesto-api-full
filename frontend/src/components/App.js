import React from 'react';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from '../utils/api';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditAvatarPopup from './EditAvatarPopup';
import EditProfilePopup from './EditProfilePopup';
import AddPlacePopup from './AddPlacePopup';
// import ConfirmDeleteCardPopup from './ConfirmDeleteCardPopup';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';
import * as auth from "../utils/auth.js";



function App() {
    const history = useHistory();

    const [isEditProfilePopupOpen, setIsProfilePopupOpenClose] = React.useState(false);
    const [isAddCardPopupOpen, setIsCardPopupOpenClose] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsAvatarPopupOpenClose] = React.useState(false);

    const [cards, setCards] = React.useState([]);
    const [selectedCard, setSelectedCard] = React.useState({ name: '', link: '' });

    const [currentUser, setCurrentUser] = React.useState({});

    const [saving, setSaving] = React.useState(false)

    const [loggedIn, setLoggedIn] = React.useState(false);

    const [loginState, setLoginState] = React.useState(false);

    const [userData, setUserData] = React.useState('');

    const [isInfoTooltip, setInfoTooltip] = React.useState({isOpen: false, successful: false});


    // отрисовать карточки и информацию о пользователе с сервера
  React.useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (!token) {
      return;
    }
    api.getHeader(token)
    api.getInitialData()
      .then(([user, cards]) => {
        setCurrentUser(user);
        setCards(cards.reverse());
      })
      .catch((err) => console.log(err));
  }, [loggedIn])


  React.useEffect(() => {
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');

      auth.checkToken(jwt)
        .then((res) => {
          if(res) {
            setLoggedIn(true);
            setUserData(res.email);
          }
        })
        .catch((err) => {
          console.log(`Произошла ошибка: ${err}`);
        });
    }
  }, [history, loggedIn]);

  React.useEffect(() => {
    if (loggedIn) {
      history.push('/');
    }
  }, [history, loggedIn]);

  // разлогиниться
    function signOut() {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    setCards([]);
    setCurrentUser({})
    history.push("/sign-in");
    }

    //поставить/снять лайк
    function handleCardLike(card) {
            
            const isLiked = card.likes.some(i => i === currentUser._id);
         
            api.changeLikeCardStatus(card._id, !isLiked)
                .then((newCard) => {
                    setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
                })
                .catch(err => {
                    console.log(err);
            });
    };

    //удалить карточку
    function handleCardDelete(card) {
        
            
            api.deleteCard(card._id)
            .then(() => {
                const newCards = cards.filter((item) => item._id !== card._id);
                setCards(newCards);
                closeAllPopups()
            })
            .catch(err => {
                console.log(err);
        });
        
    };

    function handleEditProfileClick() {
        setIsProfilePopupOpenClose(true);
    };
    function handleAddPlaceClick() {
        setIsCardPopupOpenClose(true);
    };
    function handleEditAvatarClick() {
        setIsAvatarPopupOpenClose(true);
    };
    function closeAllPopups() {
        setIsAvatarPopupOpenClose(false);
        setIsProfilePopupOpenClose(false);
        setIsCardPopupOpenClose(false);
        setSelectedCard({ name: '', link: '' });
        setInfoTooltip(false);
    };

    function handleCardClick(selectedCard) {
        setSelectedCard({ name: selectedCard.name, link: selectedCard.link });
    };

    function handleUpdateUser(data) {
    
            setSaving(true)
            api.setUserInfoChanges(data)
                .then((res) => {
                    setCurrentUser(res);
                    closeAllPopups()
                })
                .catch(err => {
                    console.log(err);
                })
                .finally(() => {
                    setSaving(false)
            })
        
    };

    // изменить аватар
    function handleUpdateAvatar(data) {
        setSaving(true)
        api.setUserAvatar(data)
            .then((res) => {
                setCurrentUser(res);
                closeAllPopups()
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setSaving(false)
        })
    };

    // добавить карточку
    function handleAddPlaceSubmit(data) {
        setSaving(true)
        api.postCard(data)
            .then((newCard) => {
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setSaving(false)
        }) 
    };

    function clickOnOverlayClose(evt) {
        if (evt.target === evt.currentTarget) {
            closeAllPopups();
        }
    };

    // авторизация
    function handleLogin({ email, password }) {
        return auth.authorize(email, password)
          .then((res) => {
            if (res.token) {
              setLoggedIn(true);
              setUserData(res.email);
              localStorage.setItem('jwt', res.token)
              history.push('/');
            } else {
              throw new Error("Не удалось войти в аккаунт");
            }
          })
          .catch((err) => {
            console.log(err);
            handleInfoTooltip(false)
        });
    };

    function handleInfoTooltip(result) {
        setInfoTooltip({...isInfoTooltip, isOpen: true, successful: result});
    };
    
    // регистрация
    function handleRegister({ email, password }) {
        return auth.register(email, password)
        .then((res) => {
            if(res) {
                setUserData(res.email)
                handleInfoTooltip(true);
                history.push('/sign-in')
            }
        })
        .catch((err) => {
            console.log(err);
            handleInfoTooltip(false)
        })
    };

    function handleLoginState(state) {
    setLoginState(state);
    };

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
            <Header
            loginState={loginState}
            loggedIn={loggedIn}
            onSignOut={signOut}
            userData={userData}
            />

            <Switch>

                <Route path="/sign-in">
                    <Login onLogin={handleLogin}
                    onLoginState={handleLoginState}/>
                </Route>

                <Route path="/sign-up">
                    <Register 
                    onLoginState={handleLoginState}
                    onRegister={handleRegister}
                    />
                </Route>

                <ProtectedRoute
                    exact path="/"
                    component={Main}
                    loggedIn={loggedIn}
                    onEditProfile={handleEditProfileClick}
                    onEditAvatar={handleEditAvatarClick}
                    onAddPlace={handleAddPlaceClick}
                    cards={cards}
                    onCardClick={handleCardClick}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                />

                <Route>
                    {loggedIn ? (
                    <Redirect to="/" />
                    ) : (
                    <Redirect to="/sign-in" />
                    )}
                </Route>

            </Switch>

                <Footer />

                <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                    onUpdateAvatar={handleUpdateAvatar}
                    onOverlayClose={clickOnOverlayClose}
                    isSaving={saving}
                />

                <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser}
                    onOverlayClose={clickOnOverlayClose}
                    isSaving={saving}
                />

                <AddPlacePopup
                    isOpen={isAddCardPopupOpen}
                    onClose={closeAllPopups}
                    onAddPlace={handleAddPlaceSubmit}
                    onOverlayClose={clickOnOverlayClose}
                    isSaving={saving}
                />

                <ImagePopup
                    card={selectedCard}
                    onClose={closeAllPopups}
                    onOverlayClose={clickOnOverlayClose}
                />

                <InfoTooltip
                    result={isInfoTooltip}
                    onClose={closeAllPopups}
                />

                {/* Попап удаления (доделать в следующем спринте) */}

                {/* <div className="popup popup_type_delete">
            <div className="popup__container">
                <button type="button" className="popup__close popup__close_type_delete"></button>
                <h2 className="popup__title">Вы уверены?</h2>
                <form name="delete-form" className="popup__form popup__form_delete">
                </form>      
            </div>
        </div> */}

            </div>
        </CurrentUserContext.Provider>
    );
};

export default App;

import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

import Card from "./Card";

function Main(props) {
    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main className="wrapper">
            <section className="profile">
                <div className="profile__general">
                    <div className="profile__container-avatar">
                        <img className="profile__photo" src={currentUser.avatar} alt="avatar" />
                        <button
                            className="profile__photo-edit-button"
                            aria-label="открыть форму обновления аватарки"
                            onClick={props.onEditAvatar}
                        ></button>
                    </div>
                    <div className="profile__info">
                        <h1 className="profile__name">{currentUser.name}</h1>
                        <button
                            aria-label="Изменить"
                            className="profile__edit"
                            type="button"
                            onClick={props.onEditProfile}
                        >
                        </button>
                        <p className="profile__description">{currentUser.about}</p>
                    </div>
                </div>
                <button
                    onClick={props.onAddPlace}
                    type="button"
                    className="profile__add-button"
                ></button>
            </section>

            <section className="elements">
                {props.cards.map(item => (<Card
                    card={item}
                    key={item._id}
                    onCardClick={props.onCardClick}
                    onCardLike={props.onCardLike}
                    onCardDelete={props.onCardDelete} />)
                )}
            </section>
        </main>
    );
};

export default Main;
import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
    const currentUser = React.useContext(CurrentUserContext);

    const isOwn = props.card.owner._id === currentUser._id;
    console.log(props.card.owner._id);

    const cardDeleteButtonClassName = (
        `elements__trash ${isOwn ? 'elements__trash_visible' : 'elements__trash_hidden'}`
    );

    const isLiked = props.card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = (
        `elements__like ${isLiked ? 'elements__like_active' : ''}`
    );

    const { card, onCardClick } = props;

    function handleClick() {
        onCardClick(card);
    }

    function handleLikeClick() {
        props.onCardLike(card);
    }

    function handleDeleteClick() {
        props.onCardDelete(card);
    }

    return (
        <div className="elements__element">
            <button type="button" className={cardDeleteButtonClassName} onClick={handleDeleteClick}></button>
            <div className="elements__img-wrapper">
                <img
                    className="elements__img"
                    src={card.link}
                    alt={card.name}
                    onClick={handleClick} />
            </div>
            <div className="elements__overlay">
                <h2 className="elements__title">{card.name}</h2>
                <div className="elements__like-container">
                    <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
                    <span className="elements__like-count">{card.likes.length}</span>
                </div>
            </div>
        </div>

    )
};

export default Card;
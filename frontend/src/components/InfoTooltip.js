import React from 'react';
import confirm from "../images/successful.svg";
import error from "../images/error.svg";

function InfoTooltip(props) {
    const { onClose, result: { isOpen, successful } } = props;

    return (
    <div
        className={`popup popup__info ${isOpen ? 'popup_opened' : false}`}
    >
    <div className="popup__container popup__info">
        <img className="popup__photo popup__photo_type_info" src={successful ? confirm : error} alt='Значок результата операции' />
        <h2 className={`popup__title popup__title_type_info`}>{successful ? 'Вы успешно зарегестрировались!' : 'Что-то пошло не так! Попробуйте еще раз.'}</h2>
        <button onClick={onClose} className="popup__close" type="button" aria-label="Закрыть окно" />
    </div>
    </div>
    );
}

export default InfoTooltip;
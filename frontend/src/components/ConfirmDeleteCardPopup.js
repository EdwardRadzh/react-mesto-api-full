import React from 'react';
import PopupWithForm from './PopupWithForm';

function ConfirmDeleteCardPopup(props) {
    return (
        <PopupWithForm
            isOpen={props.isOpen}
            onClose={props.onClose}
            title={props.title}
            buttonText={props.buttonText}
        >

        </PopupWithForm>

    )
}

export default ConfirmDeleteCardPopup
import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
    const [name, setName] = React.useState('');
    const [link, setLink] = React.useState('');

    function handleAddName(e) {
        setName(e.target.value)
    };

    function handleAddLink(e) {
        setLink(e.target.value)
    } // привет

    function handleSubmit(e) {
        e.preventDefault();
        props.onAddPlace({ name, link });
    }

    React.useEffect(() => {
        setName('')
        setLink('')
    }, [props.isOpen])

    return (
        <PopupWithForm
            isOpen={props.isOpen}
            onClose={props.onClose}
            name={'add'}
            buttonText={props.isSaving ? 'Создаём...' : 'Создать'}
            title={'Новое место'}
            onSubmit={handleSubmit}
            onOverlayClose={props.onOverlayClose}>
            <input value={name} onChange={handleAddName} name="name" id="place" minLength="2" maxLength="30" className="popup__input popup__input_value_place" type="text" placeholder="Название" required />
            <span className="popup__input-error" id="place-error"></span>
            <input value={link} onChange={handleAddLink} name="link" id="place-link" className="popup__input popup__input_value_link" type="url" placeholder="Ссылка на картинку" required />
            <span id="place-link-error" className="popup__input-error"></span>

        </PopupWithForm>
    )
}

export default AddPlacePopup;
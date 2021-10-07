import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
    const currentUser = React.useContext(CurrentUserContext);

    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about)
    }, [currentUser, props.isOpen])

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleDescriptionChange(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateUser({
            name,
            about: description,
        });
    }

    return (
        <PopupWithForm
            isOpen={props.isOpen}
            onClose={props.onClose}
            name={'profile'}
            buttonText={props.isSaving ? 'Сохранение...' : 'Сохранить'}
            title={'Редактировать профиль'}
            onSubmit={handleSubmit}
            onOverlayClose={props.onOverlayClose}>
            <input value={name || ''} onChange={handleNameChange} name="name" id="username" minLength="2" maxLength="40" className="popup__input popup__input_value_name" type="text" required placeholder="Введите имя" />
            <span className="popup__input-error" id="username-error"></span>
            <input value={description || ''} onChange={handleDescriptionChange} name="description" id="user-description" minLength="2" maxLength="200" className="popup__input popup__input_value_description" type="text" required placeholder="Введите описание" />
            <span className="popup__input-error" id="user-description-error"></span>
        </PopupWithForm>
    )
}

export default EditProfilePopup;
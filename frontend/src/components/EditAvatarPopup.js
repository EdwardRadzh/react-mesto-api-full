import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
    const avatarRef = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();

        props.onUpdateAvatar({
            avatar: avatarRef.current.value
        })
    }

    React.useEffect(() => {
        avatarRef.current.value = '';
    }, [props.isOpen]);

    return (
        <PopupWithForm
            isOpen={props.isOpen}
            onClose={props.onClose}
            name={'edit'}
            buttonText={props.isSaving ? 'Сохранение...' : 'Сохранить'}
            title={'Обновить аватар'}
            onSubmit={handleSubmit}
            onOverlayClose={props.onOverlayClose}
        >
            <input ref={avatarRef} name="avatar" id="avatar-link" minLength="2" className="popup__input" type="url" required placeholder="Ссылка на картинку" />
            <span className="popup__input-error" id="avatar-link-error"></span>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;
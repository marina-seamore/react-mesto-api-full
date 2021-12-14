import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {

    const avatarRef = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar({
            avatar: avatarRef.current.value
        })
    }

    React.useEffect(() => {
        avatarRef.current.value = ''
    }, [isOpen])

    return (
        <PopupWithForm
            name='edit-avatar'
            title='Обновить аватар'
            button='Сохранить'
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <input type="url"
                className="popup__field popup__field_type_photo"
                name="avatar"
                id="image-avatar"
                placeholder="Ссылка на картинку"
                ref={avatarRef}
                required
            />
            <span id="image-avatar-error" className="popup__error"></span>
        </PopupWithForm>
    )
}

export default EditAvatarPopup
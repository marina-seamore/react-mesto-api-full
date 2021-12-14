import React from "react"
import PopupWithForm from "./PopupWithForm"
import { CurrectUserContext } from "../contexts/CurrentUserContext"

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {

    const currentUser = React.useContext(CurrectUserContext)
    const [name, setName] = React.useState('')
    const [description, setDescription] = React.useState('')


    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]);


    function handleNameChange(e) {
        setName(e.target.value)
    }
    function handleDescriptionChange(e) {
        setDescription(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
            name,
            about: description,
        })
    }


    return (
        <PopupWithForm
            name='profile'
            title='Редактировать профиль'
            button='Сохранить'
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <input type="text" className="popup__field popup__field_type_name" placeholder="Имя" name="name" id="name"
                value={name || ''} minLength="2" maxLength="40" required onChange={handleNameChange} />
            <span id="name-error" className="popup__error"></span>
            <input type="text" className="popup__field popup__field_type_description" placeholder="Вид деятельности"
                name="description" id="description" value={description || ''} minLength="2" maxLength="200" required onChange={handleDescriptionChange} />
            <span id="description-error" className="popup__error"></span>
        </PopupWithForm>
    )
}
export default EditProfilePopup
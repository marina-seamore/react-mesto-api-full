import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {

    const [cardName, setCardName] = React.useState('')
    const [cardLink, setCardLink] = React.useState('')

    React.useEffect(() => {
        setCardName('')
        setCardLink('')
    }, [props.isOpen])

    function handleSubmit(e) {
        e.preventDefault()
        props.onAddPlace({
            name: cardName,
            link: cardLink
        })
    }

    function handleNameChange(e) {
        setCardName(e.target.value)
    }

    function handleLinkChange(e) {
        setCardLink(e.target.value)
    }

    return (
        <PopupWithForm
            name='photo'
            title='Новое место'
            button='Создать'
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
        >
            <input type="text"
                className="popup__field popup__field_type_place"
                placeholder="Название"
                name="place"
                id="place"
                value={cardName}
                minLength="2"
                maxLength="30"
                onChange={handleNameChange}
                required />

            <span id="place-error" className="popup__error"></span>

            <input type="url"
                className="popup__field popup__field_type_photo"
                name="imageLink"
                id="image"
                value={cardLink}
                placeholder="Ссылка на картинку"
                onChange={handleLinkChange}
                required />

            <span id="image-error" className="popup__error"></span>
            
        </PopupWithForm>
    )
}

export default AddPlacePopup
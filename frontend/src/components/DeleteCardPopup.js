import PopupWithForm from "./PopupWithForm";

function DeleteCardPopup(props) {
    return (
        <PopupWithForm
            name='edit-confirm'
            title='Вы уверены?'
            button='Да'
            onClose={props.onClose}
            isOpen={props.isOpen}
            onSubmit={props.onSubmit}
        />
    )
}

export default DeleteCardPopup;

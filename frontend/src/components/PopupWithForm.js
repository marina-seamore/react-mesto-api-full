import React from "react"

function PopupWithForm({name, isOpen, onSubmit, title, children, button, onClose}) {

    const popupClassName = (`popup popup_${name} ${isOpen ? 'popup_opened' : ''}`)

    React.useEffect(() => {
        if (!isOpen) return;
        const handleEsc = (e) => {
            if (e.key === "Escape") {
                onClose()
            }
        }
        document.addEventListener('keydown', handleEsc);
        return () => {
            document.removeEventListener('keydown', handleEsc)
        }
    }, [isOpen, onClose])

    const handleOverlayClose = (e) => {
        if (e.target === e.currentTarget && isOpen) {
          onClose();
        }
      };

    return (
        <section className={popupClassName} onMouseDown={handleOverlayClose}>
            <form className='popup__content' name={name} onSubmit={onSubmit}>
                <h3 className='popup__header'>{title}</h3>
                {children}
                <button type="submit" className="popup__submit-button">{button}</button>
                <button type="button" className="popup__close-button" aria-label="закрыть" onClick={onClose}></button>
            </form>
        </section>
    )
}
export default PopupWithForm
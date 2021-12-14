import React from "react";

function ImagePopup({ card, onClose }) {

    const isOpen = !!card;

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
        <section className={`popup popup popup_full-photo ${card && 'popup_opened'}`} onMouseDown={handleOverlayClose}>
            <div className="full-photo">
                <button type="button" className="popup__close-button popup__close-button-full-photo"
                    aria-label="закрыть"
                    onClick={onClose}
                ></button>
                <img className="full-photo__image" src={card?.link} alt={card?.name} />
                <p className="full-photo__place">{card?.name}</p>
            </div>
        </section>
    )
}
export default ImagePopup;
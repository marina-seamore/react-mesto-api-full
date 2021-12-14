import iconSuccess from '../images/check.svg'
import iconError from '../images/err.svg'

function InfoTooltip({onClose, isOpen, text, icon}) {

    const handleOverlayClose = (e) => {
        if (e.target === e.currentTarget && isOpen) {
            onClose();
        }
    };

    const icons = {
        success: iconSuccess,
        error: iconError
    }

    return(
        <section className={(`popup ${isOpen ? 'popup_opened' : ''}`)} onMouseDown={handleOverlayClose}>
            <form className='popup__content'>
                <img className='popup__icon' src={icons[icon]} alt='icon'/>
                <button type="button" className="popup__close-button" aria-label="закрыть" onClick={onClose}></button>
                <h3 className='popup__header'>{text}</h3>
            </form>
        </section>
    )
}

export default InfoTooltip;

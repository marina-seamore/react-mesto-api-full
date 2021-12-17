import React, { useContext } from "react";
import { CurrectUserContext } from "../contexts/CurrentUserContext";

function Card({ onCardClick, card, onCardLike, onCardDelete }) {

    const currentUser = useContext(CurrectUserContext);
    const isOwn = currentUser._id === card.owner

    const elementDeleteButtonClassName = (`button ${isOwn ? 'element__delete-button_visible' : 'element__delete-button_hidden'}`)

    const isLiked = card.likes.some(i => i === currentUser._id)
    const elementLikeButtonClassName = (`button element__likes_button ${isLiked ? 'element__likes_button_active' : ''}`)

    const handleCardLike =() => {
        onCardLike(card)
    }

    const handleCardClick = () => {
        onCardClick(card)
    }

    const handleCardDelete =() => {
        onCardDelete(card)
    }
    
    return (
        <article className="element">
            <button type="button" className={elementDeleteButtonClassName} onClick={handleCardDelete}></button>
            <img className="element__photo" src={card.link} alt={card.name} onClick={handleCardClick} />
            <div className="element__name-block">
                <h2 className="element__name">{card.name}</h2>
                <div className="element__likes">
                    <button type="button" className={elementLikeButtonClassName} onClick={handleCardLike} aria-label="нравится"></button>
                    <p className="element__likes_counter">{card.likes.length}</p>
                </div>
            </div>
        </article>
    )
}

export default Card
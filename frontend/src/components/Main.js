import React from 'react'
import Card from './Card'
import { CurrectUserContext } from '../contexts/CurrentUserContext'

function Main(props) {

    const currentUser = React.useContext(CurrectUserContext)

    return (
        <>
            <section className="profile">
                <div className="profile__avatar">
                    <img className="profile__avatar profile__avatar_image" src={currentUser.avatar} alt="Фото профиля" />
                    <button className="button profile__avatar profile__avatar_button" onClick={props.onEditAvatar}></button>
                </div>
                <div className="profile__info">
                    <h1 className="profile__name">{currentUser.name}</h1>
                    <button type="button" className="button profile__edit-button" aria-label="Редактировать" onClick={props.onEditProfile}></button>
                    <p className="profile__description">{currentUser.about}</p>
                </div>
                <button type="button" className="button profile__add-button" aria-label="Добавить" onClick={props.onAddPlace}></button>
            </section>

            <section className="elements">
                {props.cards.map((item) => (
                    <Card card={item}
                        key={item._id}
                        onCardClick={props.onCardClick}
                        onCardLike={props.onCardLike}
                        onCardDelete={props.onCardDelete}
                    />
                ))}
            </section>

        </>
    )
}

export default Main
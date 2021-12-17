import React from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import ImagePopup from './ImagePopup.js'
import apiMesto from '../utils/api'
import { CurrectUserContext } from '../contexts/CurrentUserContext.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import DeleteCardPopup from './DeleteCardPopup.js';
import ProtectedRoute from './ProtectedRoute.js';
import Login from './Login.js';
import Register from './Register.js';
import { Route, Switch, useHistory } from 'react-router-dom';
import InfoTooltip from './InfoTooltip.js';
import * as auth from '../utils/auth.js';

function App() {

    //popups
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isDeleteCardPopupOpen, setisDeleteCardPopupOpen] = React.useState(false);
    const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false)

    // cards
    const [selectedCard, setSelectedCard] = React.useState(null)
    const [cards, setCards] = React.useState([])
    const [cardToDelete, setCardToDelete] = React.useState(null)

    //User info
    const [currentUser, setCurrentUser] = React.useState('');
    const [isLoggedIn, setIsLoggedIn] = React.useState(true);
    const [email, setEmail] = React.useState('');
    const [iconInfoTooltip, setIconInfoTooltip] = React.useState('')
    const [textInfoTooltip, setTextInfoTooltip] = React.useState('')

    const history = useHistory()

    //useEffect once logged in
    React.useEffect(() => {
        if (isLoggedIn) {
            apiMesto.getUserInfo()
                .then((userData) => {
                    setCurrentUser(userData)
                })
                .catch(err => console.log(`Getting user info: ${err}`));

            apiMesto.getInitialCards()
                .then((cardData) => {
                    setCards(cardData)
                })
                .catch(err => console.log(`Gettings cards: ${err}`))
        }
    }, [isLoggedIn])


    //popups functions
    function closeAllPopups() {
        setIsEditProfilePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setisDeleteCardPopupOpen(false)
        setSelectedCard(null)
        setIsInfoTooltipOpen(false)
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }
    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }
    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }


    // User info functions

    function handleUpdateUser(newUserInfo) {
        apiMesto.setUserInfo(newUserInfo)
            .then((newData) => {
                setCurrentUser(newData)
                closeAllPopups()
            })
            .catch(err => console.log(`Updating UserInfo: ${err}`))
    }

    function handleUpdateAvatar(newUserInfo) {
        apiMesto.setUserAvatar(newUserInfo.avatar)
            .then((newAvatar) => {
                setCurrentUser(newAvatar)
                closeAllPopups()
            })
            .catch(err => console.log(`Updating avatar: ${err}`))
    }

    //Registration

    function onRegister({ email, password }) {
        auth.register(email, password)
            .then((res) => {
                console.log(res)
                setTextInfoTooltip('Вы успешно зарегистрировались!')
                setIconInfoTooltip('success')
                history.push('/sign-in')
            })
            .catch((err) => {
                console.log(`Registration: ${err}`)
                setTextInfoTooltip('Что-то пошло не так! Попробуйте ещё раз.')
                setIconInfoTooltip('error')
            })
            .finally(() => setIsInfoTooltipOpen(true))
    }

    //Login


    function onLogin({ email, password }) {
        auth.login(email, password)
            .then(() => {
                setIsLoggedIn(true)
                setEmail(email)
                history.push('/')
            })
            .catch((err) => console.log(`onLogin: ${err}`))
    }

    // Logout

    function logout() {
        localStorage.removeItem('jwt');
        setIsLoggedIn(false);
        history.push('/sign-in')
    }

    // Authorisation check

    React.useEffect(() => {
        const token = localStorage.getItem('jwt');
        if (token) {
            auth.userCheck(token)
                .then((res) => {
                    setIsLoggedIn(true)
                    setEmail(res.data.email);
                    history.push('/')
                })
                .catch(() => {
                    localStorage.removeItem('jwt');
                    setIsLoggedIn(false)
                })
        } else {
            setIsLoggedIn(false)
        }
    }, [history])

    //cards functions



    function onCardClick(selectedCard) {
        setSelectedCard(selectedCard)
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i === currentUser._id)
        if (!isLiked) {
            apiMesto.addLike(card._id)
                .then((newCard) => {
                    const newCards = cards.map(c => c._id === card._id ? newCard : c)
                    setCards(newCards)
                })
                .catch(err => console.log(`Like function error: ${err}`))
        } else {
            apiMesto.removeLike(card._id)
                .then((newCard) => {
                    const newCards = cards.map(c => c._id === card._id ? newCard : c)
                    setCards(newCards)
                })
                .catch(err => console.log(`Dislike function error: ${err}`))
        }

    }

    function setCardToBeDeleted(cardToDelete) {
        setCardToDelete(cardToDelete)
        setisDeleteCardPopupOpen(true)
    }


    function handleCardDelete(e) {
        e.preventDefault();
        apiMesto.deleteCard(cardToDelete._id)
            .then(() => {
                const newCards = cards.filter(c => c._id !== cardToDelete._id)
                setCards(newCards)
                setisDeleteCardPopupOpen(false)
            })
            .catch(err => console.log(`Deleting card: ${err}`))
    }


    function handleAddPlace(placeInfo) {
        apiMesto.addCard(placeInfo)
            .then((newCard) => {
                setCards([newCard, ...cards])
                closeAllPopups()
            })
            .catch(err => console.log(`Adding Place: ${err}`))
    }


    return (
        <CurrectUserContext.Provider value={currentUser}>
            <div className="page">
                <Header
                    email={email}
                    logout={logout}
                    isLoggedIn={isLoggedIn}
                />
                <Switch>
                    <ProtectedRoute
                        isLoggedIn={isLoggedIn}
                        exact path='/'
                    >
                        <Main
                            onEditProfile={handleEditProfileClick}
                            onEditAvatar={handleEditAvatarClick}
                            onAddPlace={handleAddPlaceClick}
                            onCardClick={onCardClick}
                            cards={cards}
                            onCardLike={handleCardLike}
                            onCardDelete={setCardToBeDeleted}
                        />
                        <ImagePopup
                            card={selectedCard}
                            onClose={closeAllPopups}
                        />
                        <EditProfilePopup
                            isOpen={isEditProfilePopupOpen}
                            onClose={closeAllPopups}
                            onUpdateUser={handleUpdateUser}
                        />
                        <AddPlacePopup
                            isOpen={isAddPlacePopupOpen}
                            onClose={closeAllPopups}
                            onAddPlace={handleAddPlace}
                        />
                        <EditAvatarPopup
                            isOpen={isEditAvatarPopupOpen}
                            onClose={closeAllPopups}
                            onUpdateAvatar={handleUpdateAvatar}
                        />
                        <DeleteCardPopup
                            onClose={closeAllPopups}
                            isOpen={isDeleteCardPopupOpen}
                            onSubmit={handleCardDelete}
                        />
                    </ProtectedRoute>

                    <Route path='/sign-in'>
                        <Login onLogin={onLogin} />
                    </Route>

                    <Route path='/sign-up'>
                        <Register onRegister={onRegister} />
                        <InfoTooltip
                            onClose={closeAllPopups}
                            isOpen={isInfoTooltipOpen}
                            text={textInfoTooltip}
                            icon={iconInfoTooltip}
                        />
                    </Route>
                    <Footer />

                </Switch>
            </div>
        </CurrectUserContext.Provider>
    );
}

export default App;

import { Route, Switch } from 'react-router';
import { Link } from 'react-router-dom';
import headerLogo from '../images/mesto-logo.svg';

function Header({ email, isLoggedIn, logout }) {
    const emailClassName = (`header__email ${isLoggedIn ? 'header__email_active' : ''}`);

    return (
        <header className="header">
            <img className="header__logo" src={headerLogo} alt="Лого Место" />
            <div className="header__login-info-box">
                <p className={emailClassName} >{email}</p>
                <Switch>
                    <Route exact path='/'>
                        <button type="button" className=" button header__button header__button_active" onClick={logout}>Выйти</button>
                    </Route>
                    <Route path='/sign-in'>
                        <Link to='/sign-up'>
                            <button type="button" className=" button header__button header__button_active">Регистрация</button>
                        </Link>
                    </Route>
                    <Route path='/sign-up'>
                        <Link to='/sign-in'>
                            <button type="button" className=" button header__button header__button_active">Войти</button>
                        </Link>
                    </Route>
                </Switch>
            </div>
        </header>
    )
}

export default Header
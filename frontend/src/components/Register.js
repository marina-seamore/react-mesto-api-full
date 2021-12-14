import React from "react";

function Register({ onRegister }) {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    function handleEmailChange(e) {
        setEmail(e.target.value);
    }
    function handlePassChange(e) {
        setPassword(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onRegister({ email, password })
    }

    return (
        <form className='login' onSubmit={handleSubmit}>
            <h3 className='login__header'>Регистрация</h3>

            <input type="email"
                className="login__field"
                placeholder="Email"
                name="email"
                id="email"
                value={email}
                minLength="2"
                maxLength="30"
                onChange={handleEmailChange}
                required />

            <input type="password"
                className="login__field"
                name="password"
                id="password"
                value={password}
                placeholder="Пароль"
                onChange={handlePassChange}
                required />

            <button type="submit" className=" button login__submit-button">Зарегистрироваться</button>
            <a href="/sign-in" className="login__redirect-link">Уже зарегистрированы? Войти</a>
        </form>
    )
}

export default Register;

import React, { useState } from 'react';
import { Link } from "react-router-dom";

const Authorization = () => {
    const [email, setEmail] = useState('');
    const [emailDirty, setEmailDirty] = useState(false);
    const [emailError, setEmailError] = useState('Email не может быть пустым!');

    const [password, setPassword] = useState('');
    const [passwordDirty, setPasswordDirty] = useState(false);
    const [passwordError, setPasswordError] = useState('Password не может быть пустым!');

    const [message, setMessage] = useState('');

    // Проверка валидности email
    const validateEmail = (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) {
            setEmailError('Email не может быть пустым!');
        } else if (!emailRegex.test(value)) {
            setEmailError('Некорректный email!');
        } else {
            setEmailError('');
        }
    };

    // Проверка валидности пароля
    const validatePassword = (value) => {
        if (!value) {
            setPasswordError('Password не может быть пустым!');
        } else {
            setPasswordError('');
        }
    };

    const blurHandler = (e) => {
        switch (e.target.name) {
            case 'email':
                setEmailDirty(true);
                break;
            case 'password':
                setPasswordDirty(true);
                break;
            default:
                break;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (emailError || passwordError) {
            setMessage('Исправьте ошибки перед отправкой формы.');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/users');
            if (!response.ok) throw new Error('Ошибка при запросе данных с сервера');

            const users = await response.json();

            const user = users.find(
                (user) => user.email === email && user.password === password
            );

            if (user) {
                setMessage('Авторизация успешна!');
            } else {
                setMessage('Неправильный email или пароль.');
            }
        } catch (error) {
            console.error('Ошибка авторизации:', error);
            setMessage('Ошибка сервера.');
        }
    };

    return (
        <div className="container">
            <h1 className="title">Авторизация</h1>
            {message && <p>{message}</p>}
            <form className="form" onSubmit={handleSubmit}>
                <div>
                    <label>Email</label>
                    <input
                        onBlur={blurHandler}
                        name="email"
                        value={email}
                        type="email"
                        className="input"
                        onChange={(e) => {
                            setEmail(e.target.value);
                            validateEmail(e.target.value);
                        }}
                        required
                    />
                    {emailDirty && emailError && <div style={{ color: 'red' }}>{emailError}</div>}
                </div>
                <div>
                    <label>Пароль</label>
                    <input
                        onBlur={blurHandler}
                        name="password"
                        value={password}
                        type="password"
                        className="input"
                        onChange={(e) => {
                            setPassword(e.target.value);
                            validatePassword(e.target.value);
                        }}
                        required
                    />
                    {passwordDirty && passwordError && <div style={{ color: 'red' }}>{passwordError}</div>}
                </div>
                <button type="submit" className="button">Войти</button>
            </form>
            <div className="footer">
                <span>Нет аккаунта?</span>
                <Link to="/register" className="link">Регистрация</Link>
            </div>
        </div>
    );
};

export default Authorization;

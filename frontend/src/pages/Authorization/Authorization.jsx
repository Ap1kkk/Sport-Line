import React, { useState } from 'react';
import {Link, useNavigate} from "react-router-dom";
import "./Authorization.css";

const Authorization = () => {
    const [email, setEmail] = useState('');
    const [emailDirty, setEmailDirty] = useState(false);
    const [emailError, setEmailError] = useState('Email не может быть пустым!');

    const [password, setPassword] = useState('');
    const [passwordDirty, setPasswordDirty] = useState(false);
    const [passwordError, setPasswordError] = useState('Password не может быть пустым!');

    const [message, setMessage] = useState('');
    const navigate = useNavigate()

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
            const body = { email, password };

            const response = await fetch('http://localhost:8080/api/v1/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });

            if (response.ok) {
                const data = await response.json();

                localStorage.setItem('user', JSON.stringify(data));

                setMessage('Авторизация успешна!');
                setEmail('');
                setPassword('');
                if (data.role === "USER")
                {
                    navigate("/main_page")
                } else if (data.role === "ADMIN") {
                    navigate("/admin")
                }

            } else {
                const errorData = await response.json();
                setMessage(errorData.message || 'Неправильный email или пароль.');
            }
        } catch (error) {
            console.error('Ошибка авторизации:', error);
            setMessage('Ошибка сервера.');
        }
    };

    return (
        <div className="__container">
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

import React, {useState} from 'react';
import './Register.css';
import {Link, useNavigate} from "react-router-dom";

const Register = () => {
    const [username, setUsername] = useState('')
    const [usernameDirty, setUsernameDirty] = useState(false)
    const [usernameError, setUsernameError] = useState('Поле не может быть пустым!')

    const [email, setEmail] = useState('')
    const [emailDirty, setEmailDirty] = useState(false)
    const [emailError, setEmailError] = useState('Email не может быть пустым!')

    const [password, setPassword] = useState('')
    const [passwordDirty, setPasswordDirty] = useState(false)
    const [passwordError, setPasswordError] = useState('Password не может быть пустым!')

    const [message, setMessage] = useState('');

    const navigate = useNavigate()

    const validateUsername = (value) => {
        if (!value){
            setUsernameError('Username не может быть пустым!')
        } else {
            setUsernameError('')
        }
    }
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

    const validatePassword = (value) => {
        if (!value) {
            setPasswordError('Password не может быть пустым!');
        } else if (value.length < 6) {
            setPasswordError('Пароль должен содержать минимум 6 символов!');
        } else {
            setPasswordError('');
        }
    };

    const blurHandler = (e) => {
        switch (e.target.name) {
            case 'username':
                setUsernameDirty(true)
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
        try {
            const formData = {username, email, password}
            const responce = await fetch('http://localhost:5000/users', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(formData)
            });

            if (responce.ok) {
                setMessage('Регистрация успешна!')
                setUsername('')
                setEmail('')
                setPassword('')
                navigate("/register/preferences")
            } else {
                setMessage('Ошибка регистрации.');
            }
        } catch (error) {
            console.error('Ошибка:', error)
            setMessage('Сервер недоступен.')
        }
    }

    return (
        <div className='container'>
            <h1 className='title'>Регистрация</h1>
            {message && <p>{message}</p>}
            <form className='form' onSubmit={handleSubmit}>
                <div>
                    <label>username</label>
                    <input
                        className='input'
                        type='text'
                        name='username'
                        value={username}
                        onBlur={(e) => blurHandler(e)}
                        onChange={(e) => {
                            setUsername(e.target.value)
                            validateUsername(e.target.value)
                        }}
                        required
                    />
                    {usernameDirty && usernameError && <div style={{color: 'red'}}>{usernameError}</div>}
                </div>
                <div>
                    <label>email</label>
                    <input
                        className='input'
                        type='email'
                        name='email'
                        value={email}
                        onBlur={(e) => blurHandler(e)}
                        onChange={(e) => {
                            setEmail(e.target.value)
                            validateEmail(e.target.value)
                        }}
                        required
                    />
                    {emailDirty && emailError && <div style={{color: 'red'}}>{emailError}</div>}
                </div>
                <div>
                    <label>password</label>
                    <input
                        className='input'
                        type="password"
                        name="password"
                        value={password}
                        onBlur={(e) => blurHandler(e)}
                        onChange={(e) => {
                            setPassword(e.target.value)
                            validatePassword(e.target.value)
                        }}
                        required
                    />
                    {passwordDirty && passwordError && <div style={{color: 'red'}}>{passwordError}</div>}
                </div>
                <button className='button' type='submit'>Продолжить</button>
            </form>
            <div className='footer'>
                <span>Уже есть аккаунт?</span>
                <Link to="/login" className='link'>Авторизация</Link>
            </div>
        </div>
    );
};

export default Register;
import '../styles/login.css';
import { useState } from 'react';
import axios from 'axios';
import { login } from '../helpers/Utils';
import Icon from '../components/IconBlack';
import BigShip from '../components/componentImages/BigShip.jpeg';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setuserPassword] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(userEmail === ""){
            window.alert("É preciso digitar um email");
        }

        if(userPassword === ""){
            window.alert("É preciso digitar uma senha");
        }

        axios({
            method: 'post',
            url: 'http://localhost:8000/api/login',
            auth: {
                username: userEmail,
                password: userPassword
            }
        }).then((response) => {
            if(response.data["sucesso"] === 1) {
                login(userEmail, userPassword);
                navigate('/home')
            } else {
                window.alert("Erro ao autenticar usuário: \n" + response.data["error"]);
            }
        }).catch((error) => {
            console.error("Erro na requisição:", error);
            window.alert("Erro na comunicação com o servidor: " + error.message);
        });
    };

    return (
        <div className="page">
            <img src={BigShip} alt='Navio Grandão' style={{ maxWidth: '33%', height: '100vh' }}/>
            <div className="login">
                <div className="page_title">
                    <Icon /> 
                    <h2>MyPort Manager</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        className="input"
                        name="userEmail"
                        value={userEmail}
                        placeholder="Enter email"
                        onChange={(e) => setUserEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        className="input"
                        name="userPassword"
                        value={userPassword}
                        placeholder="Enter password"
                        onChange={(e) => setuserPassword(e.target.value)}
                    />
                    <a href="#" className="forgot-password-link">Forgot Password?</a>
                    <button type="submit">Log in</button>
                </form>
            </div>
        </div>
    );
}
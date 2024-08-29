import React, { useState } from 'react';
import axios from 'axios';
import '../styles/ContainerRegister.css'; // Ensure you create a corresponding CSS file
import { useNavigate } from 'react-router-dom';
import Icon from '../components/IconBlack';
import { getUser, getPassword } from "../helpers/Utils";

export default function ContainerRegister() {

    const [formData, setFormData] = useState({
        ContainerID: '',
        ContainerType: '',
        Location: '',
        Ship: '',
        Flag: false
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if(formData.fullName === ""){
            window.alert("Digite um nome")
        }

        if(formData.email === ""){
            window.alert("Digite um email")
        }

        if(formData.companyName === ""){
            window.alert("Digite uma companhia")
        }

        if(formData.password === ""){
            window.alert("Digite uma senha")
        }

        if(formData.confirmPassword !== formData.password){
            window.alert("Campos de senha diferentes")
        }

        const data = {
            IdContainer: formData.ContainerID,
            IdContainerType: formData.ContainerType,
            IdLocation: formData.Location,
            IdShip: formData.Ship,
            Flag: formData.Flag
        }

        try {
            const response = await axios.post('http://localhost:8000/api/registerContainer',
                data,
                {auth: {
                    username: getUser(),
                    password: getPassword()
                }},
                { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
            );
            if (response.data["sucesso"] === 1) {
                window.alert("Container registrado com sucesso");
            } else {
                window.alert("Erro ao registrar Container: " + response.data["erro"]);
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
            window.alert("Erro na comunicação com o servidor: " + error.message);
        }

    };

    return (
        <div className="port-registry-page">
            <Header />
            <div className="content">
            <form onSubmit={handleSubmit}>
                    <TextInput
                        label="Container ID"
                        name="ContainerID"
                        value={formData.ContainerID}
                        onChange={handleChange}
                    />
                    <TextInput
                        label="Container Type"
                        name="ContainerType"
                        value={formData.ContainerType}
                        onChange={handleChange}
                    />
                    <TextInput
                        label="Location"
                        name="Location"
                        value={formData.Location}
                        onChange={handleChange}
                    />
                    <TextInput
                        label="Ship"
                        name="Ship"
                        value={formData.Ship}
                        onChange={handleChange}
                    />
                    <button type="submit" className="signup-button">Register new Container</button>
                </form>
            </div>
        </div>
    );
}

function TextInput({ label, name, type = "text", value, onChange }) {
    return (
        <div className="input-group">
            <label>{label}*</label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                required
            />
        </div>
    );
}

function Header() {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/home');
    };
    return (
        <header className="navbar">
            <div className="logo">
                <Icon />
                <span>MyPort Manager</span>
            </div>
            <nav className="nav-links">
                <GoBackButton onClick={handleNavigate} />
            </nav>
        </header>
    );
}

function GoBackButton({ onClick }) {
    return (
        <button 
            className="sign-in-button" 
            onClick={onClick} 
            style={{ 
                color: 'white', 
                padding: '5px 10px',  // Adjust padding to make the button smaller
                width: '100%',         // Reduce width to 50%
                height: 'auto'        // Ensure height is adjusted accordingly
            }}
        >
            Home
        </button>
    );
}
import React, { useState } from 'react';
import axios from 'axios';
import '../styles/register.css'; // Make sure to create a CSS file for styling
import Icon from '../components/IconBlack'; // Assuming you have an Icon component
import ContainerImage from '../components/componentImages/VariosContainer.png'; // Image on the right side

export default function Signup() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        companyName: '',
        password: '',
        confirmPassword: ''
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
            novo_login: formData.email,
            nova_senha: formData.confirmPassword,
            novo_nome: formData.fullName,
            novo_porto: formData.companyName
        }

        try {
            const response = await axios.post('http://localhost:8000/api/registerUser',
                data,
                { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
            );
            if (response.data["sucesso"] === 1) {
                window.alert("Usuário registrado com sucesso");
            } else {
                window.alert("Erro ao registrar usuário: " + response.data["erro"]);
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
            window.alert("Erro na comunicação com o servidor: " + error.message);
        }

    };

    return (
        <div className="signup-page">
            <div className="signup-form">
                <Header />
                <h2>Create an account</h2>
                <p>To get started, provide your details</p>
                <form onSubmit={handleSubmit}>
                    <TextInput
                        label="Full name"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                    />
                    <TextInput
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <TextInput
                        label="Company name"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                    />
                    <PasswordInput
                        label="Password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <PasswordInput
                        label="Repeat password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                    />
                    <p className="terms-text">
                        By clicking Continue, you agree to our Terms and Conditions, and confirm you have read our Privacy Policy.
                    </p>
                    <button type="submit" className="signup-button">Sign up</button>
                </form>
            </div>
            <div className="signup-image">
                <img src={ContainerImage} alt="Containers" />
            </div>
        </div>
    );
}

function Header() {
    return (
        <header className="header">
            <Icon />
            <span>MyPort Manager</span>
        </header>
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

function PasswordInput({ label, name, value, onChange }) {
    return (
        <div className="input-group">
            <label>{label}*</label>
            <div className="password-input-wrapper">
                <input
                    type="password"
                    name={name}
                    value={value}
                    onChange={onChange}
                    required
                />
                <span className="password-icon">🔒</span> {/* Example icon, you can replace it */}
            </div>
        </div>
    );
}
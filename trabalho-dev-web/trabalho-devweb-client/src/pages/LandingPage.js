import React, { useState } from 'react';
import '../styles/landing.css';
import Icon from '../components/IconBlack'; // Assuming you have an Icon component
import BigShip from '../components/componentImages/BigShip.jpeg'; // Assuming this is the ship image
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
    const [showDemo, setShowDemo] = useState(false);

    const handleWatchDemo = () => {
        setShowDemo(true);
        // Logic to show demo video or modal
    };

    return (
        <div className="landing-page">
            <Header />
            <HeroSection handleWatchDemo={handleWatchDemo} />
            {/* Add modal or additional components if necessary */}
        </div>
    );
}

function Header() {
    const navigate = useNavigate();

    const handleSignIn = () => {
        navigate('/login');
    };

    const handleRegister = () => {
        navigate('/register');
    };

    return (
        <header className="navbar">
            <div className="logo" style={{ color: 'white' }}>
                <Icon />
                <span>MyPort Manager</span>
            </div>
            <nav className="nav-links">
                <NavLink label="Features" />
                <NavLink label="Plans" />
                <NavLink label="Help" />
            </nav>
            <div className="auth-buttons">
                <SignInButton onClick={handleSignIn} />
                <RegisterButton onClick={handleRegister}/>
            </div>
        </header>
    );
}

function NavLink({ label }) {
    return (
        <a href="login" style={{ color: 'white' }}>
            {label}
        </a>
    );
}

function SignInButton({ onClick }) {
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
            Sign In
        </button>
    );
}

function RegisterButton({ onClick }) {
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
            Register
        </button>
    );
}

function HeroSection({ handleWatchDemo }) {
    return (
        <div className="hero-section">
            <img src={BigShip} alt="Container Ship" className="hero-image" />
            <div className="hero-text">
                <h1>Real-time updates for Port management.</h1>
                <WatchDemoButton handleWatchDemo={handleWatchDemo} />
            </div>
        </div>
    );
}

function WatchDemoButton({ handleWatchDemo }) {
    return (
        <button onClick={handleWatchDemo} className="watch-demo-button">
            Watch Demo
        </button>
    );
}
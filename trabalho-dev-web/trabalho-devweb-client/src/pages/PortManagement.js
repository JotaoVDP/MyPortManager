import React from 'react';
import '../styles/portManagement.css'; // Make sure to create a CSS file for styling
import Icon from '../components/IconBlack'; // Assuming you have an Icon component
import MainImage from '../components/componentImages/MainImage.png'; // Main image on the right
import { useNavigate } from 'react-router-dom';
import { logout } from "../helpers/Utils";

const styles = {
  Card: {
    width: '100%', /* Ensure card takes full width within the grid */
    backgroundColor: '#f0f0f0',
    borderRadius: '32px',
    padding: '20px',
    boxSizing: 'border-box', /* Ensure padding is included in width */
    textAlign: 'center', /* Center-align text in the card */
    cursor: 'pointer',  /* Add pointer cursor to indicate clickability */
  },
};

const Card = ({ children, onClick }) => {
  return (
    <div style={styles.Card} onClick={onClick}>
      {children}
    </div>
  );
};

export default function PortManagement() {
    const navigate = useNavigate();

    const handleNavigate = (path) => {
        navigate(path);
    };

    return (
        <div className="port-management-page">
            <Header />
            <div className="content">
                <div className="overview-section">
                    <div className="text-content">
                        <h1>Port Management</h1>
                        <p>Efficiently manage port data with MyPort Manager</p>
                        <div className="button-group">
                            <ActionButton label="View" active />
                            <ActionButton label="Edit" />
                            <ActionButton label="Delete" />
                            <ActionButton label="Create" />
                        </div>
                    </div>
                    <div className="image-content">
                        <img src={MainImage} alt="Main View" />
                    </div>
                </div>
                <div className="cards-section">
                    <Card onClick={() => handleNavigate('/container-dash')}>
                        <h3>Real-time Container Updates</h3>
                        <p>Stay informed with the latest container statuses.</p>
                    </Card>
                    <Card onClick={() => handleNavigate('/ship-dash')}>
                        <h3>Real-time Ship Updates</h3>
                        <p>Stay informed with the latest Ship statuses.</p>
                    </Card>
                    <Card onClick={() => handleNavigate('/process-dash')}>
                        <h3>Downtime Updates</h3>
                        <p>Enhanced Operations Management Dashboard</p>
                    </Card>
                    <Card onClick={() => handleNavigate('/product-dash')}>
                        <h3>Machine Updates</h3>
                        <p>Enhanced Machine Management Dashboard</p>
                    </Card>
                    <Card onClick={() => handleNavigate('/product-dash')}>
                        <h3>Real-time Shipment Updates</h3>
                        <p>Enhanced Product Management Dashboard</p>
                    </Card>
                    <Card onClick={() => handleNavigate('/operation-dash')}>
                        <h3>Operation Tracking System</h3>
                        <p>Enhanced Operations Management Dashboard</p>
                    </Card>
                </div>
            </div>
        </div>
    );
}

function Header() {
    const navigate = useNavigate();

    const handleLogOut = () => {
        logout();
        navigate('/');
    };

    return (
        <header className="navbar">
            <div className="logo">
                <Icon />
                <span>MyPort Manager</span>
            </div>
            <nav className="nav-links">
                <LogoutButton onClick={handleLogOut} />
            </nav>
        </header>
    );
}

function ActionButton({ label, active }) {
    return (
        <button className={`action-button ${active ? 'active' : ''}`}>
            {label}
        </button>
    );
}

function LogoutButton({ onClick }) {
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
            Log Out
        </button>
    );
}
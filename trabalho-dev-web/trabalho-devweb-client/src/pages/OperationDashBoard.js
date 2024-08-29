import React from 'react';
import axios from 'axios';
import '../styles/containerdashdoard.css';
import { useState, useEffect } from 'react';
import { getUser, getPassword } from "../helpers/Utils";

function OperationDashBoard() {
    return (
        <div className="dashboard-page">
            <div className="main-content">
                <Header />
                <DashboardContent />
            </div>
        </div>
    );
}

function NavLink({ label }) {
    if (label === "Containers") return <a href="container-dash">{label}</a>;
    if (label === "Processes") return <a href="process-dash">{label}</a>;
    if (label === "Products") return <a href="product-dash">{label}</a>;
    if (label === "Ships") return <a href="ship-dash">{label}</a>;
    if (label === "Home") return <a href="home">{label}</a>;
}

function Header() {
    return (
        <div className="header">
            <input
                type="text"
                className="search-bar"
                placeholder="Search resources..."
            />
            <div className="header-icons">
                <nav className="nav-links">
                    <NavLink label="Containers"/>
                    <NavLink label="Processes"/>  
                    <NavLink label="Products"/>  
                    <NavLink label="Ships"/>  
                    <NavLink label="Home"/>
                </nav>
            </div>
        </div>
    );
}

function DashboardContent() {
    const [OperationsByShipType, setOperationsByShipType] = useState([]);
    const [DelayedOperations, setDelayedOperations] = useState([]);

    useEffect(() => {
        axios({
            method: 'get',
            url: 'http://localhost:8000/api/getOperationsbyShip',
            params: {},
            auth: {
                username: getUser(),
                password: getPassword()
            },
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
        .then((response) => {
            if(response.status === 200) {
                if(response.data["sucesso"] === 1) {
                    setOperationsByShipType(response.data["operations"]);
                    console.log(response.data["operations"]);
                } else {
                    console.error("Error fetching data:", response.data["erro"]);
                }
            } else {
                window.alert("Error fetching data from the server.");
            }
        })
        .catch((error) => {
            console.error("Axios error:", error);
            window.alert("An error occurred while fetching data.");
        });
        //=============================================================
        axios({
            method: 'get',
            url: 'http://localhost:8000/api/getOperationsDelays',
            params: {},
            auth: {
                username: getUser(),
                password: getPassword()
            },
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
        .then((response) => {
            if(response.status === 200) {
                if(response.data["sucesso"] === 1) {
                    setDelayedOperations(response.data["operations"]);
                    console.log(response.data["operations"]);
                } else {
                    console.error("Error fetching data:", response.data["erro"]);
                }
            } else {
                window.alert("Error fetching data from the server.");
            }
        })
        .catch((error) => {
            console.error("Axios error:", error);
            window.alert("An error occurred while fetching data.");
        });
    }, []); 

    return (
        <div className="dashboard">
            <div className="dashboard-header">
                <h2>Operation Dashboard</h2>
            </div>
            <div className="dashboard-content">
                <SummaryCard title="Operation per Ship Summary" data={OperationsByShipType} />
                <SummaryCard title="Delayed Operations Summary" data={DelayedOperations}/>
                <RightSidebar />
            </div>
        </div>
    );
}

function SummaryCard({ title, data }) {
    return (
        <div className="summary-card">
            <h3>{title}</h3>
            {data && data.length > 0 ? (
                <div className="location-summary-table">
                    {data.map((item) => (
                        <div key={item.idlocation} className="location-summary-row">
                            <span className="location-name">{item.modelname || "Op ID: "+item.idoperation}</span>
                            <span className="container-count">{item.totaloperacoes || item.duracaoatraso.minutes + " minutes"} </span>
                        </div>
                    ))}
                </div>
            ) : (
                <p>Loading data...</p>
            )}
        </div>
    );
}

function RightSidebar() {
    const [TotalOperations, setTotalOperations] = useState(null);
    const [DelayedOperations, setDelayedOperations] = useState(null);

    useEffect(() => {
        axios({
            method: 'get',
            url: 'http://localhost:8000/api/getTotalOperations',
            params: {},
            auth: {
                username: getUser(),
                password: getPassword()
            },
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
        .then((response) => {
            if(response.status === 200) {
                if(response.data["sucesso"] === 1) {
                    const totalOperations = response.data["operations"][0].numerototaloperacoes;
                    setTotalOperations(totalOperations);
                    console.log("Total Operations:", totalOperations);
                } else {
                    console.error("Error fetching data:", response.data["erro"]);
                }
            } else {
                window.alert("Error fetching data from the server.");
            }
        })
        .catch((error) => {
            console.error("Axios error:", error);
            window.alert("An error occurred while fetching data.");
        });
        //========================================================
        axios({
            method: 'get',
            url: 'http://localhost:8000/api/getTotalDelays',
            params: {},
            auth: {
                username: getUser(),
                password: getPassword()
            },
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
        .then((response) => {
            if(response.status === 200) {
                if(response.data["sucesso"] === 1) {
                    const DelayedOperations = response.data["operations"][0].delayedop;
                    setDelayedOperations(DelayedOperations);
                    console.log("Total Operations:", DelayedOperations);
                } else {
                    console.error("Error fetching data:", response.data["erro"]);
                }
            } else {
                window.alert("Error fetching data from the server.");
            }
        })
        .catch((error) => {
            console.error("Axios error:", error);
            window.alert("An error occurred while fetching data.");
        });
        
    }, []); 

    return (
        <div className="right-sidebar">
            <SmallCard 
                title="Total Operations" 
                count={TotalOperations !== null ? TotalOperations : "Loading..."} 
            />
            <SmallCard 
            title="Total Delayed" 
            count={DelayedOperations !== null ? DelayedOperations : "Loading..."} 
            />
        </div>
    );
}


function SmallCard({ title, count }) {
    return (
        <div className="small-card">
            <h4>{title}</h4>
            <div className="card-content">
                <div className="card-count">
                    {count !== null ? count : "Loading..."} {/* Display count or loading state */}
                </div>
                <div className="view-all">View All</div>
            </div>
        </div>
    );
}

export default OperationDashBoard;
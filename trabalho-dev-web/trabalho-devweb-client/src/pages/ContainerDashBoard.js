import React from 'react';
import axios from 'axios';
import '../styles/containerdashdoard.css';
import { useState, useEffect } from 'react';
import { getUser, getPassword } from "../helpers/Utils";

function ContainerDashBoard() {
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
    if (label === "Operations") return <a href="operation-dash">{label}</a>;
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
                    <NavLink label="Operations"/>
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
    const [ContainersLoc, setContLoc] = useState([]);
    const [ContainersType, setContType] = useState([]);

    useEffect(() => {
        axios({
            method: 'get',
            url: 'http://localhost:8000/api/getContainerByLocation',
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
                    setContLoc(response.data["containers"]);
                    console.log(response.data["containers"])
                    console.log(response.data["qtde_containers"])
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
        //=================================================================================
        axios({
            method: 'get',
            url: 'http://localhost:8000/api/getContainerByContainerType',
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
                    setContType(response.data["containers"]);
                    console.log(response.data["containers"])
                    console.log(response.data["qtde_containers"])
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
                <h2>Container Dashboard</h2>
            </div>
            <div className="dashboard-content">
                <SummaryCard title="Container Location Summary" data={ContainersLoc} />
                <SummaryCard title="Container Type Summary" data={ContainersType}/>
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
                            <span className="location-name">{item.cidade || item.name}</span>
                            <span className="container-count">{item.numberofcontainers}</span>
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
    const [AlertCount, setAlertCount] = useState(null);
    const [ContCount, setContCount] = useState(null);

    useEffect(() => {
        axios({
            method: 'get',
            url: 'http://localhost:8000/api/getContainerAlerts',
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
                    const alertData = response.data["alerts"];
                    if (alertData && alertData.length > 0) {
                        const alertCountValue = alertData[0].numberofcontainerswithfalseflag;
                        console.log("AlertCount from API:", alertCountValue);
                        setAlertCount(alertCountValue);
                    } else {
                        console.error("No alerts found in response data.");
                    }
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
            url: 'http://localhost:8000/api/getCountContainers',
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
                    const alertData = response.data["containers_qtde"];
                    if (alertData && alertData.length > 0) {
                        const alertCountValue = alertData[0].count;
                        console.log("AlertCount from API:", alertCountValue);
                        setContCount(alertCountValue);
                    } else {
                        console.error("No alerts found in response data.");
                    }
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
                title="Total Containers With Alerts" 
                count={AlertCount !== null ? AlertCount : "Loading..."} 
            />
            <SmallCard 
            title="Total Containers" 
            count={ContCount !== null ? ContCount : "Loading..."} 
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

export default ContainerDashBoard;
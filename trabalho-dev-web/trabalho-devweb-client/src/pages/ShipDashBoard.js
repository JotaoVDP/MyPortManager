import React from 'react';
import axios from 'axios';
import '../styles/containerdashdoard.css';
import { useState, useEffect } from 'react';
import { getUser, getPassword } from "../helpers/Utils";

function ShipDashBoard() {
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
    if (label === "Containers") return <a href="container-dash">{label}</a>;
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
                    <NavLink label="Containers"/>  
                    <NavLink label="Home"/>
                </nav>
            </div>
        </div>
    );
}

function DashboardContent() {
    const [Card1Data, setCard1Data] = useState([]);
    const [Card2Data, setCard2Data] = useState([]);

    useEffect(() => {
        axios({
            method: 'get',
            url: 'http://localhost:8000/api/getShipByType',
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
                    setCard1Data(response.data["ships"]);
                    console.log(response.data["ships"]);
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
            url: 'http://localhost:8000/api/getShipMaintenance',
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
                    setCard2Data(response.data["ships"]);
                    console.log(response.data["ships"]);
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
                <h2>Ships Dashboard</h2>
            </div>
            <div className="dashboard-content">
                <SummaryCard title="Ship Types Summary" data={Card1Data} />
                <SummaryCard title="Ship Maintenance Summary" data={Card2Data}/>
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
                            <span className="location-name">{item.modelname ||"Id Ship: "+item.idship}</span>
                            <span className="container-count">{item.totalnavios || "Last Maintained on: "+item.lastmaintenance} </span>
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
    const [SCard1Data, setSCard1Data] = useState(null);
    const [SCard2Data, setSCard2Data] = useState(null);

    useEffect(() => {
        axios({
            method: 'get',
            url: 'http://localhost:8000/api/getTotalShips',
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
                    const totalOperations = response.data["ships"][0].numerototalnavios;
                    setSCard1Data(totalOperations);
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
            url: 'http://localhost:8000/api/getUsedPercent',
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
                    const DelayedOperations = response.data["ships"][0].percentualnavioscomcontainers;
                    setSCard2Data(DelayedOperations);
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
                title="Total Ships" 
                count={SCard1Data !== null ? SCard1Data : "Loading..."} 
            />
            <SmallCard 
            title="Ship usage %" 
            count={SCard2Data !== null ? SCard2Data + "%" : "Loading..."} 
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

export default ShipDashBoard;
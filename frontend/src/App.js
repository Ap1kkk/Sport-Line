import React from "react";
import {BrowserRouter as Router, Link, Navigate, Route, Routes} from "react-router-dom";

import MainPage from "./pages/main-page/main_page";
import Profile from "./pages/all-profile-pages/ProfilePage/ProfilePage";
import Yandex_map from "./pages/map-page/yandex_map";
import Favorites from "./pages/favorites/favorites";
import Authorization from "./pages/Authorization/Authorization";
import Register from "./pages/Register/Register";
import Preferences from "./pages/Preferences/Preferences";
import Filters from "./pages/Filters/Filters";
import RoutesOnMap from "./pages/mapRoutes/routesOnMap";
import MapOfTheDay from "./pages/mapRoutes/mapOfTheDay";
import Statistics from "./pages/all-profile-pages/StatisticsPage/StatisticsPage";
import Achievements from "./pages/all-profile-pages/AchievementsPage/AchievementsPage";
import RouteHistory from "./pages/all-profile-pages/RouteHistoryPage/RouteHistoryPage";


function App() {
    return (
        <Router>
            <div style={styles.container}>
                <div style={styles.content}>
                    <Routes>
                        <Route path="/" element={<Navigate to="/main_page" replace/>}/>

                        <Route path="/Yandex_map" element={<Yandex_map/>}/>
                        <Route path="/favourites" element={<Favorites/>}/>
                        <Route path="/main_page" element={<MainPage/>}/>
                        <Route path="/login" element={<Authorization/>}/>
                        <Route path="/register" element={<Register/>}/>
                        <Route path="/register/preferences" element={<Preferences/>}/>
                        <Route path="/filters" element={<Filters/>}/>
                        <Route path="/map" element={<RoutesOnMap/>}/>
                        <Route path="/main_page/mapOfTheDay" element={<MapOfTheDay />}/>
                        <Route path="/ProfilePage" element={<Profile />}/>
                        <Route path="/StatisticsPage" element={<Statistics />} />
                        <Route path="/AchievementsPage" element={<Achievements />} />
                        <Route path="/RouteHistoryPage" element={<RouteHistory />} />
                    </Routes>
                </div>
                <nav style={styles.bottomNav}>
                    <Link to="/favourites" style={styles.navLink}>
                        <i className="fa fa-heart" style={styles.navIcon}></i>
                        <span>Избранное</span>
                    </Link>
                    <Link to="/yandex_map" style={styles.navLink}>
                        <i className="fa fa-map-marker" style={styles.navIcon}></i>
                        <span>Карта</span>
                    </Link>
                    <Link to="/map" style={styles.navLink}>
                        <i className="fa fa-heart" style={styles.navIcon}></i>
                        <span>Карта маршрута</span>
                    </Link>
                    <Link to="/" style={styles.navLink}>
                        <i className="fa fa-home" style={styles.navIcon}></i>
                        <span>Главная</span>
                    </Link>
                    <Link to="/login" style={styles.navLink}>
                        <i className="fa fa-heart" style={styles.navIcon}></i>
                        <span>Авторизация</span>
                    </Link>
                    <Link to="/ProfilePage" style={styles.navLink}>
                        <img
                            src="https://img.icons8.com/?size=100&id=ajQoFwOLAISL&format=png&color=000000"
                            alt="Profile"
                            style={styles.navImage}
                        />
                    </Link>
                </nav>
            </div>
        </Router>
    );
}

const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        margin: 0,
    },
    content: {
        flexGrow: 1,
        overflow: "auto",
        paddingBottom: '60px',
    },
    bottomNav: {
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        height: "60px",
        backgroundColor: "#bdbdbd",
        borderTop: "1px solid #ddd",
        boxSizing: "border-box",
        padding: "0 10px",
        zIndex: 1000,
    },
    navLink: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textDecoration: "none",
        color: "#000000",
        fontSize: "12px",
    },
    navIcon: {
        fontSize: "20px",
        marginBottom: "5px",
    },
    navImage: {
        width: '30px',
        height: '30px',
    }
};

export default App;

import React from "react";
import {BrowserRouter as Router, Link, Navigate, Route, Routes} from "react-router-dom";

import MainPage from "./pages/main-page/main_page";
import Profile from "./pages/all-profile-pages/ProfilePage/ProfilePage";
import Favorites from "./pages/favorites/favorites";
import Authorization from "./pages/Authorization/Authorization";
import Register from "./pages/Register/Register";
import Preferences from "./pages/Preferences/Preferences";
import Recommendation from "./pages/Filters/Recommendation";
import RoutesOnMap from "./pages/mapRoutes/routesOnMap";
import MapOfTheDay from "./pages/mapRoutes/mapOfTheDay";
import Statistics from "./pages/all-profile-pages/StatisticsPage/StatisticsPage";
import Achievements from "./pages/all-profile-pages/AchievementsPage/AchievementsPage";
import RouteHistory from "./pages/all-profile-pages/RouteHistoryPage/RouteHistoryPage";
import EditProfile from "./pages/all-profile-pages/EditProfilePage/EditProfilePage";
import Admin_workbench from "./pages/admin-page/admin_workbench";
import PopularRouts from "./pages/PopularRouts/PopularRouts";
import UserHistory from "./pages/UserHistory/UserHistory";
import UserLikeRouts from "./pages/UserLikeRouts/UserLikeRouts";

function App() {
    return (
        <Router>
                    <Routes>
                        <Route path="/" element={<Navigate to="/main_page" replace/>}/>
                        <Route path="/admin" element={<Admin_workbench/>}/>
                        <Route path="/favourites" element={<Favorites/>}/>
                        <Route path="/main_page" element={<MainPage/>}/>
                        <Route path="/login" element={<Authorization/>}/>
                        <Route path="/register" element={<Register/>}/>
                        <Route path="/register/preferences" element={<Preferences/>}/>
                        <Route path="/recommendation" element={<Recommendation/>}/>
                        <Route path="/popular" element={<PopularRouts />}/>
                        <Route path="/map" element={<RoutesOnMap/>}/>
                        <Route path="/main_page/mapOfTheDay/:routeId" element={<MapOfTheDay />}/>
                        <Route path="/ProfilePage" element={<Profile />}/>
                        <Route path="/StatisticsPage" element={<Statistics />} />
                        <Route path="/AchievementsPage" element={<Achievements />} />
                        <Route path="/RouteHistoryPage" element={<RouteHistory />} />
                        <Route path="/EditProfilePage" element={<EditProfile />} />
                        <Route path="/userHistory" element={<UserHistory/>} />
                        <Route path="/likeRouts" element={<UserLikeRouts/>} />
                    </Routes>
                <nav style={styles.bottomNav}>
                    <Link to="/favourites" style={styles.navLink}>
                        <img
                            src="https://img.icons8.com/ios-filled/50/like--v1.png"
                            alt="Profile"
                            style={styles.navImage}
                        />
                    </Link>
                    {/*<Link to="/admin" style={styles.navLink}>*/}
                    {/*    <i className="fa fa-map-marker" style={styles.navIcon}></i>*/}
                    {/*    <span>Карта</span>*/}
                    {/*</Link>*/}
                    <Link to="/main_page" style={styles.navLink}>
                        <img
                            src="https://img.icons8.com/ios/50/region-code.png"
                            alt="Profile"
                            style={styles.navImage}
                        />
                    </Link>
                    {/*<Link to="/login" style={styles.navLink}>*/}
                    {/*    <i className="fa fa-heart" style={styles.navIcon}></i>*/}
                    {/*    <span>Авторизация</span>*/}
                    {/*</Link>*/}
                    <Link to="/ProfilePage" style={styles.navLink}>
                        <img
                            src="https://img.icons8.com/pastel-glyph/64/user-male-circle.png"
                            alt="Profile"
                            style={styles.navImage}
                        />
                    </Link>
                </nav>
        </Router>
    );
}

const styles = {
    container: {
        display: "flex",
        height: "100vh",
    },
    bottomNav: {
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        height: "60px",
        backgroundColor: "#fff",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        boxShadow: "0 -2px 5px rgba(0, 0, 0, 0.1)",
        zIndex: 1000,
    },
    navLink: {
        textDecoration: "none",
        color: "#333",
        display: "flex",

        alignItems: "center",
        justifyContent: "center",
    },
    navImage: {
        width: "30px",
        height: "30px",
    },
    navIcon: {
        fontSize: "24px",
    },
};

export default App;

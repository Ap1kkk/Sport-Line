import React from "react";
import {BrowserRouter as Router, Link, Route, Routes} from "react-router-dom";

import MainPage from "./pages/main_page";
import Profile from "./pages/all-profile-pages/ProfilePage";
import Yandex_map from "./pages/map-page/yandex_map";

function App() {
    return (
        <Router>
            <div>
                <nav>
                    <Link to="/main_page">Main page</Link>
                    <Link to="/yandex_map">Map</Link>
                    <Link to="/all-profilePage-pages/profilePage">Profile</Link>
                </nav>
                <Routes>
                    <Route path="/main_page" element={<MainPage />} />
                    <Route path="/all-profilePage-pages/profilePage" element={<Profile />} />
                    <Route path="/Yandex_map" element={<Yandex_map />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;

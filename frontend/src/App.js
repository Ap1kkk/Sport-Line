import React from "react";
import {BrowserRouter as Router, Link, Route, Routes} from "react-router-dom";

import MainPage from "./pages/main_page";
import Profile from "./pages/profile";
import Yandex_map from "./pages/map-page/yandex_map";

function App() {
    return (
        <Router>
            <div>
                <nav>
                    <Link to="/main_page">Main page</Link>
                    <Link to="/yandex_map">Map</Link>
                    <Link to="/profile">Profile</Link>
                </nav>
                <Routes>
                    <Route path="/main_page" element={<MainPage />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/Yandex_map" element={<Yandex_map />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;

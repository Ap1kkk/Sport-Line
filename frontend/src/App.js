import React from "react";
import {BrowserRouter as Router, Link, Route, Routes} from "react-router-dom";

import MainPage from "./pages/main_page";
import Profile from "./pages/profile";

function App() {
    return (
        <Router>
            <div>
                <nav>
                    <Link to="/main_page">Main page</Link>
                    <Link to="/profile">Profile</Link>
                </nav>
                <Routes>
                    <Route path="/main_page" element={<MainPage />} />
                    <Route path="/profile" element={<Profile />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;

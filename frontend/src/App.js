import React from "react";
import {BrowserRouter as Router, Link, Navigate, Route, Routes, useLocation} from "react-router-dom";

import MainPage from "./pages/main-page/main_page";
import Profile from "./pages/all-profile-pages/ProfilePage/ProfilePage";
import Favorites from "./pages/favorites/favorites";
import Authorization from "./pages/Authorization/Authorization";
import Register from "./pages/Register/Register";
import Preferences from "./pages/Preferences/Preferences";
import RoutesOnMap from "./pages/mapRoutes/routesOnMap";
import Statistics from "./pages/all-profile-pages/StatisticsPage/StatisticsPage";
import Achievements from "./pages/all-profile-pages/AchievementsPage/AchievementsPage";
import RouteHistory from "./pages/all-profile-pages/RouteHistoryPage/RouteHistoryPage";
import EditProfile from "./pages/all-profile-pages/EditProfilePage/EditProfilePage";
import Admin_workbench from "./pages/admin-page/admin_workbench";
import Recommendation from "./pages/Filters/Recommendation";
import PopularRouts from "./pages/PopularRouts/PopularRouts";
import UserHistory from "./pages/UserHistory/UserHistory";
import UserLikeRouts from "./pages/UserLikeRouts/UserLikeRouts";

function App() {
    return (
        <Router>
            <AppComponent />
        </Router>
    );
}

function AppComponent() {
    const location = useLocation();
    const isActive = (path) => location.pathname === path;
    return (
        <>
            <Routes>
                <Route path="/" element={<Navigate to="/main_page" replace/>}/>

                <Route path="/login" element={<Authorization/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/register/preferences" element={<Preferences/>}/>

                <Route path="/admin" element={<Admin_workbench/>}/>
                <Route path="/main_page" element={<MainPage/>}/>

                <Route path="/map/:routeId" element={<RoutesOnMap/>}/>

                <Route path="/main_page/recomendation" element={<Recommendation/>}/>
                <Route path="/favourites" element={<Favorites/>}/>
                <Route path="/main_page/popular" element={<PopularRouts/>}/>
                <Route path="/history" element={<UserHistory/>}/>
                <Route path="/user_like" element={<UserLikeRouts/>}/>

                <Route path="/profile_page" element={<Profile />}/>
                <Route path="/profile_page/statistics_page" element={<Statistics />} />
                <Route path="/profile_page/achievements_page" element={<Achievements />} />
                <Route path="/profile_page/route_history_page" element={<RouteHistory />} />
                <Route path="/profile_page/edit_profile_page" element={<EditProfile />} />
            </Routes>
            <nav style={styles.bottomNav}>
            <Link to="/favourites" style={styles.navLink}>
                <svg width="57" height="49" viewBox="0 0 57 49" fill={isActive("/favourites") ? "#2975CC" : "#99A2AD"} xmlns="http://www.w3.org/2000/svg">
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                              d="M18.1979 14.6271C18.1979 10.6896 21.2591 7.65625 24.85 7.65625C26.7009 7.65625 28.331 8.63625 29.5 9.905C30.6689 8.63625 32.2977 7.65625 34.15 7.65625C37.7408 7.65625 40.802 10.6896 40.802 14.6271C40.802 17.325 39.7829 19.6963 38.3711 21.7029C36.9632 23.7038 35.1187 25.4027 33.3543 26.7837C32.6788 27.3117 31.998 27.7973 31.3729 28.156C30.7878 28.4929 30.1135 28.8021 29.5 28.8021C28.8864 28.8021 28.2135 28.4929 27.627 28.156C26.9416 27.747 26.2802 27.2886 25.6469 26.7837C23.8812 25.4027 22.038 23.7038 20.6288 21.7029C19.217 19.6963 18.1979 17.325 18.1979 14.6271ZM24.85 9.84375C22.1633 9.84375 20.1354 12.075 20.1354 14.6271C20.1354 16.6731 20.9052 18.5792 22.1452 20.3408C23.3878 22.1054 25.0605 23.6644 26.75 24.9856C27.3894 25.4858 27.99 25.9102 28.5067 26.2077C29.0595 26.5256 29.3798 26.6146 29.5 26.6146C29.6201 26.6146 29.9404 26.5256 30.4945 26.2062C31.1035 25.8439 31.6903 25.4361 32.2512 24.9856C33.9394 23.6644 35.6121 22.1069 36.8547 20.3408C38.0947 18.5792 38.8645 16.6731 38.8645 14.6271C38.8645 12.075 36.8366 9.84375 34.15 9.84375C32.6077 9.84375 31.1662 10.8835 30.2685 12.2048C30.178 12.3379 30.0617 12.4457 29.9284 12.5199C29.7951 12.5941 29.6485 12.6327 29.5 12.6327C29.3514 12.6327 29.2048 12.5941 29.0715 12.5199C28.9382 12.4457 28.8219 12.3379 28.7314 12.2048C27.8337 10.8835 26.3935 9.84375 24.85 9.84375Z"
                            fill={isActive("/favourites") ? "#2975CC" : "#99A2AD"}/>
                        <path
                            d="M7.45078 45H6.32285V40.0586C6.32285 39.9609 6.32448 39.8503 6.32773 39.7266C6.33424 39.5996 6.34075 39.4873 6.34727 39.3896H6.30332C6.261 39.4743 6.21055 39.5654 6.15195 39.6631C6.09661 39.7607 6.03639 39.86 5.97129 39.9609L2.77305 45H1.59141V37.8906H2.71445V42.7637C2.71445 42.8613 2.7112 42.9899 2.70469 43.1494C2.70143 43.3057 2.69818 43.4326 2.69492 43.5303H2.73887C2.77793 43.4489 2.82839 43.3512 2.89023 43.2373C2.95534 43.1201 3.01881 43.0111 3.08066 42.9102L6.26914 37.8906H7.45078V45ZM10.9943 45.1465C10.2163 45.1465 9.63366 44.9642 9.24629 44.5996C8.86217 44.2318 8.67012 43.8118 8.67012 43.3398V43.3154H9.73457V43.3398C9.73457 43.5905 9.8306 43.8151 10.0227 44.0137C10.218 44.209 10.5402 44.3066 10.9895 44.3066C11.3866 44.3066 11.6844 44.2318 11.883 44.082C12.0848 43.9323 12.1857 43.724 12.1857 43.457C12.1857 43.2324 12.106 43.055 11.9465 42.9248C11.7902 42.7913 11.5266 42.7246 11.1555 42.7246H10.2766V41.9189H11.1164C11.4322 41.9189 11.66 41.8555 11.8 41.7285C11.9432 41.6016 12.0148 41.4242 12.0148 41.1963C12.0148 40.9391 11.9335 40.7454 11.7707 40.6152C11.6112 40.485 11.3638 40.4199 11.0285 40.4199C10.6216 40.4199 10.3221 40.516 10.1301 40.708C9.93802 40.9001 9.84199 41.1279 9.84199 41.3916V41.416H8.78242V41.3916C8.78242 40.8968 8.97448 40.472 9.35859 40.1172C9.74271 39.7591 10.3042 39.5801 11.0432 39.5801C11.7007 39.5801 12.2102 39.7119 12.5715 39.9756C12.9361 40.236 13.1184 40.6152 13.1184 41.1133C13.1184 41.4062 13.0272 41.6553 12.8449 41.8604C12.6659 42.0654 12.4201 42.2038 12.1076 42.2754V42.29C12.4787 42.3454 12.7668 42.4772 12.9719 42.6855C13.177 42.8906 13.2795 43.1543 13.2795 43.4766C13.2795 44.0039 13.0712 44.4141 12.6545 44.707C12.2411 45 11.6877 45.1465 10.9943 45.1465ZM15.3436 42.4219V42.5781C15.3436 43.0632 15.4705 43.4684 15.7244 43.7939C15.9783 44.1195 16.3559 44.2822 16.8572 44.2822C17.3585 44.2822 17.7361 44.1195 17.99 43.7939C18.2439 43.4684 18.3709 43.0632 18.3709 42.5781V42.4219C18.3709 41.9401 18.2439 41.5381 17.99 41.2158C17.7361 40.8903 17.3585 40.7275 16.8572 40.7275C16.3559 40.7275 15.9783 40.8903 15.7244 41.2158C15.4705 41.5381 15.3436 41.9401 15.3436 42.4219ZM17.077 39.8633C17.7866 39.8633 18.3644 40.1025 18.8104 40.5811C19.2596 41.0563 19.4842 41.6699 19.4842 42.4219V42.5781C19.4842 43.3301 19.2449 43.9469 18.7664 44.4287C18.2911 44.9072 17.6548 45.1465 16.8572 45.1465C16.0434 45.1465 15.4021 44.9023 14.9334 44.4141C14.4646 43.9258 14.2303 43.1738 14.2303 42.1582V41.875C14.2303 40.7129 14.437 39.8063 14.8504 39.1553C15.2671 38.5042 16.0027 38.0973 17.0574 37.9346C17.6466 37.8434 17.9884 37.7686 18.0828 37.71C18.1772 37.6514 18.2326 37.5814 18.2488 37.5H19.2156C19.1831 37.8971 19.0415 38.1982 18.7908 38.4033C18.5402 38.6084 18.0372 38.7598 17.282 38.8574C16.452 38.9681 15.8937 39.2057 15.6072 39.5703C15.3208 39.9316 15.1531 40.4053 15.1043 40.9912H15.158C15.324 40.6299 15.5698 40.3516 15.8953 40.1562C16.2241 39.9609 16.618 39.8633 17.077 39.8633ZM20.7426 47.0312V39.7266H21.7387L21.7826 40.3906H21.807C21.9405 40.179 22.1488 40 22.432 39.8535C22.7185 39.7038 23.0505 39.6289 23.4281 39.6289C24.1215 39.6289 24.6765 39.8779 25.0932 40.376C25.5098 40.874 25.7182 41.5104 25.7182 42.2852V42.4414C25.7182 43.2129 25.5098 43.8493 25.0932 44.3506C24.6765 44.8486 24.1231 45.0977 23.433 45.0977C23.0587 45.0977 22.7364 45.0358 22.4662 44.9121C22.196 44.7852 21.9828 44.6143 21.8266 44.3994V47.0312H20.7426ZM21.8266 43.3691C21.9307 43.5938 22.0984 43.7939 22.3295 43.9697C22.5639 44.1455 22.8454 44.2334 23.1742 44.2334C23.6658 44.2334 24.0255 44.0641 24.2533 43.7256C24.4844 43.3838 24.6 42.9574 24.6 42.4463V42.2754C24.6 41.7676 24.4844 41.3444 24.2533 41.0059C24.0255 40.6641 23.6658 40.4932 23.1742 40.4932C22.8422 40.4932 22.5606 40.5811 22.3295 40.7568C22.0984 40.9326 21.9307 41.1328 21.8266 41.3574V43.3691ZM26.7031 43.4473C26.7031 42.9036 26.9277 42.4821 27.377 42.1826C27.8262 41.8831 28.3958 41.7334 29.0859 41.7334H30.2773V41.3477C30.2773 41.0677 30.196 40.8398 30.0332 40.6641C29.8704 40.485 29.5905 40.3955 29.1934 40.3955C28.7995 40.3955 28.5179 40.4736 28.3486 40.6299C28.1794 40.7861 28.0947 40.9668 28.0947 41.1719V41.2061H27.0059V41.1719C27.0059 40.7422 27.2061 40.3695 27.6064 40.0537C28.0101 39.738 28.5505 39.5801 29.2275 39.5801C29.9014 39.5801 30.4255 39.7282 30.7998 40.0244C31.1774 40.3174 31.3662 40.7585 31.3662 41.3477V43.8281C31.3662 44.0397 31.3825 44.2399 31.415 44.4287C31.4508 44.6175 31.498 44.7819 31.5566 44.9219V45H30.502C30.4531 44.9186 30.4108 44.8112 30.375 44.6777C30.3392 44.5443 30.3148 44.4141 30.3018 44.2871C30.1781 44.4987 29.9714 44.6875 29.6816 44.8535C29.3952 45.0163 29.0273 45.0977 28.5781 45.0977C28.0573 45.0977 27.6146 44.9577 27.25 44.6777C26.8854 44.3945 26.7031 43.9844 26.7031 43.4473ZM27.792 43.3936C27.792 43.6702 27.8766 43.8883 28.0459 44.0479C28.2184 44.2041 28.4837 44.2822 28.8418 44.2822C29.2096 44.2822 29.54 44.1634 29.833 43.9258C30.1292 43.6882 30.2773 43.4342 30.2773 43.1641V42.4707H29.1982C28.736 42.4707 28.3861 42.5537 28.1484 42.7197C27.9108 42.8857 27.792 43.1104 27.792 43.3936ZM32.9469 39.7266H34.0309V41.9043H36.3697V39.7266H37.4537V45H36.3697V42.7393H34.0309V45H32.9469V39.7266ZM39.0344 39.7266H40.1184V41.9043H42.4572V39.7266H43.5412V45H42.4572V42.7393H40.1184V45H39.0344V39.7266ZM44.8143 42.4414V42.2852C44.8143 41.4844 45.0535 40.8333 45.532 40.332C46.0105 39.8307 46.6469 39.5801 47.4412 39.5801C48.2355 39.5801 48.8719 39.8307 49.3504 40.332C49.8289 40.8333 50.0682 41.4844 50.0682 42.2852V42.4414C50.0682 43.2389 49.8289 43.89 49.3504 44.3945C48.8719 44.8958 48.2355 45.1465 47.4412 45.1465C46.6469 45.1465 46.0105 44.8958 45.532 44.3945C45.0535 43.89 44.8143 43.2389 44.8143 42.4414ZM45.9324 42.2754V42.4463C45.9324 42.9704 46.0594 43.4082 46.3133 43.7598C46.5672 44.1081 46.9432 44.2822 47.4412 44.2822C47.9425 44.2822 48.3201 44.1081 48.574 43.7598C48.8279 43.4082 48.9549 42.9704 48.9549 42.4463V42.2754C48.9549 41.7546 48.8263 41.32 48.5691 40.9717C48.3152 40.6201 47.9393 40.4443 47.4412 40.4443C46.9432 40.4443 46.5672 40.6201 46.3133 40.9717C46.0594 41.32 45.9324 41.7546 45.9324 42.2754ZM51.0434 42.4414V42.2852C51.0434 41.4876 51.2745 40.8382 51.7367 40.3369C52.199 39.8324 52.8061 39.5801 53.558 39.5801C54.3165 39.5801 54.9008 39.8161 55.3109 40.2881C55.7243 40.7568 55.9311 41.3932 55.9311 42.1973V42.627H51.7465V41.8213H54.8373V41.7773C54.8373 41.4062 54.7364 41.0889 54.5346 40.8252C54.3327 40.5583 54.0089 40.4248 53.5629 40.4248C53.0974 40.4248 52.7426 40.6022 52.4984 40.957C52.2576 41.3118 52.1371 41.7513 52.1371 42.2754V42.4463C52.1371 42.9704 52.2657 43.4098 52.5229 43.7646C52.78 44.1195 53.1739 44.2969 53.7045 44.2969C54.0365 44.2969 54.323 44.2253 54.5639 44.082C54.8048 43.9388 55.0001 43.7712 55.1498 43.5791L55.8627 44.1357C55.6934 44.3929 55.4232 44.6257 55.0521 44.834C54.6811 45.0423 54.2318 45.1465 53.7045 45.1465C52.8484 45.1465 52.1908 44.8958 51.7318 44.3945C51.2729 43.89 51.0434 43.2389 51.0434 42.4414Z"
                            fill={isActive("/favourites") ? "#2975CC" : "#99A2AD"}/>
                    </svg>
                </Link>
                <Link to="/main_page" style={styles.navLink}>
                    <svg width="121" height="42" viewBox="0 0 121 42" fill={isActive("/main_page") ? "#2975CC" : "#99A2AD"} xmlns="http://www.w3.org/2000/svg">
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M55.6156 14.9999C56.681 14.9999 57.2392 15.1077 57.8205 15.4187C58.3615 15.708 58.792 16.1385 59.0813 16.6794C59.3922 17.2608 59.5 17.8189 59.5 18.8843V21.1156C59.5 22.181 59.3922 22.7391 59.0813 23.3205C58.792 23.8614 58.3615 24.2919 57.8205 24.5812C57.2392 24.8922 56.681 24.9999 55.6156 24.9999H53.3844C52.319 24.9999 51.7608 24.8922 51.1794 24.5812C50.6385 24.2919 50.208 23.8614 49.9187 23.3205C49.6078 22.7391 49.5 22.181 49.5 21.1156V18.8843C49.5 17.8189 49.6078 17.2608 49.9187 16.6794C50.208 16.1385 50.6385 15.708 51.1794 15.4187C51.7608 15.1077 52.319 14.9999 53.3844 14.9999H55.6156ZM67.6156 14.9999C68.681 14.9999 69.2392 15.1077 69.8206 15.4187C70.3615 15.708 70.792 16.1385 71.0813 16.6794C71.3922 17.2608 71.5 17.8189 71.5 18.8843V21.1156C71.5 22.181 71.3922 22.7391 71.0813 23.3205C70.792 23.8614 70.3615 24.2919 69.8206 24.5812C69.2392 24.8922 68.681 24.9999 67.6156 24.9999H65.3844C64.319 24.9999 63.7608 24.8922 63.1794 24.5812C62.6385 24.2919 62.208 23.8614 61.9187 23.3205C61.6078 22.7391 61.5 22.181 61.5 21.1156V18.8843C61.5 17.8189 61.6078 17.2608 61.9187 16.6794C62.208 16.1385 62.6385 15.708 63.1794 15.4187C63.7608 15.1077 64.319 14.9999 65.3844 14.9999H67.6156ZM55.6156 16.9999H53.3844C52.6209 16.9999 52.3747 17.0475 52.1226 17.1823C51.9302 17.2852 51.7852 17.4302 51.6823 17.6226C51.5476 17.8746 51.5 18.1209 51.5 18.8843V21.1156C51.5 21.879 51.5476 22.1253 51.6823 22.3773C51.7852 22.5697 51.9302 22.7147 52.1226 22.8176C52.3747 22.9524 52.6209 22.9999 53.3844 22.9999H55.6156C56.3791 22.9999 56.6253 22.9524 56.8774 22.8176C57.0698 22.7147 57.2148 22.5697 57.3177 22.3773C57.4524 22.1253 57.5 21.879 57.5 21.1156V18.8843C57.5 18.1209 57.4524 17.8746 57.3177 17.6226C57.2148 17.4302 57.0698 17.2852 56.8774 17.1823C56.6253 17.0475 56.3791 16.9999 55.6156 16.9999ZM67.6156 16.9999H65.3844C64.6209 16.9999 64.3747 17.0475 64.1226 17.1823C63.9303 17.2852 63.7852 17.4302 63.6823 17.6226C63.5476 17.8746 63.5 18.1209 63.5 18.8843V21.1156C63.5 21.879 63.5476 22.1253 63.6823 22.3773C63.7852 22.5697 63.9303 22.7147 64.1226 22.8176C64.3747 22.9524 64.6209 22.9999 65.3844 22.9999H67.6156C68.3791 22.9999 68.6253 22.9524 68.8774 22.8176C69.0697 22.7147 69.2148 22.5697 69.3177 22.3773C69.4524 22.1253 69.5 21.879 69.5 21.1156V18.8843C69.5 18.1209 69.4524 17.8746 69.3177 17.6226C69.2148 17.4302 69.0697 17.2852 68.8774 17.1823C68.6253 17.0475 68.3791 16.9999 67.6156 16.9999ZM67.3915 2.4125C68.0224 2.60375 68.4933 2.92221 69.2467 3.67555L70.8244 5.25328C71.5777 6.00662 71.8962 6.47752 72.0874 7.10847C72.2654 7.69553 72.2654 8.30436 72.0874 8.89143C71.8962 9.52238 71.5777 9.99327 70.8244 10.7466L69.2467 12.3244C68.4933 13.0777 68.0224 13.3962 67.3915 13.5874C66.8044 13.7653 66.1956 13.7653 65.6085 13.5874C64.9776 13.3962 64.5067 13.0777 63.7533 12.3244L62.1756 10.7466C61.4223 9.99327 61.1038 9.52238 60.9126 8.89143C60.7346 8.30436 60.7346 7.69553 60.9126 7.10847C61.1038 6.47752 61.4223 6.00662 62.1756 5.25328L63.7533 3.67555C64.5067 2.92221 64.9776 2.60375 65.6085 2.4125C66.1956 2.23457 66.8044 2.23457 67.3915 2.4125ZM55.6156 2.99995C56.681 2.99995 57.2392 3.10773 57.8205 3.41866C58.3615 3.70796 58.792 4.13846 59.0813 4.6794C59.3922 5.26078 59.5 5.81894 59.5 6.88432V9.11558C59.5 10.181 59.3922 10.7391 59.0813 11.3205C58.792 11.8614 58.3615 12.2919 57.8205 12.5812C57.2392 12.8922 56.681 12.9999 55.6156 12.9999H53.3844C52.319 12.9999 51.7608 12.8922 51.1794 12.5812C50.6385 12.2919 50.208 11.8614 49.9187 11.3205C49.6078 10.7391 49.5 10.181 49.5 9.11558V6.88432C49.5 5.81894 49.6078 5.26078 49.9187 4.6794C50.208 4.13846 50.6385 3.70796 51.1794 3.41866C51.7608 3.10773 52.319 2.99995 53.3844 2.99995H55.6156ZM66.1887 4.32652C65.9151 4.40942 65.7074 4.54992 65.1675 5.08976L63.5898 6.6675C63.05 7.20734 62.9095 7.41508 62.8266 7.6886C62.7633 7.89741 62.7633 8.10249 62.8266 8.3113C62.9095 8.58481 63.05 8.79256 63.5898 9.3324L65.1675 10.9101C65.7074 11.45 65.9151 11.5905 66.1887 11.6734C66.3975 11.7367 66.6025 11.7367 66.8113 11.6734C67.0849 11.5905 67.2926 11.45 67.8325 10.9101L69.4102 9.3324C69.95 8.79256 70.0905 8.58481 70.1734 8.3113C70.2367 8.10249 70.2367 7.89741 70.1734 7.6886C70.0905 7.41508 69.95 7.20734 69.4102 6.6675L67.8325 5.08976C67.2926 4.54992 67.0849 4.40942 66.8113 4.32652C66.6025 4.26323 66.3975 4.26323 66.1887 4.32652ZM55.6156 4.99995H53.3844C52.6209 4.99995 52.3747 5.0475 52.1226 5.18229C51.9302 5.28518 51.7852 5.4302 51.6823 5.6226C51.5476 5.87462 51.5 6.12087 51.5 6.88432V9.11558C51.5 9.87903 51.5476 10.1253 51.6823 10.3773C51.7852 10.5697 51.9302 10.7147 52.1226 10.8176C52.3747 10.9524 52.6209 10.9999 53.3844 10.9999H55.6156C56.3791 10.9999 56.6253 10.9524 56.8774 10.8176C57.0698 10.7147 57.2148 10.5697 57.3177 10.3773C57.4524 10.1253 57.5 9.87903 57.5 9.11558V6.88432C57.5 6.12087 57.4524 5.87462 57.3177 5.6226C57.2148 5.4302 57.0698 5.28518 56.8774 5.18229C56.6253 5.0475 56.3791 4.99995 55.6156 4.99995Z"
                            fill={isActive("/main_page") ? "#2975CC" : "#99A2AD"}/>
                        <path
                            d="M38.9562 35.6553V35.2354C38.9562 34.1351 39.2541 33.279 39.8498 32.667C40.4455 32.0518 41.1942 31.7441 42.0959 31.7441C42.9976 31.7441 43.6942 31.9785 44.1857 32.4473C44.6773 32.916 44.9442 33.4889 44.9865 34.166L44.9914 34.2246H43.8586L43.8537 34.166C43.8309 33.7656 43.6779 33.4157 43.3947 33.1162C43.1148 32.8167 42.6818 32.667 42.0959 32.667C41.5132 32.667 41.0347 32.8867 40.6604 33.3262C40.286 33.7656 40.0988 34.3971 40.0988 35.2207V35.6699C40.0988 36.474 40.2844 37.1006 40.6555 37.5498C41.0298 37.999 41.51 38.2236 42.0959 38.2236C42.6721 38.2236 43.1001 38.0723 43.3801 37.7695C43.66 37.4668 43.8179 37.1185 43.8537 36.7246L43.8586 36.666H44.9914L44.9865 36.7246C44.9279 37.3984 44.6561 37.9714 44.1711 38.4434C43.6893 38.9121 42.9976 39.1465 42.0959 39.1465C41.1942 39.1465 40.4455 38.8405 39.8498 38.2285C39.2541 37.6133 38.9562 36.7555 38.9562 35.6553ZM45.9568 36.4414V36.2852C45.9568 35.4876 46.188 34.8382 46.6502 34.3369C47.1124 33.8324 47.7195 33.5801 48.4715 33.5801C49.2299 33.5801 49.8143 33.8161 50.2244 34.2881C50.6378 34.7568 50.8445 35.3932 50.8445 36.1973V36.627H46.66V35.8213H49.7508V35.7773C49.7508 35.4062 49.6499 35.0889 49.448 34.8252C49.2462 34.5583 48.9223 34.4248 48.4764 34.4248C48.0109 34.4248 47.6561 34.6022 47.4119 34.957C47.171 35.3118 47.0506 35.7513 47.0506 36.2754V36.4463C47.0506 36.9704 47.1792 37.4098 47.4363 37.7646C47.6935 38.1195 48.0874 38.2969 48.618 38.2969C48.95 38.2969 49.2365 38.2253 49.4773 38.082C49.7182 37.9388 49.9135 37.7712 50.0633 37.5791L50.7762 38.1357C50.6069 38.3929 50.3367 38.6257 49.9656 38.834C49.5945 39.0423 49.1453 39.1465 48.618 39.1465C47.7618 39.1465 47.1043 38.8958 46.6453 38.3945C46.1863 37.89 45.9568 37.2389 45.9568 36.4414ZM52.0053 41.0312V33.7266H53.0014L53.0453 34.3906H53.0697C53.2032 34.179 53.4115 34 53.6947 33.8535C53.9812 33.7038 54.3132 33.6289 54.6908 33.6289C55.3842 33.6289 55.9392 33.8779 56.3559 34.376C56.7725 34.874 56.9809 35.5104 56.9809 36.2852V36.4414C56.9809 37.2129 56.7725 37.8493 56.3559 38.3506C55.9392 38.8486 55.3858 39.0977 54.6957 39.0977C54.3214 39.0977 53.9991 39.0358 53.7289 38.9121C53.4587 38.7852 53.2455 38.6143 53.0893 38.3994V41.0312H52.0053ZM53.0893 37.3691C53.1934 37.5938 53.3611 37.7939 53.5922 37.9697C53.8266 38.1455 54.1081 38.2334 54.4369 38.2334C54.9284 38.2334 55.2881 38.0641 55.516 37.7256C55.7471 37.3838 55.8627 36.9574 55.8627 36.4463V36.2754C55.8627 35.7676 55.7471 35.3444 55.516 35.0059C55.2881 34.6641 54.9284 34.4932 54.4369 34.4932C54.1049 34.4932 53.8233 34.5811 53.5922 34.7568C53.3611 34.9326 53.1934 35.1328 53.0893 35.3574V37.3691ZM58.249 39V33.7266H60.6465C61.2552 33.7266 61.7256 33.8438 62.0576 34.0781C62.3929 34.3092 62.5605 34.6527 62.5605 35.1084C62.5605 35.4144 62.4727 35.6683 62.2969 35.8701C62.1211 36.0687 61.8818 36.2021 61.5791 36.2705V36.2852C61.9404 36.3438 62.2236 36.4772 62.4287 36.6855C62.637 36.8906 62.7412 37.1576 62.7412 37.4863C62.7412 37.9551 62.5671 38.3245 62.2188 38.5947C61.8737 38.8649 61.4033 39 60.8076 39H58.249ZM59.3281 35.9238H60.5635C60.8825 35.9238 61.112 35.8604 61.252 35.7334C61.3919 35.6064 61.4619 35.429 61.4619 35.2012C61.4619 34.9798 61.3919 34.8154 61.252 34.708C61.112 34.6006 60.8825 34.5436 60.5635 34.5371H59.3281V35.9238ZM59.3281 38.1895H60.7148C61.0404 38.1895 61.278 38.1243 61.4277 37.9941C61.5775 37.8639 61.6523 37.6833 61.6523 37.4521C61.6523 37.2243 61.5775 37.0452 61.4277 36.915C61.2812 36.7848 61.0436 36.7197 60.7148 36.7197H59.3281V38.1895ZM64.024 39V33.7266H65.108V36.8809C65.108 36.9818 65.1064 37.0973 65.1031 37.2275C65.0999 37.3545 65.0966 37.4668 65.0934 37.5645H65.1373C65.1796 37.4798 65.2301 37.387 65.2887 37.2861C65.3473 37.182 65.4091 37.0762 65.4742 36.9688L67.5055 33.7266H68.6041V39H67.5201V35.8457C67.5201 35.748 67.5217 35.6357 67.525 35.5088C67.5283 35.3786 67.5315 35.263 67.5348 35.1621H67.4859C67.4436 35.25 67.3932 35.346 67.3346 35.4502C67.2792 35.5511 67.2174 35.6536 67.149 35.7578L65.1227 39H64.024ZM69.8723 36.4414V36.2852C69.8723 35.4844 70.1018 34.8333 70.5607 34.332C71.023 33.8307 71.6545 33.5801 72.4553 33.5801C73.2007 33.5801 73.7671 33.7705 74.1545 34.1514C74.5419 34.5322 74.7372 34.9587 74.7404 35.4307V35.4648H73.676V35.4355C73.676 35.1719 73.5783 34.9391 73.383 34.7373C73.191 34.5355 72.8801 34.4346 72.4504 34.4346C71.9523 34.4346 71.5845 34.612 71.3469 34.9668C71.1092 35.3184 70.9904 35.7546 70.9904 36.2754V36.4463C70.9904 36.9704 71.1076 37.4098 71.342 37.7646C71.5796 38.1162 71.9491 38.292 72.4504 38.292C72.8833 38.292 73.1958 38.1911 73.3879 37.9893C73.58 37.7874 73.676 37.5547 73.676 37.291V37.2617H74.7404V37.291C74.7404 37.7663 74.5451 38.1943 74.1545 38.5752C73.7671 38.9561 73.2007 39.1465 72.4553 39.1465C71.6545 39.1465 71.023 38.8958 70.5607 38.3945C70.1018 37.8932 69.8723 37.2422 69.8723 36.4414ZM76.9217 33.7266V35.5234H78.1131C78.7641 35.5234 79.2638 35.6797 79.6121 35.9922C79.9604 36.3014 80.1346 36.7214 80.1346 37.252C80.1346 37.7858 79.9604 38.2106 79.6121 38.5264C79.2638 38.8421 78.7641 39 78.1131 39H75.8377V33.7266H76.9217ZM78.035 36.3486H76.9217V38.1748H78.035C78.4028 38.1748 78.6616 38.0885 78.8113 37.916C78.9611 37.7402 79.0359 37.5189 79.0359 37.252C79.0359 36.9883 78.9611 36.7718 78.8113 36.6025C78.6616 36.4333 78.4028 36.3486 78.035 36.3486ZM80.7889 39V33.7266H81.8777V39H80.7889Z"
                            fill={isActive("/main_page") ? "#2975CC" : "#99A2AD"}/>
                    </svg>
                </Link>
                <Link to="/profile_page" style={styles.navLink}>
                    <svg width="121" height="42" viewBox="0 0 121 42" fill={isActive("/profile_page") ? "#2975CC" : "#99A2AD"} xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M60.5 2C67.1274 2 72.5 7.37258 72.5 14C72.5 20.6274 67.1274 26 60.5 26C53.8726 26 48.5 20.6274 48.5 14C48.5 7.37258 53.8726 2 60.5 2ZM60.5 20.5C58.4141 20.5 56.42 21.082 54.7032 22.149C56.3382 23.3146 58.339 24 60.5 24C62.6605 24 64.661 23.3148 66.296 22.15C64.5795 21.0818 62.5857 20.5 60.5 20.5ZM60.5 4C54.9772 4 50.5 8.47715 50.5 14C50.5 16.6157 51.5043 18.9968 53.1482 20.7788C55.2856 19.3082 57.831 18.5 60.5 18.5C63.1693 18.5 65.7149 19.3084 67.8527 20.7774C69.4961 18.9959 70.5 16.6152 70.5 14C70.5 8.47715 66.0228 4 60.5 4ZM60.5 7.5C63.1242 7.5 65.25 9.62584 65.25 12.25C65.25 14.8742 63.1242 17 60.5 17C57.8758 17 55.75 14.8742 55.75 12.25C55.75 9.62584 57.8758 7.5 60.5 7.5ZM60.5 9.5C58.9804 9.5 57.75 10.7304 57.75 12.25C57.75 13.7696 58.9804 15 60.5 15C62.0196 15 63.25 13.7696 63.25 12.25C63.25 10.7304 62.0196 9.5 60.5 9.5Z"
                            fill={isActive("/profile_page") ? "#2975CC" : "#99A2AD"}/>
                        <path
                            d="M38.717 39V31.8906H44.4348V39H43.3068V32.7842H39.84V39H38.717ZM46.1229 41.0312V33.7266H47.1189L47.1629 34.3906H47.1873C47.3208 34.179 47.5291 34 47.8123 33.8535C48.0988 33.7038 48.4308 33.6289 48.8084 33.6289C49.5018 33.6289 50.0568 33.8779 50.4734 34.376C50.8901 34.874 51.0984 35.5104 51.0984 36.2852V36.4414C51.0984 37.2129 50.8901 37.8493 50.4734 38.3506C50.0568 38.8486 49.5034 39.0977 48.8133 39.0977C48.4389 39.0977 48.1167 39.0358 47.8465 38.9121C47.5763 38.7852 47.3631 38.6143 47.2068 38.3994V41.0312H46.1229ZM47.2068 37.3691C47.311 37.5938 47.4786 37.7939 47.7098 37.9697C47.9441 38.1455 48.2257 38.2334 48.5545 38.2334C49.046 38.2334 49.4057 38.0641 49.6336 37.7256C49.8647 37.3838 49.9803 36.9574 49.9803 36.4463V36.2754C49.9803 35.7676 49.8647 35.3444 49.6336 35.0059C49.4057 34.6641 49.046 34.4932 48.5545 34.4932C48.2225 34.4932 47.9409 34.5811 47.7098 34.7568C47.4786 34.9326 47.311 35.1328 47.2068 35.3574V37.3691ZM52.059 36.4414V36.2852C52.059 35.4844 52.2982 34.8333 52.7768 34.332C53.2553 33.8307 53.8917 33.5801 54.6859 33.5801C55.4802 33.5801 56.1166 33.8307 56.5951 34.332C57.0736 34.8333 57.3129 35.4844 57.3129 36.2852V36.4414C57.3129 37.2389 57.0736 37.89 56.5951 38.3945C56.1166 38.8958 55.4802 39.1465 54.6859 39.1465C53.8917 39.1465 53.2553 38.8958 52.7768 38.3945C52.2982 37.89 52.059 37.2389 52.059 36.4414ZM53.1771 36.2754V36.4463C53.1771 36.9704 53.3041 37.4082 53.558 37.7598C53.8119 38.1081 54.1879 38.2822 54.6859 38.2822C55.1872 38.2822 55.5648 38.1081 55.8187 37.7598C56.0727 37.4082 56.1996 36.9704 56.1996 36.4463V36.2754C56.1996 35.7546 56.071 35.32 55.8139 34.9717C55.56 34.6201 55.184 34.4443 54.6859 34.4443C54.1879 34.4443 53.8119 34.6201 53.558 34.9717C53.3041 35.32 53.1771 35.7546 53.1771 36.2754ZM59.4014 36.4414C59.4014 36.9655 59.543 37.3952 59.8262 37.7305C60.1094 38.0658 60.5472 38.2497 61.1396 38.2822V34.4443C60.5472 34.4769 60.1094 34.6608 59.8262 34.9961C59.543 35.3314 59.4014 35.7594 59.4014 36.2803V36.4414ZM63.9668 36.2852C63.9668 35.7611 63.8252 35.3314 63.542 34.9961C63.2588 34.6608 62.821 34.4769 62.2285 34.4443V38.2822C62.821 38.2497 63.2588 38.0658 63.542 37.7305C63.8252 37.3952 63.9668 36.9671 63.9668 36.4463V36.2852ZM61.1396 39.1465C60.2477 39.1139 59.5479 38.8551 59.04 38.3701C58.5355 37.8851 58.2832 37.2422 58.2832 36.4414V36.2803C58.2832 35.4827 58.5355 34.8415 59.04 34.3564C59.5479 33.8714 60.2477 33.6126 61.1396 33.5801V31.5049H62.2285V33.5801C63.1204 33.6126 63.8187 33.8714 64.3232 34.3564C64.8278 34.8415 65.0801 35.4844 65.0801 36.2852V36.4463C65.0801 37.2438 64.8278 37.8851 64.3232 38.3701C63.8187 38.8551 63.1204 39.1139 62.2285 39.1465V41.0312H61.1396V39.1465ZM66.358 39V33.7266H67.442V36.8809C67.442 36.9818 67.4404 37.0973 67.4371 37.2275C67.4339 37.3545 67.4306 37.4668 67.4273 37.5645H67.4713C67.5136 37.4798 67.5641 37.387 67.6227 37.2861C67.6813 37.182 67.7431 37.0762 67.8082 36.9688L69.8395 33.7266H70.9381V39H69.8541V35.8457C69.8541 35.748 69.8557 35.6357 69.859 35.5088C69.8622 35.3786 69.8655 35.263 69.8688 35.1621H69.8199C69.7776 35.25 69.7271 35.346 69.6686 35.4502C69.6132 35.5511 69.5514 35.6536 69.483 35.7578L67.4566 39H66.358ZM73.9592 34.5615L73.8713 36.6172C73.8355 37.4798 73.7134 38.1097 73.5051 38.5068C73.2967 38.904 72.9322 39.1025 72.4113 39.1025C72.2941 39.1025 72.1916 39.0944 72.1037 39.0781C72.0158 39.0651 71.9377 39.0439 71.8693 39.0146V38.0771C71.9279 38.0999 71.9865 38.1162 72.0451 38.126C72.107 38.1357 72.1737 38.1406 72.2453 38.1406C72.4862 38.1406 72.6506 38.0251 72.7385 37.7939C72.8264 37.5596 72.8833 37.1234 72.9094 36.4854L73.0266 33.7266H76.9377V39H75.8488V34.5615H73.9592ZM79.6072 33.7266V35.5234H80.7986C81.4497 35.5234 81.9493 35.6797 82.2977 35.9922C82.646 36.3014 82.8201 36.7214 82.8201 37.252C82.8201 37.7858 82.646 38.2106 82.2977 38.5264C81.9493 38.8421 81.4497 39 80.7986 39H78.5232V33.7266H79.6072ZM80.7205 36.3486H79.6072V38.1748H80.7205C81.0883 38.1748 81.3471 38.0885 81.4969 37.916C81.6466 37.7402 81.7215 37.5189 81.7215 37.252C81.7215 36.9883 81.6466 36.7718 81.4969 36.6025C81.3471 36.4333 81.0883 36.3486 80.7205 36.3486Z"
                            fill={isActive("/profile_page") ? "#2975CC" : "#99A2AD"}/>
                    </svg>
                </Link>
            </nav>
        </>
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
        width: "100%",
    }
};

export default App;

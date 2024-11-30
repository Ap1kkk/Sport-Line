import React from "react";
import {BrowserRouter as Router, Link, Navigate, Route, Routes, useLocation} from "react-router-dom";

import MainPage from "./pages/main-page/main_page";
import Profile from "./pages/all-profile-pages/ProfilePage/ProfilePage";
import Authorization from "./pages/Authorization/Authorization";
import Register from "./pages/Register/Register";
import Preferences from "./pages/Preferences/Preferences";
import RoutesOnMap from "./pages/mapRoutes/routesOnMap";
import StatisticsPage from "./pages/all-profile-pages/StatisticsPage/StatisticsPage";
import Achievements from "./pages/all-profile-pages/AchievementsPage/AchievementsPage";
import EditProfile from "./pages/all-profile-pages/EditProfilePage/EditProfilePage";
import Admin_workbench from "./pages/admin-page/admin_workbench";
import Recommendation from "./pages/Filters/Recommendation";
import PopularRouts from "./pages/PopularRouts/PopularRouts";
import UserHistory from "./pages/UserHistory/UserHistory";
import UserLikeRouts from "./pages/UserLikeRouts/UserLikeRouts";
import SearchRouts from "./pages/SearchRouts/SearchRouts";

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
    const showNavigation = !["/login", "/register", "/map", "/map/:routeId"].includes(location.pathname);
    return (
        <>
            <Routes>
                <Route path="/" element={<Navigate to="/login" replace/>}/>

                <Route path="/login" element={<Authorization/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/register/preferences" element={<Preferences/>}/>

                <Route path="/admin" element={<Admin_workbench/>}/>
                <Route path="/main_page" element={<MainPage/>}/>

                <Route path="/map/:routeId" element={<RoutesOnMap/>}/>

                <Route path="/main_page/recomendation" element={<Recommendation/>}/>
                <Route path="/favourites" element={<UserLikeRouts/>}/>
                <Route path="/main_page/popular" element={<PopularRouts/>}/>
                <Route path="/history" element={<UserHistory/>}/>
                <Route path="/main_page/search_page" element={<SearchRouts />}/>

                <Route path="/profile_page" element={<Profile />}/>
                <Route path="/profile_page/statistics_page" element={<StatisticsPage />} />
                <Route path="/profile_page/achievements_page" element={<Achievements />} />
                <Route path="/profile_page/route_history_page" element={<UserHistory />} />
                <Route path="/profile_page/edit_profile_page" element={<EditProfile />} />
                <Route path="/main_page/history" element={<UserHistory />}/>
            </Routes>
            {showNavigation && (
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
                    <svg width="57" height="48" viewBox="0 0 57 48" fill={isActive("/main_page") ? "#2975CC" : "#99A2AD"}
                    xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M30.1295 2.69099L39.0662 11.1809C39.6624 11.7472 40 12.5335 40 13.3559V21.9972C40 23.3779 38.8807 24.4972 37.5 24.4972H31.5C30.9477 24.4972 30.5 24.0495 30.5 23.4972V17.9971C30.5 17.1687 29.8284 16.4971 29 16.4971C28.1716 16.4971 27.5 17.1687 27.5 17.9971V23.4972C27.5 24.0495 27.0523 24.4972 26.5 24.4972H20.5C19.1193 24.4972 18 23.3779 18 21.9972V13.3559C18 12.5335 18.3376 11.7472 18.9338 11.1809L27.8705 2.69099C28.5034 2.08966 29.4966 2.08966 30.1295 2.69099ZM29 4.37654L20.3113 12.6309C20.1125 12.8196 20 13.0817 20 13.3559V21.9972C20 22.2734 20.2239 22.4972 20.5 22.4972H25.5V17.9971C25.5 16.0641 27.067 14.4971 29 14.4971C30.933 14.4971 32.5 16.0641 32.5 17.9971V22.4972H37.5C37.7761 22.4972 38 22.2734 38 21.9972V13.3559C38 13.0817 37.8875 12.8196 37.6887 12.6309L29 4.37654Z"
                            fill={isActive("/main_page") ? "#2975CC" : "#99A2AD"}/>
                        <path
                            d="M8.71406 44V36.8906H13.3186V37.7793H9.83711V44H8.71406ZM15.866 39.5615L15.7781 41.6172C15.7423 42.4798 15.6202 43.1097 15.4119 43.5068C15.2036 43.904 14.839 44.1025 14.3182 44.1025C14.201 44.1025 14.0984 44.0944 14.0105 44.0781C13.9227 44.0651 13.8445 44.0439 13.7762 44.0146V43.0771C13.8348 43.0999 13.8934 43.1162 13.952 43.126C14.0138 43.1357 14.0805 43.1406 14.1521 43.1406C14.393 43.1406 14.5574 43.0251 14.6453 42.7939C14.7332 42.5596 14.7902 42.1234 14.8162 41.4854L14.9334 38.7266H18.8445V44H17.7557V39.5615H15.866ZM20.1469 42.4473C20.1469 41.9036 20.3715 41.4821 20.8207 41.1826C21.2699 40.8831 21.8396 40.7334 22.5297 40.7334H23.7211V40.3477C23.7211 40.0677 23.6397 39.8398 23.477 39.6641C23.3142 39.485 23.0342 39.3955 22.6371 39.3955C22.2432 39.3955 21.9617 39.4736 21.7924 39.6299C21.6231 39.7861 21.5385 39.9668 21.5385 40.1719V40.2061H20.4496V40.1719C20.4496 39.7422 20.6498 39.3695 21.0502 39.0537C21.4538 38.738 21.9942 38.5801 22.6713 38.5801C23.3451 38.5801 23.8692 38.7282 24.2436 39.0244C24.6212 39.3174 24.81 39.7585 24.81 40.3477V42.8281C24.81 43.0397 24.8262 43.2399 24.8588 43.4287C24.8946 43.6175 24.9418 43.7819 25.0004 43.9219V44H23.9457C23.8969 43.9186 23.8546 43.8112 23.8187 43.6777C23.7829 43.5443 23.7585 43.4141 23.7455 43.2871C23.6218 43.4987 23.4151 43.6875 23.1254 43.8535C22.8389 44.0163 22.4711 44.0977 22.0219 44.0977C21.501 44.0977 21.0583 43.9577 20.6937 43.6777C20.3292 43.3945 20.1469 42.9844 20.1469 42.4473ZM21.2357 42.3936C21.2357 42.6702 21.3204 42.8883 21.4896 43.0479C21.6622 43.2041 21.9275 43.2822 22.2855 43.2822C22.6534 43.2822 22.9838 43.1634 23.2768 42.9258C23.573 42.6882 23.7211 42.4342 23.7211 42.1641V41.4707H22.642C22.1798 41.4707 21.8298 41.5537 21.5922 41.7197C21.3546 41.8857 21.2357 42.1104 21.2357 42.3936ZM26.3906 44V38.7266H28.7881C29.3968 38.7266 29.8672 38.8438 30.1992 39.0781C30.5345 39.3092 30.7021 39.6527 30.7021 40.1084C30.7021 40.4144 30.6143 40.6683 30.4385 40.8701C30.2627 41.0687 30.0234 41.2021 29.7207 41.2705V41.2852C30.082 41.3438 30.3652 41.4772 30.5703 41.6855C30.7786 41.8906 30.8828 42.1576 30.8828 42.4863C30.8828 42.9551 30.7087 43.3245 30.3604 43.5947C30.0153 43.8649 29.5449 44 28.9492 44H26.3906ZM27.4697 40.9238H28.7051C29.0241 40.9238 29.2536 40.8604 29.3936 40.7334C29.5335 40.6064 29.6035 40.429 29.6035 40.2012C29.6035 39.9798 29.5335 39.8154 29.3936 39.708C29.2536 39.6006 29.0241 39.5436 28.7051 39.5371H27.4697V40.9238ZM27.4697 43.1895H28.8564C29.182 43.1895 29.4196 43.1243 29.5693 42.9941C29.7191 42.8639 29.7939 42.6833 29.7939 42.4521C29.7939 42.2243 29.7191 42.0452 29.5693 41.915C29.4229 41.7848 29.1852 41.7197 28.8564 41.7197H27.4697V43.1895ZM32.1656 38.7266H33.2496V40.9043H35.5885V38.7266H36.6725V44H35.5885V41.7393H33.2496V44H32.1656V38.7266ZM37.9699 42.4473C37.9699 41.9036 38.1945 41.4821 38.6437 41.1826C39.093 40.8831 39.6626 40.7334 40.3527 40.7334H41.5441V40.3477C41.5441 40.0677 41.4628 39.8398 41.3 39.6641C41.1372 39.485 40.8573 39.3955 40.4602 39.3955C40.0663 39.3955 39.7847 39.4736 39.6154 39.6299C39.4462 39.7861 39.3615 39.9668 39.3615 40.1719V40.2061H38.2727V40.1719C38.2727 39.7422 38.4729 39.3695 38.8732 39.0537C39.2769 38.738 39.8173 38.5801 40.4943 38.5801C41.1682 38.5801 41.6923 38.7282 42.0666 39.0244C42.4442 39.3174 42.633 39.7585 42.633 40.3477V42.8281C42.633 43.0397 42.6493 43.2399 42.6818 43.4287C42.7176 43.6175 42.7648 43.7819 42.8234 43.9219V44H41.7687C41.7199 43.9186 41.6776 43.8112 41.6418 43.6777C41.606 43.5443 41.5816 43.4141 41.5686 43.2871C41.4449 43.4987 41.2382 43.6875 40.9484 43.8535C40.662 44.0163 40.2941 44.0977 39.8449 44.0977C39.3241 44.0977 38.8814 43.9577 38.5168 43.6777C38.1522 43.3945 37.9699 42.9844 37.9699 42.4473ZM39.0588 42.3936C39.0588 42.6702 39.1434 42.8883 39.3127 43.0479C39.4852 43.2041 39.7505 43.2822 40.1086 43.2822C40.4764 43.2822 40.8068 43.1634 41.0998 42.9258C41.396 42.6882 41.5441 42.4342 41.5441 42.1641V41.4707H40.465C40.0028 41.4707 39.6529 41.5537 39.4152 41.7197C39.1776 41.8857 39.0588 42.1104 39.0588 42.3936ZM45.0535 44H43.8523L45.3465 41.793L46.4598 41.876L45.0535 44ZM47.3094 44V42.1348H46.1473L46.0203 42.0811C45.3953 42.0745 44.9135 41.9248 44.575 41.6318C44.2397 41.3356 44.0721 40.9368 44.0721 40.4355C44.0721 39.918 44.2462 39.5046 44.5945 39.1953C44.9461 38.8828 45.4458 38.7266 46.0936 38.7266H48.3934V44H47.3094ZM46.1619 41.3145H47.3094V39.5469H46.1619C45.7973 39.5469 45.5402 39.6315 45.3904 39.8008C45.2439 39.9701 45.1707 40.1833 45.1707 40.4404C45.1707 40.6943 45.2439 40.9043 45.3904 41.0703C45.5402 41.2331 45.7973 41.3145 46.1619 41.3145Z"
                            fill={isActive("/main_page") ? "#2975CC" : "#99A2AD"}/>
                    </svg>

                    <svg width="57" height="48" viewBox="0 0 57 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M30.1295 2.69099L39.0662 11.1809C39.6624 11.7472 40 12.5335 40 13.3559V21.9972C40 23.3779 38.8807 24.4972 37.5 24.4972H31.5C30.9477 24.4972 30.5 24.0495 30.5 23.4972V17.9971C30.5 17.1687 29.8284 16.4971 29 16.4971C28.1716 16.4971 27.5 17.1687 27.5 17.9971V23.4972C27.5 24.0495 27.0523 24.4972 26.5 24.4972H20.5C19.1193 24.4972 18 23.3779 18 21.9972V13.3559C18 12.5335 18.3376 11.7472 18.9338 11.1809L27.8705 2.69099C28.5034 2.08966 29.4966 2.08966 30.1295 2.69099ZM29 4.37654L20.3113 12.6309C20.1125 12.8196 20 13.0817 20 13.3559V21.9972C20 22.2734 20.2239 22.4972 20.5 22.4972H25.5V17.9971C25.5 16.0641 27.067 14.4971 29 14.4971C30.933 14.4971 32.5 16.0641 32.5 17.9971V22.4972H37.5C37.7761 22.4972 38 22.2734 38 21.9972V13.3559C38 13.0817 37.8875 12.8196 37.6887 12.6309L29 4.37654Z"
                            fill={isActive("/main_page") ? "#2975CC" : "#99A2AD"}/>
                        <path
                            d="M8.71406 44V36.8906H13.3186V37.7793H9.83711V44H8.71406ZM15.866 39.5615L15.7781 41.6172C15.7423 42.4798 15.6202 43.1097 15.4119 43.5068C15.2036 43.904 14.839 44.1025 14.3182 44.1025C14.201 44.1025 14.0984 44.0944 14.0105 44.0781C13.9227 44.0651 13.8445 44.0439 13.7762 44.0146V43.0771C13.8348 43.0999 13.8934 43.1162 13.952 43.126C14.0138 43.1357 14.0805 43.1406 14.1521 43.1406C14.393 43.1406 14.5574 43.0251 14.6453 42.7939C14.7332 42.5596 14.7902 42.1234 14.8162 41.4854L14.9334 38.7266H18.8445V44H17.7557V39.5615H15.866ZM20.1469 42.4473C20.1469 41.9036 20.3715 41.4821 20.8207 41.1826C21.2699 40.8831 21.8396 40.7334 22.5297 40.7334H23.7211V40.3477C23.7211 40.0677 23.6397 39.8398 23.477 39.6641C23.3142 39.485 23.0342 39.3955 22.6371 39.3955C22.2432 39.3955 21.9617 39.4736 21.7924 39.6299C21.6231 39.7861 21.5385 39.9668 21.5385 40.1719V40.2061H20.4496V40.1719C20.4496 39.7422 20.6498 39.3695 21.0502 39.0537C21.4538 38.738 21.9942 38.5801 22.6713 38.5801C23.3451 38.5801 23.8692 38.7282 24.2436 39.0244C24.6212 39.3174 24.81 39.7585 24.81 40.3477V42.8281C24.81 43.0397 24.8262 43.2399 24.8588 43.4287C24.8946 43.6175 24.9418 43.7819 25.0004 43.9219V44H23.9457C23.8969 43.9186 23.8546 43.8112 23.8187 43.6777C23.7829 43.5443 23.7585 43.4141 23.7455 43.2871C23.6218 43.4987 23.4151 43.6875 23.1254 43.8535C22.8389 44.0163 22.4711 44.0977 22.0219 44.0977C21.501 44.0977 21.0583 43.9577 20.6937 43.6777C20.3292 43.3945 20.1469 42.9844 20.1469 42.4473ZM21.2357 42.3936C21.2357 42.6702 21.3204 42.8883 21.4896 43.0479C21.6622 43.2041 21.9275 43.2822 22.2855 43.2822C22.6534 43.2822 22.9838 43.1634 23.2768 42.9258C23.573 42.6882 23.7211 42.4342 23.7211 42.1641V41.4707H22.642C22.1798 41.4707 21.8298 41.5537 21.5922 41.7197C21.3546 41.8857 21.2357 42.1104 21.2357 42.3936ZM26.3906 44V38.7266H28.7881C29.3968 38.7266 29.8672 38.8438 30.1992 39.0781C30.5345 39.3092 30.7021 39.6527 30.7021 40.1084C30.7021 40.4144 30.6143 40.6683 30.4385 40.8701C30.2627 41.0687 30.0234 41.2021 29.7207 41.2705V41.2852C30.082 41.3438 30.3652 41.4772 30.5703 41.6855C30.7786 41.8906 30.8828 42.1576 30.8828 42.4863C30.8828 42.9551 30.7087 43.3245 30.3604 43.5947C30.0153 43.8649 29.5449 44 28.9492 44H26.3906ZM27.4697 40.9238H28.7051C29.0241 40.9238 29.2536 40.8604 29.3936 40.7334C29.5335 40.6064 29.6035 40.429 29.6035 40.2012C29.6035 39.9798 29.5335 39.8154 29.3936 39.708C29.2536 39.6006 29.0241 39.5436 28.7051 39.5371H27.4697V40.9238ZM27.4697 43.1895H28.8564C29.182 43.1895 29.4196 43.1243 29.5693 42.9941C29.7191 42.8639 29.7939 42.6833 29.7939 42.4521C29.7939 42.2243 29.7191 42.0452 29.5693 41.915C29.4229 41.7848 29.1852 41.7197 28.8564 41.7197H27.4697V43.1895ZM32.1656 38.7266H33.2496V40.9043H35.5885V38.7266H36.6725V44H35.5885V41.7393H33.2496V44H32.1656V38.7266ZM37.9699 42.4473C37.9699 41.9036 38.1945 41.4821 38.6437 41.1826C39.093 40.8831 39.6626 40.7334 40.3527 40.7334H41.5441V40.3477C41.5441 40.0677 41.4628 39.8398 41.3 39.6641C41.1372 39.485 40.8573 39.3955 40.4602 39.3955C40.0663 39.3955 39.7847 39.4736 39.6154 39.6299C39.4462 39.7861 39.3615 39.9668 39.3615 40.1719V40.2061H38.2727V40.1719C38.2727 39.7422 38.4729 39.3695 38.8732 39.0537C39.2769 38.738 39.8173 38.5801 40.4943 38.5801C41.1682 38.5801 41.6923 38.7282 42.0666 39.0244C42.4442 39.3174 42.633 39.7585 42.633 40.3477V42.8281C42.633 43.0397 42.6493 43.2399 42.6818 43.4287C42.7176 43.6175 42.7648 43.7819 42.8234 43.9219V44H41.7687C41.7199 43.9186 41.6776 43.8112 41.6418 43.6777C41.606 43.5443 41.5816 43.4141 41.5686 43.2871C41.4449 43.4987 41.2382 43.6875 40.9484 43.8535C40.662 44.0163 40.2941 44.0977 39.8449 44.0977C39.3241 44.0977 38.8814 43.9577 38.5168 43.6777C38.1522 43.3945 37.9699 42.9844 37.9699 42.4473ZM39.0588 42.3936C39.0588 42.6702 39.1434 42.8883 39.3127 43.0479C39.4852 43.2041 39.7505 43.2822 40.1086 43.2822C40.4764 43.2822 40.8068 43.1634 41.0998 42.9258C41.396 42.6882 41.5441 42.4342 41.5441 42.1641V41.4707H40.465C40.0028 41.4707 39.6529 41.5537 39.4152 41.7197C39.1776 41.8857 39.0588 42.1104 39.0588 42.3936ZM45.0535 44H43.8523L45.3465 41.793L46.4598 41.876L45.0535 44ZM47.3094 44V42.1348H46.1473L46.0203 42.0811C45.3953 42.0745 44.9135 41.9248 44.575 41.6318C44.2397 41.3356 44.0721 40.9368 44.0721 40.4355C44.0721 39.918 44.2462 39.5046 44.5945 39.1953C44.9461 38.8828 45.4458 38.7266 46.0936 38.7266H48.3934V44H47.3094ZM46.1619 41.3145H47.3094V39.5469H46.1619C45.7973 39.5469 45.5402 39.6315 45.3904 39.8008C45.2439 39.9701 45.1707 40.1833 45.1707 40.4404C45.1707 40.6943 45.2439 40.9043 45.3904 41.0703C45.5402 41.2331 45.7973 41.3145 46.1619 41.3145Z"
                            fill={isActive("/main_page") ? "#2975CC" : "#99A2AD"}/>
                    </svg>
                </Link>
                <Link to="/profile_page" style={styles.navLink}>
                    <svg width="121" height="42" viewBox="0 0 121 42"
                         fill={isActive("/profile_page") ? "#2975CC" : "#99A2AD"} xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M60.5 2C67.1274 2 72.5 7.37258 72.5 14C72.5 20.6274 67.1274 26 60.5 26C53.8726 26 48.5 20.6274 48.5 14C48.5 7.37258 53.8726 2 60.5 2ZM60.5 20.5C58.4141 20.5 56.42 21.082 54.7032 22.149C56.3382 23.3146 58.339 24 60.5 24C62.6605 24 64.661 23.3148 66.296 22.15C64.5795 21.0818 62.5857 20.5 60.5 20.5ZM60.5 4C54.9772 4 50.5 8.47715 50.5 14C50.5 16.6157 51.5043 18.9968 53.1482 20.7788C55.2856 19.3082 57.831 18.5 60.5 18.5C63.1693 18.5 65.7149 19.3084 67.8527 20.7774C69.4961 18.9959 70.5 16.6152 70.5 14C70.5 8.47715 66.0228 4 60.5 4ZM60.5 7.5C63.1242 7.5 65.25 9.62584 65.25 12.25C65.25 14.8742 63.1242 17 60.5 17C57.8758 17 55.75 14.8742 55.75 12.25C55.75 9.62584 57.8758 7.5 60.5 7.5ZM60.5 9.5C58.9804 9.5 57.75 10.7304 57.75 12.25C57.75 13.7696 58.9804 15 60.5 15C62.0196 15 63.25 13.7696 63.25 12.25C63.25 10.7304 62.0196 9.5 60.5 9.5Z"
                            fill={isActive("/profile_page") ? "#2975CC" : "#99A2AD"}/>
                        <path
                            d="M38.717 39V31.8906H44.4348V39H43.3068V32.7842H39.84V39H38.717ZM46.1229 41.0312V33.7266H47.1189L47.1629 34.3906H47.1873C47.3208 34.179 47.5291 34 47.8123 33.8535C48.0988 33.7038 48.4308 33.6289 48.8084 33.6289C49.5018 33.6289 50.0568 33.8779 50.4734 34.376C50.8901 34.874 51.0984 35.5104 51.0984 36.2852V36.4414C51.0984 37.2129 50.8901 37.8493 50.4734 38.3506C50.0568 38.8486 49.5034 39.0977 48.8133 39.0977C48.4389 39.0977 48.1167 39.0358 47.8465 38.9121C47.5763 38.7852 47.3631 38.6143 47.2068 38.3994V41.0312H46.1229ZM47.2068 37.3691C47.311 37.5938 47.4786 37.7939 47.7098 37.9697C47.9441 38.1455 48.2257 38.2334 48.5545 38.2334C49.046 38.2334 49.4057 38.0641 49.6336 37.7256C49.8647 37.3838 49.9803 36.9574 49.9803 36.4463V36.2754C49.9803 35.7676 49.8647 35.3444 49.6336 35.0059C49.4057 34.6641 49.046 34.4932 48.5545 34.4932C48.2225 34.4932 47.9409 34.5811 47.7098 34.7568C47.4786 34.9326 47.311 35.1328 47.2068 35.3574V37.3691ZM52.059 36.4414V36.2852C52.059 35.4844 52.2982 34.8333 52.7768 34.332C53.2553 33.8307 53.8917 33.5801 54.6859 33.5801C55.4802 33.5801 56.1166 33.8307 56.5951 34.332C57.0736 34.8333 57.3129 35.4844 57.3129 36.2852V36.4414C57.3129 37.2389 57.0736 37.89 56.5951 38.3945C56.1166 38.8958 55.4802 39.1465 54.6859 39.1465C53.8917 39.1465 53.2553 38.8958 52.7768 38.3945C52.2982 37.89 52.059 37.2389 52.059 36.4414ZM53.1771 36.2754V36.4463C53.1771 36.9704 53.3041 37.4082 53.558 37.7598C53.8119 38.1081 54.1879 38.2822 54.6859 38.2822C55.1872 38.2822 55.5648 38.1081 55.8187 37.7598C56.0727 37.4082 56.1996 36.9704 56.1996 36.4463V36.2754C56.1996 35.7546 56.071 35.32 55.8139 34.9717C55.56 34.6201 55.184 34.4443 54.6859 34.4443C54.1879 34.4443 53.8119 34.6201 53.558 34.9717C53.3041 35.32 53.1771 35.7546 53.1771 36.2754ZM59.4014 36.4414C59.4014 36.9655 59.543 37.3952 59.8262 37.7305C60.1094 38.0658 60.5472 38.2497 61.1396 38.2822V34.4443C60.5472 34.4769 60.1094 34.6608 59.8262 34.9961C59.543 35.3314 59.4014 35.7594 59.4014 36.2803V36.4414ZM63.9668 36.2852C63.9668 35.7611 63.8252 35.3314 63.542 34.9961C63.2588 34.6608 62.821 34.4769 62.2285 34.4443V38.2822C62.821 38.2497 63.2588 38.0658 63.542 37.7305C63.8252 37.3952 63.9668 36.9671 63.9668 36.4463V36.2852ZM61.1396 39.1465C60.2477 39.1139 59.5479 38.8551 59.04 38.3701C58.5355 37.8851 58.2832 37.2422 58.2832 36.4414V36.2803C58.2832 35.4827 58.5355 34.8415 59.04 34.3564C59.5479 33.8714 60.2477 33.6126 61.1396 33.5801V31.5049H62.2285V33.5801C63.1204 33.6126 63.8187 33.8714 64.3232 34.3564C64.8278 34.8415 65.0801 35.4844 65.0801 36.2852V36.4463C65.0801 37.2438 64.8278 37.8851 64.3232 38.3701C63.8187 38.8551 63.1204 39.1139 62.2285 39.1465V41.0312H61.1396V39.1465ZM66.358 39V33.7266H67.442V36.8809C67.442 36.9818 67.4404 37.0973 67.4371 37.2275C67.4339 37.3545 67.4306 37.4668 67.4273 37.5645H67.4713C67.5136 37.4798 67.5641 37.387 67.6227 37.2861C67.6813 37.182 67.7431 37.0762 67.8082 36.9688L69.8395 33.7266H70.9381V39H69.8541V35.8457C69.8541 35.748 69.8557 35.6357 69.859 35.5088C69.8622 35.3786 69.8655 35.263 69.8688 35.1621H69.8199C69.7776 35.25 69.7271 35.346 69.6686 35.4502C69.6132 35.5511 69.5514 35.6536 69.483 35.7578L67.4566 39H66.358ZM73.9592 34.5615L73.8713 36.6172C73.8355 37.4798 73.7134 38.1097 73.5051 38.5068C73.2967 38.904 72.9322 39.1025 72.4113 39.1025C72.2941 39.1025 72.1916 39.0944 72.1037 39.0781C72.0158 39.0651 71.9377 39.0439 71.8693 39.0146V38.0771C71.9279 38.0999 71.9865 38.1162 72.0451 38.126C72.107 38.1357 72.1737 38.1406 72.2453 38.1406C72.4862 38.1406 72.6506 38.0251 72.7385 37.7939C72.8264 37.5596 72.8833 37.1234 72.9094 36.4854L73.0266 33.7266H76.9377V39H75.8488V34.5615H73.9592ZM79.6072 33.7266V35.5234H80.7986C81.4497 35.5234 81.9493 35.6797 82.2977 35.9922C82.646 36.3014 82.8201 36.7214 82.8201 37.252C82.8201 37.7858 82.646 38.2106 82.2977 38.5264C81.9493 38.8421 81.4497 39 80.7986 39H78.5232V33.7266H79.6072ZM80.7205 36.3486H79.6072V38.1748H80.7205C81.0883 38.1748 81.3471 38.0885 81.4969 37.916C81.6466 37.7402 81.7215 37.5189 81.7215 37.252C81.7215 36.9883 81.6466 36.7718 81.4969 36.6025C81.3471 36.4333 81.0883 36.3486 80.7205 36.3486Z"
                            fill={isActive("/profile_page") ? "#2975CC" : "#99A2AD"}/>
                    </svg>
                </Link>
            </nav>
            )},
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

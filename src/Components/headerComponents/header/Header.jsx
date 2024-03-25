import {languages }from "../../../utilities/languages";

import NightlightOutlinedIcon from '@mui/icons-material/NightlightOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import TranslateOutlinedIcon from '@mui/icons-material/TranslateOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';

import "./Header.scss";
import { useContext, useState } from "react";
import { globalContext } from "../../../GlobalStateContext/GlobalContext";
import { useNavigate } from "react-router-dom";
import { SearchForm } from "../../homeComponents/homeSearchBar/SearchBar";

const Header = ()=> {

    const {theme,lang,setLang,innerWidth} = useContext(globalContext);
    const navigate = useNavigate();

    const [isSearch,setisSearch] = useState(false);
    const [isMenu,setIsMenu] = useState(false);

    const handleNavigate = (filter,mediaType)=>{
        navigate(`list/${mediaType}/${filter}`);

    };

    const langCode = lang.toLowerCase() === 'ar' ?  'ar' : 'en';

    const SittingIcons = ({isMobile = false})=> {

        return (
            <>
                <div className="theme icons">
                    <span>
                        {
                            theme === 'light '?
                            <NightlightOutlinedIcon />
                            : 
                            <LightModeOutlinedIcon />
                        }
                    </span>
                    {
                        isMobile && <h5>theme mode</h5>
                    }
                </div>
                <div className="lang icons" >
                    <span >
                        {lang}
                    </span>
                    {
                        isMobile && <h5>Languages</h5>
                    }
                    <div className="lang-container card">
                        <p 
                            className={`${lang === 'ar' && 'active'} nav-btn`}
                             onClick={()=> setLang('ar')}
                             >العربية</p>
                        <p 
                            className={`${lang === 'en' && 'active'} nav-btn`}
                            onClick={()=> setLang('en')}
                            >english</p>
                    </div>
                </div>
                <div className="notfication icons">
                    <span>
                        <NotificationsOutlinedIcon />
                    </span>
                    {
                        isMobile && <h5>notifications</h5>
                    }
                </div>
            </>
        )
    }

    return (
        <header className="main-header">
            <div className="header-container">
                <section  className="logo">
                    {
                        innerWidth < 667 &&
                        <MenuIcon 
                            className="menu-icon" 
                            onClick={()=> setIsMenu(true)} 
                            />
                    }
                    <h1 onClick={()=> navigate(`/`)}>myh movies</h1>
                </section>
                <nav className="nav-links">
                    <div 
                        className={`${isMenu && innerWidth < 667 ? 'active mobile': innerWidth < 667 ? 'mobile' : 'web'} part-one`}  
                        onClick={()=> setIsMenu(false)} >
                        <div className="part-one-contaner">
                            {
                                innerWidth < 667 && 

                                <div className="close-icon-logo">
                                        <CloseIcon   onClick={()=> setIsMenu(false)} className="close-icon"/>
                                    <h2 className="l">MYH MOVIES</h2>
                                </div>
                            }
                            {
                                 innerWidth < 667 && 
                                <SittingIcons isMobile={innerWidth < 667} />
                            }
                            <div className="filter-box">
                                <h4> {languages[langCode].movies} </h4>
                                <ul className="fiter">
                                    <li 
                                        className="nav-btn link-hover"
                                        onClick={()=> handleNavigate('popular','movie')}>
                                            {languages[langCode].popular}
                                    </li>
                                    <li 
                                        className="nav-btn link-hover"
                                        onClick={()=> handleNavigate('now_playing','movie')}>
                                            {languages[langCode].nowPlaying}
                                        </li>
                                    <li 
                                        className="nav-btn link-hover"
                                        onClick={()=> handleNavigate('upcoming','movie')}>
                                            {languages[langCode].upComing}
                                        </li>
                                    <li 
                                        className="nav-btn link-hover"
                                        onClick={()=> handleNavigate('top_rated','movie')}>
                                            {languages[langCode].topRated}
                                    </li>
                                </ul>
                            </div>
                            <div className="filter-box">
                                <h4>{languages[langCode].tvShows}</h4>
                                <ul className="fiter">
                                    <li 
                                        className="nav-btn link-hover"
                                        onClick={()=> handleNavigate('popular','tv')}>
                                            {languages[langCode].popular}
                                        </li>
                                    <li 
                                        className="nav-btn link-hover"
                                        onClick={()=> handleNavigate('airing_today','tv')}>
                                            {languages[langCode].airingToday}
                                    </li>
                                    <li 
                                        className="nav-btn link-hover"
                                        onClick={()=> handleNavigate('on_the_air','tv')}>
                                            {languages[langCode].onTv}
                                    </li>
                                    <li 
                                    className="nav-btn link-hover"
                                    onClick={()=> handleNavigate('top_rated','tv')}>
                                        {languages[langCode].topRated}
                                    </li>
                                </ul>
                            </div>
                            <div className="filter-box">
                                <h4> {languages[langCode].people}</h4>
                                <ul className="fiter">
                                    <li 
                                        className="nav-btn link-hover"
                                        onClick={()=> handleNavigate('popular','person')}>
                                            {languages[langCode].popular} people
                                    </li>
                                </ul>
                            </div>

                        </div>
                    </div>
                    <div className="part-two">

                        {
                            innerWidth > 666  &&
                            <SittingIcons isMobile={innerWidth < 667} />
                        }
                        <div className="acount">
                            <PersonAddOutlinedIcon />
                        </div>
                        <div className="search-icon" 
                             onClick={()=> setisSearch(!isSearch)}
                             >
                                {
                                    isSearch ? 
                                     <div  className="cancel-icon">
                                         <CloseIcon /> 

                                     </div>
                                    :<SearchOutlinedIcon />
                                }
                        </div>

                    </div>
                </nav>
                {
                    isSearch && <SearchForm />
                }
            </div>
        </header>
    );
};

export default Header;
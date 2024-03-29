import { React, useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import CartWidget from '../CartWidget/CartWidget'
import navLogo from '/logoBasketStore2.png'
import navLogo2 from '/logo2.png'
import axios from "axios";
import Swal from 'sweetalert2';

import { UserContext } from "../../context/UserContext";

import './NavBar.css'

const NavBar = () => {

    axios.defaults.withCredentials = true;

    const [navbarblur, setnavbarblur] = useState(false);


    const { user, setUser, admin, setAdmin, role, setRole } = useContext(UserContext)
    function scrollHandler() {
        if (window.scrollY >= 20) {
            setnavbarblur(true);
        } else {
            setnavbarblur(false);
        }
    }

    const showMenu = () => {
        var bar = document.getElementsByClassName("bar");
        var ham = document.getElementsByClassName("NavbarLinks");
        bar[0].classList.toggle("barOne");
        bar[1].classList.toggle("barTwo");
        bar[2].classList.toggle("barThree");

        ham[0].classList.toggle("showNavbar");
    };

    const hideMenu = () => {
        var bar = document.getElementsByClassName("bar");
        var ham = document.getElementsByClassName("NavbarLinks");
        bar[0].classList.remove("barOne");
        bar[1].classList.remove("barTwo");
        bar[2].classList.remove("barThree");
        ham[0].classList.remove("showNavbar");
    };

    const submintLogOut = async () => {
        hideMenu()
        const API_LINK = "http://localhost:8080/api/sessions/signout"
        let cookie = document.cookie.split("; ")
        cookie = cookie.find(each => each.split("=")[0] === "token")

        const res = await axios.post(API_LINK, role, cookie);
        console.log(res);
        if (res.data.statusCode === 200) {
            setUser(false)
            setAdmin(false)
            setRole("")
            Swal.fire({
                title: "GOOD BYE!",
                icon: "success",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "OK",
            }).then((result) => {
                if (result.isConfirmed) {
                    localStorage.removeItem("token");
                    location.replace("/");
                }
            });
        }
    }

    window.addEventListener("scroll", scrollHandler);

    return (
        <nav className={navbarblur ? "Navbar blur" : "Navbar"}>
            <Link to="/">
                <img src={navLogo2} alt="Logo de la tienda" className={navbarblur ? "navbar_logo blur_img" : "navbar_logo"} />
            </Link>

            <div className="Hamburger" onClick={showMenu}>
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </div>

            <ul className="NavbarLinks">
                <li id="homeLink" onClick={hideMenu}>
                    <Link to="/">Home</Link>
                </li>
                {admin && <li id="formLink" onClick={hideMenu}>
                    <Link to="/form">Form</Link>
                </li>}
                {user && <li id="cartLink" onClick={hideMenu}>
                    <Link to="/cart">My Cart</Link>
                </li>}
                {!admin && !user && <li id="registerLink" onClick={hideMenu}>
                    <Link to="/register">Register</Link>
                </li>}
                {role === "" ?
                    <li id="loginLink" onClick={hideMenu}>
                        <Link to="/login"> Login</Link>
                    </li> :
                    <li id="signOutLink">
                        {/*<Link to="/signout">SignOut</Link>*/}
                        <Link id="signOutLink" onClick={submintLogOut}>SignOut</Link>
                    </li>
                }

            </ul>
        </nav >
    );

}
export default NavBar



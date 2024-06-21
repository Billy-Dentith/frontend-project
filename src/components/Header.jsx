import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdClose } from "react-icons/md";
import { FiMenu } from "react-icons/fi";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    {
      title: "Home",
      linkTo: "/articles",
    },
    {
      title: "Topics",
      linkTo: "/topics",
    },
    {
      title: "Users",
      linkTo: "/users",
    },
  ];

  return (
    <>
      <nav className="navbar">
        <Link className="logo" to="/articles" id="logo">
          NC News
        </Link>
        <button
          className="toggle"
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          {isMenuOpen ? (
            <MdClose style={{ width: "28px", height: "28px" }} />
          ) : (
            <FiMenu style={{ width: "28px", height: "28px" }} />
          )}
        </button>
        <ul className={`menu-nav ${isMenuOpen ? " show" : ""}`}>
          {navLinks.map((link) => (
            <li key={link.title}>
              <Link
                className="link"
                to={link.linkTo}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.title}
              </Link>
            </li>
          ))}
          <li key={"post"}>
            <Link className="link" id="post" to="/submit" onClick={() => setIsMenuOpen(false)}>
              Post an Article
            </Link>
          </li>
        </ul>
      </nav>

      <header id="header">
        <Link className="logo" to="/articles" id="logo">
          NC News
        </Link>
        {navLinks.map((link) => (
          <Link key={link.title} className="link" to={link.linkTo}>
            {link.title}
          </Link>
        ))}
        <Link className="link" to="/submit">
          <IoMdAddCircleOutline className="react-icons" />
        </Link>
      </header>
    </>
  );
};

export default Header;

// return (
//     <header id='header'>
//         <Link className="logo" to="/articles" id='logo'>NC News</Link>
//         <Link className="link" to="/articles">Home</Link>
//         <Link className="link" to="/topics">Topics</Link>
//         <Link className="link" to="/users">Users</Link>
//         <Link className="link" to="/submit"><IoMdAddCircleOutline  className='react-icons'/>
//         </Link>
//     </header>
// )

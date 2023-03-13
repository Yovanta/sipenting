import React, { useState, useContext } from "react";
import { FaBars } from "react-icons/fa";
import Button from "../Button";
import Logo from "../Logo";
import { Link, NavLink } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import styled from "@emotion/styled";

import { AuthContext } from "../../Context/AuthContext";

export default function Navbar() {
  const [click, setClick] = useState(false);
  const handleClickMenu = () => {
    setClick(!click);
  };

  const { user } = useContext(AuthContext);

  return (
    <>
      <div className="w-full flex flex-wrap relative bg-secondary-softblue rounded-l">
        <div className="w-full">
          <nav className=" flex flex-wrap items-center justify-between px-2 py-3 rounded-l-lg">
            <Wrapper className="w-full mx-4 flex flex-wrap items-center justify-between">
              <Link to="/">
                <Logo />
              </Link>

              <HumbergerMenu onClick={() => handleClickMenu()}>
                {click ? <AiOutlineClose /> : <FaBars />}
              </HumbergerMenu>

              <WrapperAllMenu
                className={
                  click
                    ? "nav-menu show-nav-mobile"
                    : "nav-menu w-10/12 justify-between"
                }
              >
                <WrapperMenu>
                  <NavLink to="/" className="link">
                    <li> Home</li>
                  </NavLink>
                  <NavLink to="/list-room" className="link">
                    <li> Room</li>
                  </NavLink>
                  <NavLink to="/about" className="link">
                    <li> About</li>
                  </NavLink>
                </WrapperMenu>
                <WrapperButton>
                  {user ? (
                    <Link to="/profile">
                      <Button className="bg-primary-blue text-primary-white">
                        {user.username}
                      </Button>
                    </Link>
                  ) : (
                    <>
                      <Link to="/login">
                        <Button className="bg-primary-blue text-primary-white">
                          Login
                        </Button>
                      </Link>
                      <Link to="/register">
                        <Button className="bg-primary-white text-primary-blue">
                          Register
                        </Button>
                      </Link>{" "}
                    </>
                  )}
                </WrapperButton>
              </WrapperAllMenu>
            </Wrapper>
          </nav>
        </div>
      </div>
    </>
  );
}

const Wrapper = styled.div`
  .nav-menu {
    display: flex;
  }
  @media (max-width: 768px) {
    .nav-menu {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      padding-top: 10%;
      width: 50%;
      height: 100vh;
      position: absolute;
      left: -100%;
      opacity: 1;
      transition: all 0.5s ease;
    }
    .nav-menu.show-nav-mobile {
      background-color: #edeaff;
      top: 100%;
      left: 50%;
      width: 50%;
      opacity: 1;
      transition: all 0.5s ease;
      z-index: 1;
    }
  }
  @media (max-width: 480px) {
    .nav-menu {
      top: 16%;
    }
  }
`;
const WrapperMenu = styled.ul`
  display: flex;
  align-items: center;
  column-gap: 40px;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    margin: 0;
    row-gap: 20px;
  }
`;
const WrapperAllMenu = styled.div`
  align-items: center;
  li {
    list-style: none;
    text-decoration: none;
  }
  li:hover {
    color: #4c35e0;
    font-weight: bold;
    transition: all 0.2s ease-out;
  }
  @media (max-width: 768px) {
    position: relative;
    row-gap: 20px;
  }
`;

const WrapperButton = styled.div`
  display: flex;
  column-gap: 40px;
  align-items: center;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    row-gap: 20px;
    margin: 0;
  }
`;

const HumbergerMenu = styled.div`
  display: none;
  color: #000;
  font-size: 40px;
  cursor: pointer;
    z-index: 2;
  @media (max-width: 768px) {
    display: block;
    position: absolute;
    right: 10%;
    transform: translate(-100%, 75%)
    float: right;
  }
  @media (max-width: 480px) {
    display: block;
    position: absolute;
    transform: translate(-100%, 75%)
    float: right;
  }
`;

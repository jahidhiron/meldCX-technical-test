import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

import {
  Container,
  ContainerWrapper,
  NavbarBrand,
  AuthContainer,
  BrandText,
  AuthText,
  Name,
} from "../styles/Navbar.styles";
import { logout } from "../actions/auth";

const Navbar = () => {
  const [auth, setAuth] = useState(JSON.parse(localStorage.getItem("profile")));
  const location = useLocation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setAuth(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  const handleLogoutClick = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <Container>
      <ContainerWrapper>
        {!auth?.user ? (
          <>
            <NavbarBrand>
              <NavLink to="/" style={{ textDecoration: "none" }}>
                <BrandText>F</BrandText>
                <BrandText style={{ color: "#0A66C2" }}>||</BrandText>
                <BrandText>S</BrandText>
              </NavLink>
            </NavbarBrand>

            <NavLink to="/login" style={{ textDecoration: "none" }}>
              <AuthContainer>
                <AuthText>Join</AuthText>
              </AuthContainer>
            </NavLink>
          </>
        ) : (
          <AuthContainer>
            <Name>{auth?.user && auth.user.name}</Name>
            <AuthText onClick={handleLogoutClick}>Logout</AuthText>
          </AuthContainer>
        )}
      </ContainerWrapper>
    </Container>
  );
};

export default Navbar;

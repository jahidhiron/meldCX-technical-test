import styled from "styled-components";

export const Container = styled.div`
  width: 100vw;
  height: 55px;
  overflow: hidden;
  position: fixed;
  top: 0;
  z-index: 999;
  background-color: var(--navbar-color);
`;

export const ContainerWrapper = styled.div`
  height: 100%;
  margin: 0px 5%;
  color: #df678c;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const NavbarBrand = styled.div`
  border: 1px solid var(--main-color);
  width: 55px;
  height: 55px;
  display: flex;
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;

  &:hover {
    color: var(--main-color);
  }
`;
export const BrandText = styled.span`
  font-size: 30px;
  color: #000;
  text-decoration: none;
`;
export const AuthContainer = styled.div`
  /* border: 1px solid var(--main-color); */
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #666;
  /* box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  width: 80px;
  height: 32px;
  cursor: pointer;
  color: #0a66c2;
  font-weight: 600;
  border-radius: 20px;

  transition: background-color 0.5s ease;

  &:hover {
    color: #0a66c2;
    border: 2px solid var(--main-color);
    background-color: #eaf4fe;
  } */
`;

export const AuthText = styled.span`
  font-size: 17px;
  margin-left: 60%;
  border: 2px solid var(--main-color);
  padding: 6px 15px;
  border-radius: 10px;
  cursor: pointer;
  color: var(--main-color);
`;

export const Name = styled.span`
  font-size: 17px;
  color: var(--main-color);
`;

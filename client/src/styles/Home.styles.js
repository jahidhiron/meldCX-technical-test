import styled from "styled-components";
// import { mobile, tablet } from "../utilities/responsive";

export const Container = styled.div`
  width: 90vw;
  height: calc(100vh - 55px);
  margin: 0 auto;
  position: relative;
  top: 55px;
  background-color: #f3f2ef;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #000;
`;
export const ContainerTop = styled.div`
  width: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const ContainerTopLeft = styled.div`
  width: 45%;
  height: calc(100vh - 55px);
  padding: 10px 40px;
  margin-right: 20px;
`;

export const ContainerTopLeftBottom = styled.div``;

export const ContainerTopRight = styled.div`
  width: 100%;
  height: 100%;
  padding: 30px;
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
`;

export const InputWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  margin-bottom: 20px;
`;

export const Label = styled.label`
  color: rgb(0, 0, 0, 0.6);
  font-size: 16px;
  margin-bottom: 8px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px 0px;
  border-radius: 5px;
  border: 1px solid rgb(0, 0, 0, 0.6);
  padding-left: 10px;

  &::placeholder {
    color: rgb(0, 0, 0, 0.6);
  }

  &:focus {
    outline: none !important;
  }
`;

export const Fieldset = styled.fieldset`
  border: 1px solid var(--main-color);
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 10px 10px;
  border-radius: 10px;
`;

export const Legend = styled.legend`
  border: 1px solid var(--main-color);
  margin-bottom: 0px;
  padding: 3px;
  border-radius: 5px;
`;

export const UploadContainer = styled.div`
  display: flex;
  overflow: hidden;
`;

export const Button = styled.button`
  border: 1px solid var(--main-color);
  padding: 7px 15px;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 30px;
  margin-top: 15px;
  width: 130px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: var(--main-color);
    color: white;
  }
`;

export const Error = styled.span`
  color: red;
  font-size: 16px;
  margin-top: 5px;
`;
export const FileContainer = styled.div`
  width: 220px;
  height: 300px;
  border: 1px solid var(--main-color);
  cursor: pointer;
  margin-right: 30px;
  padding: 10px;
  margin-bottom: 40px;
  border-radius: 10px;
`;

export const Title = styled.span`
  display: block;
  margin-bottom: 10px;
`;

export const Description = styled.span`
  display: block;
  height: 60px;
  margin-bottom: 20px;
  overflow: hidden;
`;

export const Link = styled.button`
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
  cursor: pointer;
  margin-bottom: 20px;
  display: block;
  border: 1px solid var(--main-color);
  border-radius: 4px;

  transition: background-color 0.3s ease;

  &:hover {
    background-color: var(--main-color);
    color: white;
  }
`;

export const Delete = styled.button`
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
  cursor: pointer;
  margin-bottom: 20px;
  display: block;
  border: 1px solid red;
  border-radius: 4px;

  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ff0000;
    color: white;
  }
`;
export const Span = styled.span``;

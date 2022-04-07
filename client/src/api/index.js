import axios from "axios";

const API = axios.create({ baseURL: process.env.REACT_APP_BASE_URL });

// interceptors and store user information to local storage
API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

// signup api endpoin
export const addUser = (newUser) => API.post("/users", newUser);
export const signupWithGoogle = (newUser) =>
  API.post("/users/signup-with-google", newUser);

// authentication api end point
export const login = (userCredential) => API.post("/auth", userCredential);

// files api end point
export const saveFiles = (state) => API.post("/files", state);
export const getAllFiles = () => API.get("/files");
export const editFileInfo = (publicKey, state) =>
  API.patch(`/files/${publicKey}`, state);

export const downloadFile = (state) =>
  API.get(`/files/${state.publicKey}?fileName=${state.file}`);

export const deleteFile = (privateKey, fileName) =>
  API.delete(`/files/${privateKey}?fileName=${fileName}`);

export const sendFile = (publicKey, { email, fileName }) =>
  API.post(`/files/${publicKey}`, { email, fileName });

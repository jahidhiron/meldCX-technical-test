import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import ClipLoader from "react-spinners/ClipLoader";
import { GoogleLogin } from "react-google-login";

import {
  Container,
  JoinWrapper,
  JoinTitle,
  FormWrapper,
  Form,
  InputWrapper,
  Input,
  Label,
  Button,
  Devider,
  SignupWithGoogle,
  GoogleText,
  Image,
  PasswordWrapper,
  PasswordInput,
  AuthState,
  Error,
} from "../styles/Join.styles";
import { signupValidation } from "../utilities/validations/join";
import { signup, signupWithGoogle } from "../actions/user";
import { login } from "../actions/auth";

const Join = () => {
  const initialField = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [passwordVisibility, setPsswordVisibility] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [signupData, setSignupData] = useState(initialField);
  const [errors, setErrors] = useState(initialField);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const users = useSelector((state) => state.users);
  const auth = useSelector((state) => state.auth);

  // after first render
  useEffect(() => {
    if (isSignup) {
      setErrors(users.errors);
    } else {
      setErrors(errors);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users.errors, auth.errors]);

  // handling input state data
  const handleChange = (event) => {
    setSignupData({ ...signupData, [event.target.name]: event.target.value });
  };

  const handleBlur = () => {
    setErrors(initialField);
  };

  const handleFocus = () => {
    setErrors(initialField);
  };

  // handle signup or signin action
  const handleSubmit = async (event) => {
    event.preventDefault();
    const errors = signupValidation(signupData);

    // if signup === true -> render signup page else login page
    if (isSignup) {
      if (errors?.email || errors?.password || errors?.confirmPassword) {
        setErrors(errors);
      } else {
        dispatch(signup(signupData, navigate));
      }
    } else {
      setErrors(errors);
      dispatch(login(signupData, navigate));
    }

    setSignupData({
      ...signupData,
      password: "",
      confirmPassword: "",
    });
  };

  const errorInlineStyle = errors
    ? (fieldName = { email: "" }) => ({
        outline: errors[fieldName] && "red 2px solid",
      })
    : () => {};

  // after google oauth signup successfull
  const googleSuccess = (res) => {
    const { email, googleId, name, imageUrl } = res?.profileObj;

    if (email) {
      dispatch(signupWithGoogle({ email, googleId, name, imageUrl }, navigate));
    }
  };

  // show a popup window if google signup failure
  const googleFailure = () => {
    alert("Google Sign In was unsuccessful. Try again later");
  };

  // final render
  return (
    <Container data-testid="join">
      <ClipLoader
        loading={users.isLoading || auth.isLoading}
        css={{ display: "block", margin: "0 auto", borderColor: "#0a66c2" }}
        size={150}
      />
      {!(users.isLoading || auth.isLoading) ? (
        <JoinWrapper>
          <JoinTitle>{!isSignup ? "Signin" : "Create an Account"}</JoinTitle>
          <FormWrapper>
            <Form onSubmit={handleSubmit}>
              {!isSignup || (
                <InputWrapper>
                  <Label>Name</Label>
                  <Input
                    type="text"
                    name="name"
                    value={signupData?.name}
                    onChange={handleChange}
                    style={errorInlineStyle("name")}
                    onBlur={handleBlur}
                    onFocus={handleFocus}
                  />
                  {errors?.name && <Error>{errors?.name}</Error>}
                </InputWrapper>
              )}

              <InputWrapper>
                <Label>Email</Label>
                <Input
                  type="email"
                  name="email"
                  value={signupData?.email}
                  onChange={handleChange}
                  style={errorInlineStyle("email")}
                  onBlur={handleBlur}
                  onFocus={handleFocus}
                />
                {errors?.email && <Error>{errors?.email}</Error>}
              </InputWrapper>

              <InputWrapper>
                <Label>Password (8 or more characters)</Label>
                <PasswordWrapper style={errorInlineStyle("password")}>
                  <PasswordInput
                    type={passwordVisibility ? "text" : "password"}
                    name="password"
                    value={signupData?.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onFocus={handleFocus}
                    onCopy={(event) => {
                      event.preventDefault();
                      return false;
                    }}
                    onPaste={(event) => {
                      event.preventDefault();
                      return false;
                    }}
                  />
                  {passwordVisibility ? (
                    <VisibilityOff
                      style={{ cursor: "pointer" }}
                      onClick={() => setPsswordVisibility((prev) => !prev)}
                    />
                  ) : (
                    <Visibility
                      style={{ cursor: "pointer" }}
                      onClick={() => setPsswordVisibility((prev) => !prev)}
                    />
                  )}
                </PasswordWrapper>
                {errors?.password && <Error>{errors?.password}</Error>}
              </InputWrapper>

              {!isSignup || (
                <InputWrapper>
                  <Label>Confirm Password</Label>
                  <Input
                    type="password"
                    name="confirmPassword"
                    value={signupData?.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onFocus={handleFocus}
                    onCopy={(event) => {
                      event.preventDefault();
                      return false;
                    }}
                    onPaste={(event) => {
                      event.preventDefault();
                      return false;
                    }}
                  />
                </InputWrapper>
              )}

              <Button
                type="submit"
                disabled={(users.isLoading || auth.isLoading) && true}
              >
                {isSignup ? "Signup & Join" : "Signin"}
              </Button>
              <Devider />
            </Form>

            <GoogleLogin
              clientId="941476254173-b10p0mmrngfrkjie8e4h9d8dur7o3a9q.apps.googleusercontent.com"
              render={(renderProps) => (
                <SignupWithGoogle onClick={renderProps.onClick}>
                  <Image src="https://img.icons8.com/color/30/000000/google-logo.png" />
                  <GoogleText>Continue with Google</GoogleText>
                </SignupWithGoogle>
              )}
              onSuccess={googleSuccess}
              onFailure={googleFailure}
              cookiePolicy="single_host_origin"
            />
          </FormWrapper>
          <AuthState
            onClick={() => {
              setIsSignup((prev) => !prev);
              setSignupData(initialField);
              setErrors(initialField);
            }}
          >
            {!isSignup
              ? "Don't have an account ? Signup"
              : "Already signup ? Signin"}
          </AuthState>
        </JoinWrapper>
      ) : null}
    </Container>
  );
};

export default Join;

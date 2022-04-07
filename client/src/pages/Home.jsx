import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FileDownload from "js-file-download";
import ClipLoader from "react-spinners/ClipLoader";

import {
  Container,
  ContainerTop,
  ContainerTopLeft,
  ContainerTopRight,
  InputWrapper,
  Label,
  Input,
  Fieldset,
  Legend,
  UploadContainer,
  Button,
  Error,
  FileContainer,
  Title,
  Description,
  Link,
  Span,
  Delete,
} from "../styles/Home.styles";
import {
  uploadFiles,
  getFiles,
  editFileInfo,
  downloadFile,
  deleteFile,
  sendFile,
} from "../actions/file";
import { fileUploadValidation } from "../utilities/validations/file";

const INITIAL_STATE = {
  _id: "",
  title: "",
  desc: "",
  files: "",
  publicKey: "",
  privateKey: "",
};

const INITIAL_ERROR = {
  title: "",
  files: "",
  email: "",
};

const Home = () => {
  const [state, setState] = useState(INITIAL_STATE);
  const [error, setError] = useState(INITIAL_ERROR);
  const [isEdit, setIsEdit] = useState(false);
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();
  const files = useSelector((state) => state.files);

  // call useEffect after first render
  useEffect(() => {
    dispatch(getFiles());
  }, [dispatch]);

  // hamdling input
  const handleChange = (e) => {
    setState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // upload file
  const handleUpload = async (e) => {
    let formData = new FormData();
    const errors = fileUploadValidation({
      title: state.title,
      files: state.files,
    });

    // set file as form data
    formData.append("title", state.title);
    formData.append("desc", state.desc);
    formData.append("folder", state.folder);

    formData.append("files", state.files);

    // handling multiple file input
    for (const key of Object.keys(state.files)) {
      formData.append("files", state.files[key]);
    }

    // if no error occour then add file
    if (!errors.title || !errors?.files) {
      await dispatch(uploadFiles(formData));
      await dispatch(getFiles());
      setState(INITIAL_STATE);
      setError(INITIAL_ERROR);
    } else {
      setError({ title: errors?.title, files: errors?.files });
    }
  };

  // edit file info for input state
  const handleFileEdit = (e, title, desc, _id) => {
    setState((prev) => ({ ...prev, title, desc, _id }));
    setIsEdit(true);
  };

  // edit file info
  const handleEdit = async (e) => {
    await dispatch(editFileInfo(state._id, state));
    setIsEdit(false);
    setState(INITIAL_STATE);
    await dispatch(getFiles());
  };

  // download file
  const handleFileDownload = async (e, publicKey, file) => {
    await dispatch(downloadFile({ publicKey, file }));
    if (files?.fileName) {
      FileDownload(
        files?.fileName,
        Date.now() + "." + file.split(".")[file.split(".").length - 1]
      );
    }
    dispatch(getFiles());
  };

  // delete file
  const deleteFileHandle = async (e, privateKey, fileName) => {
    if (!files?.errors) {
      await dispatch(deleteFile(privateKey, fileName));
      await dispatch(getFiles());
    }
  };

  // share file
  const handleSendFile = async (e, publicKey, email, fileName) => {
    const errors = fileUploadValidation({ email });

    if (!errors.email) {
      await dispatch(sendFile(publicKey, { email, fileName }));
      setState(INITIAL_STATE);
      setError(INITIAL_ERROR);
    } else {
      setError({ email: errors?.email });
    }
  };

  // prepare data set for actions
  const list = [];
  if (files?.data?.length) {
    files.data.map((data) => {
      data.files.map((file) =>
        list.push({
          _id: data._id,
          title: data.title,
          desc: data.desc,
          publicKey: data.publicKey,
          privateKey: data.privateKey,
          file: file.replace(/^.*[////]/, ""),
        })
      );
      return null;
    });
  }

  // dynamically show file as card
  const ShowFiles = () => {
    if (list?.length) {
      const tempList = [];
      list.map((l, i) => {
        tempList.push(
          <FileContainer key={i}>
            <Title>
              <Span style={{ fontWeight: "bold" }}>Title:</Span> : {l.title}
            </Title>
            <Description>
              <Span style={{ fontWeight: "bold" }}>Description:</Span> :{" "}
              {l.desc}
            </Description>
            <Link onClick={(e) => handleFileDownload(e, l.publicKey, l.file)}>
              Download
            </Link>
            <Link onClick={(e) => handleFileEdit(e, l.title, l.desc, l._id)}>
              Edit
            </Link>
            <Delete onClick={(e) => deleteFileHandle(e, l.privateKey, l.file)}>
              Delete
            </Delete>
            <Link
              onClick={(e) => handleSendFile(e, l.publicKey, email, l.file)}
            >
              Share with User Email
            </Link>
          </FileContainer>
        );
      });
      return tempList;
    }
    return null;
  };

  // final render
  return (
    <Container>
      <ContainerTop>
        <ContainerTopLeft>
          <Fieldset>
            <Legend>File Description</Legend>
            <InputWrapper>
              <Label>Title</Label>
              <Input
                type="text"
                name="title"
                value={state.title}
                onChange={handleChange}
              />
              {error?.title && <Error>{error.title}</Error>}
            </InputWrapper>
            <InputWrapper>
              <Label>Description</Label>
              <Input
                type="text"
                name="desc"
                value={state.desc}
                onChange={handleChange}
              />
            </InputWrapper>
          </Fieldset>

          <Fieldset>
            <Legend>File Upload</Legend>
            <UploadContainer>
              <InputWrapper>
                <Label>Description</Label>
                <Input
                  type="file"
                  name="files"
                  value={state.file}
                  enctype="multipart/form-data"
                  style={{ cursor: "pointer" }}
                  onChange={(e) =>
                    setState((prev) => ({
                      ...prev,
                      files: e.target.files,
                    }))
                  }
                  multiple
                />
                {error?.files && <Error>{error.files}</Error>}
              </InputWrapper>
            </UploadContainer>
          </Fieldset>

          <Fieldset>
            <Legend>User email</Legend>
            <InputWrapper>
              <Label>Email</Label>
              <Input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {error?.email && <Error>{error.email}</Error>}
              {files?.errors?.message && (
                <Error>{files?.errors?.message}</Error>
              )}
            </InputWrapper>
          </Fieldset>

          <Button
            type="submit"
            onClick={handleUpload}
            style={{ marginBottom: "10px", marginTop: "0px" }}
            disabled={isEdit}
          >
            Uploads
          </Button>

          <Button
            type="submit"
            onClick={handleEdit}
            style={{ marginBottom: "10px", marginTop: "0px" }}
            disabled={!isEdit}
          >
            Edit
          </Button>
        </ContainerTopLeft>
        <ContainerTopRight>
          <ClipLoader
            loading={files?.isLoading}
            css={{ display: "block", margin: "0 auto", borderColor: "#0a66c2" }}
            size={150}
          />
          {error?.files && <Error>{error.files}</Error>}

          <ShowFiles />
        </ContainerTopRight>
      </ContainerTop>
    </Container>
  );
};

export default Home;

// file related frontend validation
export const fileUploadValidation = ({ title, files, email }) => {
  const errors = {
    title: "",
    files: "",
  };

  const validateEmail = () => {
    if (email) {
      let mailformat = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);
      if (email.match(mailformat)) {
        return true;
      } else {
        return false;
      }
    }
  };

  const validation = [
    {
      phase: !title,
      fn: () => (errors.title = "You must set a title!"),
    },
    {
      phase: !files,
      fn: () => (errors.files = "You haven't upload any file yet!"),
    },
    {
      phase: !validateEmail(),
      fn: () => (errors.email = "Invalid email!"),
    },
    {
      phase: !email,
      fn: () => (errors.email = "Email field must not be empty!"),
    },
  ];

  validation.map(({ phase, fn }) => phase && fn());
  return errors;
};

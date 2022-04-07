import { configureStore } from "@reduxjs/toolkit";

import users from "./user";
import auth from "./auth";
import files from "./file";

// storing redux state
export default configureStore({
  reducer: {
    users,
    auth,
    files,
  },
});

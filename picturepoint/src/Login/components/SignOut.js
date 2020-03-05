import React from "react";
//import * as routes from "../constants/routes";
import { auth } from "../firebase";

const SignOutButton = () => (
  // <Link to={routes.SignIn}>
  <button type="button" onClick={auth.doSignOut}>
    Sign out
  </button>
  //</Link>
);

export default SignOutButton;

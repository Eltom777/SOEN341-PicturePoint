import React from "react";

import AuthUserContext from "./AuthUserContext";
import PasswordChangeForm from "./PasswordChange";
import EmailUpdateForm from "./EmailUpdate";
import FullnameUpdateForm from "./FullnameUpdate";
import BioUpdateform from "./BioUpdate";

const AccountPage = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <div align="center">
        <h1>Account: {authUser.email}</h1>
        <PasswordChangeForm />
        <br />
        <EmailUpdateForm />
        <br />
        <FullnameUpdateForm />
        <br />
        <BioUpdateform />
      </div>
    )}
  </AuthUserContext.Consumer>
);

export default AccountPage;

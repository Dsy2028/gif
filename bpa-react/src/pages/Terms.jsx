import React from "react";
import Footer from "../components/Footer";

export default function Terms() {
  return (
    <>
      <div className="w-full h-full flex items-center justify-center mt-4">
        <div className="max-w-2xl">
          <h1 className="text-semibold text-4xl">Terms and Conditions</h1>
          <p className="mb-4">
            Welcome to LearnX, the interactive learning platform dedicated to
            providing a rich educational experience. Before you proceed, please
            carefully read and understand the following terms and conditions
            governing your use of LearnX.<br></br>
            By accessing or using LearnX, you agree to be bound by these terms
            and conditions. If you do not agree with any part of these terms,
            you must not use LearnX.
          </p>
          <h1 className="-semibold text-2xl bb-grey">Registration</h1>
          <p className="mb-4">
            To access certain features of LearnX, you may be required to
            register for an account. You agree to provide accurate and complete
            information during the registration process and to update such
            information to keep it current.
          </p>
          <h1 className="-semibold text-2xl bb-grey">User Responsibility</h1>
          <p className="mb-4">
            You are responsible for maintaining the confidentiality of your
            account credentials and for all activities that occur under your
            account. Notify LearnX immediately of any unauthorized use of your
            account.
          </p>
          <h1 className="-semibold text-2xl bb-grey">Code of Conduct</h1>
          <p className="mb-4">
            Users agree to use LearnX in a manner consistent with ethical and
            community standards. Prohibited activities include but are not
            limited to harassment, discrimination, and the distribution of
            harmful content.
          </p>
          <h1 className="-semibold text-2xl bb-grey">Changes to Terms</h1>
          <p className="mb-4">
            LearnX may revise these terms and conditions at any time without
            notice. Continued use of LearnX after such changes constitutes
            acceptance of the updated terms.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}

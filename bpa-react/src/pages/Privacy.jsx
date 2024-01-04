import React from 'react'
import Footer from '../components/Footer.jsx'
export default function Privacy() {
  return (
    <>
      <div className="w-full h-full flex items-center justify-center mt-4">
        <div className="max-w-2xl">
          <h1 className="text-semibold text-4xl text-center">Privacy Policy for LearnX</h1>
          <p className="mb-4">
            <br></br>

          </p>
          <h1 className="-semibold text-2xl bb-grey text-center"><b>Information We Collect:</b></h1>
          <p className="mb-4">
            <b>User Registration Information:</b> When you create an account on LearnX, we collect your name, email address, and other necessary information to create and manage your account.
            <br></br>
            <b>Learning Data:</b> LearnX collects data on your learning activities, progress, and performance within the platform. This information is used to personalize your learning experience and provide tailored recommendations.
            <br></br>
            <b>Device and Usage Information:</b> We may collect information about the device you use to access LearnX, including IP address, browser type, and operating system. This helps us optimize the platform for your device and improve our services.
          </p>
          <h1 className="-semibold text-2xl bb-grey text-center"><b>How We Use Your Information:</b></h1>
          <p className="mb-4">
            <b>Personalization:</b> We use your information to personalize your learning experience, providing you with relevant content, recommendations, and feedback.
            <br></br>
            <b>Communication:</b> LearnX may use your email address to send important updates, announcements, and information related to your account or the platform.
            <br></br>
            <b>Improvement of Services:</b> We analyze user data to enhance our services, identify areas for improvement, and develop new features that cater to the needs of our users.
          </p>
          <h1 className="-semibold text-2xl bb-grey text-center"><b>Your Choices:</b></h1>
          <p className="mb-4">
            You have the right to access, correct, or delete your personal information. You can manage your privacy preferences through your account settings.
          </p>
          <h1 className="-semibold text-2xl bb-grey text-center"><b>Updates to the Privacy Policy:</b></h1>
          <p className="mb-4">
            LearnX may update this Privacy Policy to reflect changes in our practices or applicable laws. We will notify you of any significant updates through the platform or via email.
            <br></br>
            <br></br>
            By using LearnX, you acknowledge that you have read and understood this Privacy Policy. If you have any questions or concerns, please contact us at [contact@email.com].
          </p>
        </div>
      </div>
      <Footer />
    </>
  )
}
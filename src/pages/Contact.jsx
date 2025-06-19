import React from "react";

function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-100 to-pink-50 flex flex-col items-center justify-center p-6">
      <div
        className="max-w-xl mx-auto bg-white/80 shadow-lg rounded-xl p-8 mt-10 animate-fade-in border border-blue-100"
        style={{ backdropFilter: "blur(2px)" }}
      >
        <h1 className="text-3xl font-bold mb-4 text-blue-700">Contact Us</h1>
        <p className="text-gray-700 mb-4">
          Have questions, feedback, or want to collaborate? Reach out!
        </p>
        <div className="mb-4">
          <div className="font-semibold text-gray-800">Email:</div>
          <a
            href="mailto:milind.khariwale83@gmail.com"
            className="text-blue-600 hover:underline"
          >
            milind.khariwale83@gmail.com
          </a>
        </div>
        <div className="mb-4">
          <div className="font-semibold text-gray-800">LinkedIn:</div>
          <a
            href="https://www.linkedin.com/in/milindkhariwale"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            linkedin.com/in/milindkhariwale
          </a>
        </div>
        <div className="mb-4">
          <div className="font-semibold text-gray-800">Location:</div>
          <span className="text-gray-600">Mumbai, Maharashtra, India</span>
        </div>
        <p className="text-gray-500 text-sm mt-6">
          I usually respond within 24 hours. Looking forward to connecting with
          you!
        </p>
      </div>
    </div>
  );
}

export default Contact;

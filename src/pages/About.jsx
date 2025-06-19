import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-100 to-pink-50 flex flex-col items-center justify-center p-6">
      <div
        className="max-w-2xl mx-auto bg-white/80 shadow-lg rounded-xl p-8 mt-10 animate-fade-in border border-blue-100"
        style={{ backdropFilter: "blur(2px)" }}
      >
        <h1 className="text-3xl font-bold mb-4 text-blue-700">
          About This Project
        </h1>
        <p className="text-gray-700 mb-4">
          This is a modern e-commerce demo app built with React, Vite, Redux
          Toolkit, and Tailwind CSS. It demonstrates advanced state management,
          API integration, caching, debounced search, and a beautiful responsive
          UI.
        </p>
        <ul className="list-disc pl-6 text-gray-600 mb-4">
          <li>Product listing and detail pages with live API data</li>
          <li>Redux-powered state management and caching</li>
          <li>Debounced search with instant results</li>
          <li>Reusable components and clean code structure</li>
          <li>Fully responsive and mobile-friendly design</li>
        </ul>
        <p className="text-gray-500 text-sm">
          Created by Milind Khariwale as a personal project for learning and
          demonstration purposes.
        </p>
      </div>
    </div>
  );
};

export default About;

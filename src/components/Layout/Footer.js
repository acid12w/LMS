import React from "react";

export const Footer = () => {
  return (
    <footer className="bg-custom flex flex-col items-center p-10 ">
      <div className="flex gap-10 justify-around p-16 mx-40">
        <div>
          <h4 className="text-gray-300 mb-1">Company</h4>
          <h5 className="text-white text-sm">About</h5>
          <h5 className="text-white text-sm">Blog</h5>
        </div>
        <div>
          <h4 className="text-gray-300 mb-1 text-center">Team</h4>
          <h5 className="text-white text-sm">Our Team</h5>
        </div>
        <div>
          <h4 className="text-gray-300 mb-1">Teaching </h4>
          <h5 className="text-white text-sm">Become a Teacher</h5>
        </div>
      </div>
      <h3 className="text-center text-green-400 text-sm">@Copy right 2024</h3>
    </footer>
  );
};

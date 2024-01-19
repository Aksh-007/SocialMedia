import React from "react";

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <div
      className={`fixed top-20 right-0 h-[90vh] w-64 bg-white text-white p-4 transition-transform transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
      style={{ border: "2px solid black" }}
    >
      <h1>Sidebar</h1>
      {/* Add your sidebar content here */}
      <button onClick={onClose}>Close Sidebar</button>
    </div>
  );
};
export default Sidebar;

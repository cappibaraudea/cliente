import React from "react";

const Button = ({ buttonType, children }) => {
  return (
    <div className="border-gradient">
      <button
        className="relative font-sans font-bold text-2xl w-60 mx-auto"
        type={buttonType}
      >
        {children}
      </button>
    </div>
  );
};

export default Button;

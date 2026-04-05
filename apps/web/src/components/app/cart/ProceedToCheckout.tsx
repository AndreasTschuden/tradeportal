import React from "react";

const ProceedToCheckout = () => {
  const handleOnClick = async () => {
    
  };

  return (
    <button
      onClick={() => handleOnClick()}
      className="mt-8 inline-block border border-red-700 text-red-700 px-8 py-3 rounded-md font-medium"
    >
      Bestellung ansehen
    </button>
  );
};

export { ProceedToCheckout };

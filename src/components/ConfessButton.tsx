import React from "react";

type ConfessButtonProps = {
  label: string;
  onClick: () => void;
};

function ConfessButton({ label, onClick }: ConfessButtonProps) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-4 left-4 z-30 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transition"
    >
      {label}
    </button>
  );
}

export default ConfessButton;

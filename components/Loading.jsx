import React from "react";

const Loading = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full">
      <div className="w-12 h-12 border-t-4 rounded-full border-secondary animate-spin"></div>
    </div>
  );
};

export default Loading;

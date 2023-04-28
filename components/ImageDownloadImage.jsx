import React from "react";

function ImageDownloadButton({ imageUrl, fileName }) {
  const handleDownload = async () => {
    try {
      const link = document.createElement("a");
      link.href = imageUrl;
      link.setAttribute("download", "");
      link.setAttribute("target", "_blank");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button
      onClick={handleDownload}
      className="p-[5px] md:w-[150px]  ml-2 transition-all duration-300 border rounded w-fit text-tertiary bg-secondary border-secondary hover:text-secondary hover:border-primary hover:bg-gradient-to-l from-primary to-tertiary"
    >
      Download Image
    </button>
  );
}

export default ImageDownloadButton;

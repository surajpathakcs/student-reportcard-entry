"use client";

const Download = () => {

  return (
    <div>
      <div className="m-4 p-4">
        <p className="text-xl m-4">Click this button below to download all students report</p>
        <a href="/api/download" className="m-4 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow hover:bg-purple-600 transition-colors duration-200">Download all files</a>
      </div>
    </div>
  );
};

export default Download;

"use client";

const Download = () => {

  async function download() {
    const response = await fetch("/api/download");
    if (!response.ok) throw new Error("Response is not ok");
    const data = await response.json();
    console.log(data);
  }

  return (
    <div>
      <div className="m-2 border-2 border-purple-400">
        <button className="button" onClick={download}>
          Download all form
        </button>
      </div>
    </div>
  );
};

export default Download;

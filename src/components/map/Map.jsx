import React from "react";

export default function Map() {

  // console.log(import.meta.env.VITE_GOOGLE_API);

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: "600px", width: "100%" }}>
      <iframe
        src={`${import.meta.env.VITE_GOOGLE_API}`}
        width="100%"
        height="100%"
        style={{ border: "0" }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
}

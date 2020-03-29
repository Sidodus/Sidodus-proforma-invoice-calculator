import React from "react";
import Footer from "../layouts/Footer";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div
      style={{
        boxShadow: "0px 2px 4px rgba(0, 0, 0, .5)"
      }}
    >
      <div
        className="container-fluid pt-5 pb-3 px-5 mb-1"
        // Main Background Styling
        style={{
          backgroundImage:
            "linear-gradient(lightgray 2%, white 5%, gray 15%, lightgray 60%)",
          transform: "rotate(180deg)"
        }}
      >
        <div
          className="row"
          // Inner Background Styling
          style={{
            backgroundImage:
              "linear-gradient(lightgray 1%, white 30%, rgb(187, 202, 131) 100%)",
            transform: "rotate(180deg)",
            paddingBottom: "10px",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, .5)"
          }}
        >
          <div className="mx-auto">
            <h4>
              <span className="text-danger display-4"> 404 </span> Page Not
              Found <hr />
            </h4>
            <p>
              Sorry!!! The Page You Request Is Not Available As This A Single
              Page Application (SPA)
            </p>
            <p className="h5 text-secondary pb-3">
              Return To <Link to="/">Application</Link>
            </p>
          </div>
        </div>
      </div>
      <small>
        <Footer />
      </small>
    </div>
  );
}

export default NotFound;

import React, { Component } from "react";

class Footer extends Component {
  render() {
    // Set Footer Year
    const thisYear = new Date("2020").getFullYear();
    let presentYear = new Date().getFullYear();
    return (
      <footer
        style={{
          color: "gray",
          textAlign: "center",
          marginTop: "58px",
          marginBottom: "7px",
          paddingBottom: "7px"
        }}
      >
        {" "}
        &copy; Copyright{" "}
        <span id="copyRightYear">
          {thisYear === presentYear
            ? thisYear
            : thisYear < presentYear
            ? thisYear + " - " + presentYear
            : null}{" "}
        </span>{" "}
        by Saheed Odulaja <br />
        <div>
          Get Source Code From:{" "}
          <a
            href="https://github.com/Sidodus/Sidodus-proforma-invoice-calculator/"
            className="text-secondary"
          >
            https://github.com/Sidodus/Sidodus-proforma-invoice-calculator/
          </a>
        </div>
      </footer>
    );
  }
}

export default Footer;

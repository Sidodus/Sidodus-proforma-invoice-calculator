import React, { Component } from "react";
import { Link } from "react-router-dom";

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
          <Link
            to="https://github.com/Sidodus/Sidodus-proforma-invoice-calculator/"
            className="text-secondary"
          >
            Get Source Code From:
            https://github.com/Sidodus/Sidodus-proforma-invoice-calculator/
          </Link>
        </div>
      </footer>
    );
  }
}

export default Footer;

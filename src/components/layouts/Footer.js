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
          marginBottom: "25px"
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
        by Saheed Odulaja <hr />
        <div>
          <Link
            to="https://github.com/Sidodus/proforma-invoice-calculator"
            className="text-secondary"
          >
            Get Source Code From:
            https://github.com/Sidodus/proforma-invoice-calculator
          </Link>
        </div>
        <div>
          <Link
            to="https://sidodus.github.io/proforma-invoice-calculator"
            className="text-secondary"
          >
            Use Online: @ https://sidodus.github.io/proforma-invoice-calculator
          </Link>
        </div>
      </footer>
    );
  }
}

export default Footer;

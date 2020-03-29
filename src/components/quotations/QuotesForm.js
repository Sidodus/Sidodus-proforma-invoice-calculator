import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addExchangeRate, getExchangeRate } from "../../actions/currencyTypes";
import { getStorageExchangeRate } from "../../actions/currencyStorageActions";
import Form from "./Form";
import Form2 from "./Form2";

import classnames from "classnames";
import { getStorageQuotations } from "../../actions/quotationStorageAction";

class QuotesForm extends Component {
  state = {
    toggle1: false,
    toggle2: false,
    naira: "",
    dollar: "",
    exchangedNaira: "",
    exchangedDollar: ""
  };

  componentDidMount() {
    this.props.getExchangeRate();
  }

  UNSAFE_componentWillReceiveProps(props) {
    const exchangeRate = getStorageExchangeRate();

    this.setState({
      exchangedNaira: exchangeRate.naira,
      exchangedDollar: exchangeRate.dollar
    });
  }

  toggle1 = () => {
    this.setState({ toggle1: !this.state.toggle1 });

    // Manage Exchange Form Toggle
    if (this.state.toggle1 === true) {
      localStorage.setItem("toggle_exchange_rate_form", JSON.stringify(false));
    } else if (this.state.toggle1 === false) {
      localStorage.setItem("toggle_exchange_rate_form", JSON.stringify(true));
    }
  };

  toggle2 = () => {
    this.setState({ toggle2: !this.state.toggle2 });

    // Manage Exchange Form Toggle
    if (this.state.toggle2 === true) {
      localStorage.setItem("toggle_form2", JSON.stringify(false));
    } else if (this.state.toggle2 === false) {
      localStorage.setItem("toggle_form2", JSON.stringify(true));
    }
  };

  valueChanged = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitExchangeRate = e => {
    e.preventDefault();

    const quotations = getStorageQuotations();

    // Prevent Changing Of Exchange Rate Value Once An Expence Has Been Added
    if (quotations.length === 0) {
      let { naira, dollar } = this.state;

      // Set itemUnit Default Value
      if (Number(naira) === Number(dollar)) {
        alert("New Corresponding Exchange Rate Values Must be different");
      } else if (Number(naira) < Number(dollar)) {
        alert(
          "(AT THE MOMENT) Naira Exchange Rate Value Can't Be Less Than Dollar Exchange Rate Value"
        );
      } else if (Number(naira) === 0 || Number(dollar) === 0) {
        alert("New Exchange Rate Must Have A Corresponding Value");
      } else {
        const exchangeRate = {
          naira,
          dollar
        };

        // Get Proforma Length
        if (JSON.parse(localStorage.getItem("quotations")).length !== 0) {
          // click the init Currency
          const initCurrency = JSON.parse(localStorage.getItem("initCurrency"));

          if (initCurrency === "Dollar") {
            document.getElementById("usaCurr").click();
          } else if (initCurrency === "Naira") {
            document.getElementById("nigCurr").click();
          }

          this.props.addExchangeRate(exchangeRate);
          this.setState({ naira: "", dollar: "" });
        } else {
          this.props.addExchangeRate(exchangeRate);
          this.setState({ naira: "", dollar: "" });
        }
      }
    } else {
      alert("You Can't Change The Exchange Rate Once You Enter An Expense");
    }
  };

  render() {
    const {
      toggle1,
      toggle2,
      naira,
      dollar,
      exchangedNaira,
      exchangedDollar
    } = this.state;
    return (
      <div>
        <div
          style={{
            backgroundImage:
              "linear-gradient(lightgray 5%, white 12%,gray 5%,  lightgray 60%)",
            transform: "rotate(180deg)"
          }}
        >
          <br />
        </div>
        <div
          className="container-fluid pt-3 pb-3 px-5 mb-1"
          // Main Background Styling
          style={{
            backgroundImage:
              "linear-gradient(lightgray 2%, gray 15%, lightgray 90%)",
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
            <div className="col-sm-7">
              <h4 className="text-center text-secondary">
                <i className="fa fa-align-center fa-sm" /> STEP 1
              </h4>
              <div>
                <label>
                  <b>Enter Quotation Details...</b>
                </label>
                {toggle1 ? (
                  <form
                    onSubmit={this.submitExchangeRate}
                    id="form2"
                    className="input-group mb-3"
                    style={boxShadows}
                  >
                    <div className="input-group-append">
                      <span className="input-group-text bg-dark text-white">
                        ₦{exchangedNaira}
                      </span>
                    </div>
                    <input
                      type="number"
                      name="naira"
                      className="form-control"
                      placeholder="Nigerian Naira (NGN)"
                      value={naira}
                      onChange={this.valueChanged}
                    />
                    <button className="btn btn-sm btn-info" style={boxShadows}>
                      SET EXCHANGE RATE
                    </button>
                    <input
                      type="number"
                      name="dollar"
                      className="form-control"
                      placeholder="US Dollar (USD)"
                      value={dollar}
                      onChange={this.valueChanged}
                    />
                    <div className="input-group-append">
                      <span className="input-group-text bg-dark text-white">
                        ${exchangedDollar}
                      </span>
                    </div>
                  </form>
                ) : null}
                <div
                  onClick={this.toggle1}
                  id="setExchangeRateBtn"
                  className="btn btn-outline-primary btn-sm float-right mb-2"
                  style={boxShadows}
                >
                  Set Exchange Rate
                </div>
              </div>
              <Form
                placeholder1="e.g. Graphics Design"
                inputGroupText1="Item Name"
                placeholder2="e.g. Designing Flyer Artwork Based On Spec"
                inputGroupText2="Desccription"
                placeholder4="(1 Unit is the default value)"
                inputGroupText4="Item Unit"
              />
            </div>
            <div className="col-sm-5 mt-4 pt-2">
              <h4 className="text-center text-secondary">
                <i className="fa fa-align-center fa-sm" /> STEP 2
              </h4>
              <button
                id="generateInvoice"
                className={classnames("btn form-control", {
                  "btn-secondary": !this.state.toggle2,
                  "btn-outline-success": this.state.toggle2
                })}
                style={boxShadows}
                onClick={this.toggle2}
              >
                Generate Invoice
              </button>
              {toggle2 ? (
                <div className="mt-1 col-sm-12">
                  <Form2
                    placeholder1="% (0 is the default value)"
                    inputGroupText1="VAT"
                    placeholder2="e.g. 25%"
                    inputGroupText2="Service Charge (in %)"
                    placeholder3="Total Job (Unit Number)"
                    inputGroupText3="(000s)"
                    placeholder4="Job Name"
                    inputGroupText4="LPO Item Name"
                  />
                </div>
              ) : null}
            </div>
          </div>
        </div>
        <div
          style={{
            backgroundImage:
              "linear-gradient(lightgray 5%, white 12%,gray 5%,  lightgray 60%)",
            marginTop: "-2px",
            marginBottom: "7px"
          }}
        >
          <br />
        </div>
      </div>
    );
  }
}

QuotesForm.propTypes = {
  addExchangeRate: PropTypes.func.isRequired,
  getExchangeRate: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  exchangeRate: state.quotation.exchangeRate
});

export default connect(mapStateToProps, { addExchangeRate, getExchangeRate })(
  QuotesForm
);

const boxShadows = {
  boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
};

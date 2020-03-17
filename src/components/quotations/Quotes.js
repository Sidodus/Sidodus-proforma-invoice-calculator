import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import {
  getQuotations,
  deleteQuotation,
  clearAllQuotations,
  addProformaInvoice
} from "../../actions/quotationTypes";
import { connect } from "react-redux";

import { JSnumberToWordProcessor } from "../JSnumberToWordProcessor/JSnumberToWordProcessor";
import { getStorageQuotations } from "../../actions/quotationStorageAction";
import { getStorageCurrency } from "../../actions/currencyStorageActions";

class Quotes extends Component {
  state = {
    storageCurrency: {},

    totalPrice: "",
    totalPrice0: "",
    totalPrice1: "",
    quotes: []
  };
  componentDidMount() {
    this.props.getQuotations();

    // Hide The Recaculate Btn Under Invoice if No Invoice
    if (
      JSON.parse(localStorage.getItem("proforma_invoice")) === null ||
      JSON.parse(localStorage.getItem("proforma_invoice")).serviceCharge === 0
    ) {
      document.getElementById("recaculateInvoice").style.display = "none";
    }

    // Hide Clear Btn If No Expenses
    if (JSON.parse(localStorage.getItem("quotations")).length === 0) {
      document.getElementById("clearAllInvoice").style.display = "none";
    } else {
      document.getElementById("clearAllInvoice").style.display = "block";
    }
  }

  UNSAFE_componentWillReceiveProps(props) {
    const storageCurrency = getStorageCurrency();

    const { quotations } = props;

    if (quotations !== undefined) {
      const quotes = quotations.map(quotation => {
        const itemId = quotation.id;
        const itemName = quotation.itemName;
        const itemDescription = quotation.itemDescription;

        const itemUnit = Number(quotation.itemUnit).toFixed(2);
        const itemUnit0 = JSnumberToWordProcessor(String(itemUnit))[0];
        const itemUnit1 = JSnumberToWordProcessor(String(itemUnit))[1];

        const itemPrice = Number(quotation.itemPrice).toFixed(2);
        const itemPrice0 = JSnumberToWordProcessor(String(itemPrice))[0];
        const itemPrice1 = JSnumberToWordProcessor(String(itemPrice))[1];

        const itemPriceTotal = Number(
          quotation.itemUnit * quotation.itemPrice
        ).toFixed(2);
        const itemPriceTotal0 = JSnumberToWordProcessor(
          String(itemPriceTotal)
        )[0];
        const itemPriceTotal1 = JSnumberToWordProcessor(
          String(itemPriceTotal)
        )[1];

        return {
          itemId,
          itemName,
          itemDescription,
          itemUnit,
          itemUnit0,
          itemUnit1,
          itemPrice,
          itemPrice0,
          itemPrice1,
          itemPriceTotal,
          itemPriceTotal0,
          itemPriceTotal1
        };
      });

      // Calculate Total Price
      let totalPrice = "0.00";
      let totalPrice0 = JSnumberToWordProcessor(String(totalPrice))[0];
      let totalPrice1 = JSnumberToWordProcessor(String(totalPrice))[1];

      if (props.quotations.length !== 0) {
        totalPrice = Number(
          props.quotations
            .map(quotation => Number(quotation.itemUnit * quotation.itemPrice))
            .reduce((acc, value) => acc + value)
        ).toFixed(2);
        totalPrice0 = JSnumberToWordProcessor(String(totalPrice))[0];
        totalPrice1 = JSnumberToWordProcessor(String(totalPrice))[1];
      }

      this.setState({
        storageCurrency,

        totalPrice,
        totalPrice0,
        totalPrice1,

        quotes
      });
    }
  }

  resetQuotes = () => {
    const nullInvoice = {
      totalQuoteAmount: Number(),
      lpoItemName: "",
      totalJobUnit: Number(),
      serviceCharge: Number(),
      vat: Number()
    };

    // Clear Expenses & Invoice
    this.props.addProformaInvoice(nullInvoice);
    this.props.clearAllQuotations();

    // Hide clearAllInvoice, Recaculate  & Clear Btn Under Invoice
    document.getElementById("clearInvoice").style.display = "none";
    document.getElementById("recaculateInvoice").style.display = "none";
    document.getElementById("clearAllInvoice").style.display = "none";
  };

  clearAllInvoice = () => {
    const confirmDelete = window.confirm("Confirm Delete");

    if (confirmDelete) {
      this.resetQuotes();
    }
  };

  deleteQuote = id => {
    const confirmDelete = window.confirm("Confirm Delete");
    // Dispatch
    if (confirmDelete) {
      this.props.deleteQuotation(id);

      const quotationsLength = getStorageQuotations();

      if (quotationsLength.length === 0) {
        this.resetQuotes();
      }
    }
  };

  render() {
    const {
      storageCurrency,
      totalPrice,
      totalPrice0,
      totalPrice1,
      quotes
    } = this.state;

    return (
      <React.Fragment>
        <table
          className="table table-striped table-bordered"
          // Use This Style Props Without Border Instead of .table-responsive
          style={{
            display: "block",
            width: "100%",
            overflowX: "auto",
            border: "none"
          }}
        >
          <thead className="thead-inverse">
            <tr className="table-borderless text-centeer">
              <th
                style={{
                  backgroundColor: "firebrick",
                  color: "white"
                }}
              >
                EXPENSES
              </th>
              <th></th>
              <th></th>
              <th></th>
              <th
                id="clearAllInvoice"
                className="text-center btn btn-sm btn-danger float-right"
                style={boxShadows}
                onClick={this.clearAllInvoice}
              >
                Clear All
              </th>
            </tr>
            <tr className="table-primary">
              <th>Item Name</th>
              <th>Description</th>
              <th>Unit</th>
              <th>Unit Price</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {quotes.map(quotation => (
              <tr key={quotation.itemId}>
                <td>{quotation.itemName}</td>
                <td>{quotation.itemDescription}</td>
                <td>{quotation.itemUnit0.displayNum}</td>
                <td>
                  {storageCurrency.sign}
                  {quotation.itemPrice0.displayNum + "."}
                  <small>{quotation.itemPrice1.displayNum}</small>{" "}
                </td>
                <td>
                  {storageCurrency.sign}
                  {quotation.itemPriceTotal0.displayNum + "."}
                  <small>{quotation.itemPriceTotal1.displayNum}</small>{" "}
                </td>
                <td>
                  <Link to={`/update/${quotation.itemId}`}>
                    <i
                      className="fa fa-pencil-alt text-success"
                      style={{ cursor: "pointer" }}
                    />{" "}
                  </Link>
                  {""}
                  <i
                    className="fa fa-times text-danger"
                    style={{ cursor: "pointer" }}
                    onClick={this.deleteQuote.bind(this, quotation.itemId)}
                  />
                </td>
              </tr>
            ))}
            <tr className="h5 text-secondary">
              <td className="text-primary">TOTAL</td>
              <td></td>
              <td></td>
              <td></td>
              {Number(totalPrice) === 0 ? (
                <td className="text-success">
                  {storageCurrency.sign}
                  {totalPrice0.displayNum + "."}
                  <small>{totalPrice1.displayNum}</small>{" "}
                </td>
              ) : (
                <td className="text-danger">
                  {storageCurrency.sign}
                  {totalPrice0.displayNum + "."}
                  <small>{totalPrice1.displayNum}</small>{" "}
                </td>
              )}
            </tr>
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

Quotes.propType = {
  quotations: PropTypes.array.isRequired,
  getQuotations: PropTypes.func.isRequired,
  deleteQuotation: PropTypes.func.isRequired,
  clearAllQuotations: PropTypes.func.isRequired,
  addProformaInvoice: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  quotations: state.quotation.quotations
});

export default connect(mapStateToProps, {
  getQuotations,
  deleteQuotation,
  clearAllQuotations,
  addProformaInvoice
})(Quotes);

const boxShadows = {
  boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
};

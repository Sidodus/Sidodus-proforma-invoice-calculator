import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getProformaInvoice,
  addProformaInvoice
} from "../../actions/quotationTypes";

import { JSnumberToWordProcessor } from "../JSnumberToWordProcessor/JSnumberToWordProcessor";
import {
  getStorageQuotations,
  getStorageProformaInvoice
} from "../../actions/quotationStorageAction";
import { getCurrency } from "../../actions/currencyTypes";
import { getStorageCurrency } from "../../actions/currencyStorageActions";

class QuotesCard extends Component {
  state = {
    proforma: "1",
    storageCurrency: {},

    lpoItemName: "",

    totalJobUnit: "",
    totalJobUnit0: {},
    totalJobUnit1: {},
    serviceCharge: "",
    serviceCharge0: {},
    serviceCharge1: {},
    totalQuoteAmount: "",
    totalQuoteAmount0: {},
    totalQuoteAmount1: {},
    vat: "",
    vat0: {},
    vat1: {},
    chargesPercentage: "",
    chargesPercentage0: {},
    chargesPercentage1: {},
    totalValue: "",
    totalValue0: {},
    totalValue1: {},
    vatPayable: "",
    vatPayable0: {},
    vatPayable1: {},
    totalPayableWithVat: "",
    totalPayableWithVat0: {},
    totalPayableWithVat1: {},
    unitPrice: "",
    unitPrice0: {},
    unitPrice1: {},
    unit1000Price: "",
    unit1000Price0: {},
    unit1000Price1: {}
  };

  componentDidMount() {
    this.props.getProformaInvoice();
    this.props.getCurrency();
  }

  UNSAFE_componentWillReceiveProps(props) {
    const storageCurrency = getStorageCurrency();

    // Hide Clear BTN
    if (props.proformaInvoice.totalQuoteAmount === 0) {
      document.getElementById("clearInvoice").style.display = "none";
    } else {
      document.getElementById("clearInvoice").style.display = "block";
    }

    const totalJobUnit = Number(props.proformaInvoice.totalJobUnit).toFixed(2);
    const totalJobUnit0 = JSnumberToWordProcessor(String(totalJobUnit))[0];
    const totalJobUnit1 = JSnumberToWordProcessor(String(totalJobUnit))[1];

    const serviceCharge = Number(props.proformaInvoice.serviceCharge).toFixed(
      1
    );
    const serviceCharge0 = JSnumberToWordProcessor(String(serviceCharge))[0];
    const serviceCharge1 = JSnumberToWordProcessor(String(serviceCharge))[1];

    const totalQuoteAmount = Number(
      props.proformaInvoice.totalQuoteAmount
    ).toFixed(2);
    const totalQuoteAmount0 = JSnumberToWordProcessor(
      String(totalQuoteAmount)
    )[0];
    const totalQuoteAmount1 = JSnumberToWordProcessor(
      String(totalQuoteAmount)
    )[1];

    const vat = Number(props.proformaInvoice.vat).toFixed(1);
    const vat0 = JSnumberToWordProcessor(String(vat))[0];
    const vat1 = JSnumberToWordProcessor(String(vat))[1];

    const chargesPercentage = (
      (Number(props.proformaInvoice.serviceCharge) / 100) *
      Number(props.proformaInvoice.totalQuoteAmount)
    ).toFixed(2);
    const chargesPercentage0 = JSnumberToWordProcessor(
      String(chargesPercentage)
    )[0];
    const chargesPercentage1 = JSnumberToWordProcessor(
      String(chargesPercentage)
    )[1];

    const totalValue = (
      Number(props.proformaInvoice.totalQuoteAmount) + Number(chargesPercentage)
    ).toFixed(2);
    const totalValue0 = JSnumberToWordProcessor(String(totalValue))[0];
    const totalValue1 = JSnumberToWordProcessor(String(totalValue))[1];

    const vatPayable = (
      (Number(props.proformaInvoice.vat) / 100) *
      Number(totalValue)
    ).toFixed(2);
    const vatPayable0 = JSnumberToWordProcessor(String(vatPayable))[0];
    const vatPayable1 = JSnumberToWordProcessor(String(vatPayable))[1];

    const totalPayableWithVat = (
      Number(totalValue) + Number(vatPayable)
    ).toFixed(2);
    const totalPayableWithVat0 = JSnumberToWordProcessor(
      String(totalPayableWithVat)
    )[0];
    const totalPayableWithVat1 = JSnumberToWordProcessor(
      String(totalPayableWithVat)
    )[1];

    let unitPrice = (
      Number(totalPayableWithVat) / Number(props.proformaInvoice.totalJobUnit)
    ).toFixed(2);
    if (isNaN(unitPrice)) {
      unitPrice = "0.00";
    }
    const unitPrice0 = JSnumberToWordProcessor(String(unitPrice))[0];
    const unitPrice1 = JSnumberToWordProcessor(String(unitPrice))[1];

    let unit1000Price = Number(
      Number(totalPayableWithVat / Number(props.proformaInvoice.totalJobUnit)) *
        1000
    ).toFixed(2);
    if (isNaN(unit1000Price)) {
      unit1000Price = "0.00";
    }
    const unit1000Price0 = JSnumberToWordProcessor(String(unit1000Price))[0];
    const unit1000Price1 = JSnumberToWordProcessor(String(unit1000Price))[1];

    this.setState({
      storageCurrency,

      lpoItemName: props.proformaInvoice.lpoItemName,

      totalJobUnit,
      totalJobUnit0,
      totalJobUnit1,
      serviceCharge,
      serviceCharge0,
      serviceCharge1,
      totalQuoteAmount,
      totalQuoteAmount0,
      totalQuoteAmount1,
      vat,
      vat0,
      vat1,
      chargesPercentage,
      chargesPercentage0,
      chargesPercentage1,
      totalValue,
      totalValue0,
      totalValue1,
      vatPayable,
      vatPayable0,
      vatPayable1,
      totalPayableWithVat,
      totalPayableWithVat0,
      totalPayableWithVat1,
      unitPrice,
      unitPrice0,
      unitPrice1,
      unit1000Price,
      unit1000Price0,
      unit1000Price1
    });
  }

  proforma = () => {
    this.setState({ proforma: document.getElementById("sel1").value });
  };

  clearProformaInvoice = () => {
    const confirmDelete = window.confirm("Confirm Delete");

    if (confirmDelete) {
      const nullInvoice = {
        totalQuoteAmount: Number(),
        lpoItemName: "",
        totalJobUnit: Number(),
        serviceCharge: Number(),
        vat: Number()
      };

      this.props.addProformaInvoice(nullInvoice);

      document.getElementById("clearInvoice").style.display = "none";
    }
  };

  recaculateInvoice = () => {
    const quotations = getStorageQuotations();

    const storageProformaInvoice = getStorageProformaInvoice();

    const {
      lpoItemName,
      totalJobUnit,
      serviceCharge,
      vat
    } = storageProformaInvoice;

    // Only Run If There Are Expences
    if (quotations.length !== 0) {
      const totalQuoteAmount = quotations
        .map(quotation => Number(quotation.itemUnit * quotation.itemPrice))
        .reduce((acc, value) => acc + value);

      const proformaInvioce = {
        totalQuoteAmount: Number(totalQuoteAmount),
        lpoItemName,
        totalJobUnit: Number(totalJobUnit),
        serviceCharge: Number(serviceCharge),
        vat: Number(vat)
      };

      this.props.addProformaInvoice(proformaInvioce);

      // Show Clear Invoice & Recaculate BTN
      document.getElementById("clearInvoice").style.display = "block";
      document.getElementById("recaculateInvoice").style.display = "block";
    } else {
      alert("You  Must Enter At Least 1 Expense In (STEP 1)");
    }
  };

  render() {
    const {
      proforma,
      storageCurrency,

      lpoItemName,

      totalJobUnit,
      totalJobUnit0,
      // totalJobUnit1,
      serviceCharge,
      serviceCharge0,
      serviceCharge1,
      // totalQuoteAmount,
      // totalQuoteAmount0,
      // totalQuoteAmount1,
      vat,
      vat0,
      vat1,
      chargesPercentage,
      chargesPercentage0,
      chargesPercentage1,
      totalValue,
      totalValue0,
      totalValue1,
      vatPayable,
      vatPayable0,
      vatPayable1,
      totalPayableWithVat,
      totalPayableWithVat0,
      totalPayableWithVat1,
      unitPrice,
      unitPrice0,
      unitPrice1,
      // unit1000Price,
      unit1000Price0,
      unit1000Price1
    } = this.state;

    let { proformaInvoice } = this.props;

    return (
      <div className="card my-3 table-dark" style={boxShadows}>
        <div className="card-header text-dark h5" style={boxShadows}>
          <i className="fa fa-file-invoice-dollar" /> PROFORMA INVOICE{" "}
          <button
            id="clearInvoice"
            className="float-right btn btn-danger btn-sm"
            style={boxShadows}
            onClick={this.clearProformaInvoice}
          >
            Clear Invoice
          </button>
          <button
            id="recaculateInvoice"
            className="float-right btn btn-primary btn-sm mr-3"
            style={boxShadows}
            onClick={this.recaculateInvoice}
          >
            Recaculate
          </button>
        </div>
        <div className="card-body table-responsive text-center">
          <table
            className="table table-striped table-bordered table-hover table-sm"
            style={boxShadows}
          >
            <thead className="table-success">
              <tr>
                <th>Material</th>
                <th>Quantity</th>
                <th>Unit Price</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr className="h6 text-secondary">
                <td>{proformaInvoice.lpoItemName}</td>
                <td>
                  {Number(totalJobUnit) === 0 ? null : totalJobUnit0.displayNum}
                </td>
                <td>{}</td>
                <td>
                  {Number(totalValue) === 0
                    ? null
                    : storageCurrency.sign + totalValue0.displayNum + "."}
                  {Number(totalValue) === 0 ? null : (
                    <small>{totalValue1.displayNum}</small>
                  )}
                </td>
              </tr>
              <tr className="h6 text-secondary">
                <td>
                  VAT{" "}
                  <small>
                    {Number(vat) === 0
                      ? null
                      : "(@" + vat0.displayNum + "." + vat1.displayNum + "%)"}
                  </small>
                </td>
                <td></td>
                <td></td>
                <td>
                  {Number(vatPayable) === 0
                    ? null
                    : storageCurrency.sign + vatPayable0.displayNum + "."}
                  {Number(vatPayable) === 0 ? null : (
                    <small>{vatPayable1.displayNum}</small>
                  )}
                </td>
              </tr>
              <tr className="h5 text-secondary">
                <td className="text-primary">
                  TOTAL <small className="text-secondary">(VAT inc.)</small>
                </td>
                <td>
                  {Number(totalJobUnit) === 0 ? null : totalJobUnit0.displayNum}
                </td>
                <td>
                  {Number(unitPrice) === 0
                    ? null
                    : storageCurrency.sign + unitPrice0.displayNum + "."}
                  {Number(unitPrice) === Infinity ||
                  Number(unitPrice) === 0 ? null : (
                    <small>{unitPrice1.displayNum}</small>
                  )}
                </td>
                <td>
                  {Number(totalPayableWithVat) === 0
                    ? null
                    : storageCurrency.sign +
                      totalPayableWithVat0.displayNum +
                      "."}
                  {Number(totalPayableWithVat) === 0 ? null : (
                    <small>{totalPayableWithVat1.displayNum}</small>
                  )}
                </td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr className="h5 text-secondary">
                <td className="text-success">
                  PROFIT
                  <small className="text-secondary">
                    (after tax)
                    <small>
                      {Number(serviceCharge) === 0
                        ? null
                        : " [@" +
                          serviceCharge0.displayNum +
                          "." +
                          serviceCharge1.displayNum +
                          "%]"}
                    </small>
                  </small>
                </td>
                <td></td>
                <td></td>
                <td>
                  {Number(chargesPercentage) === 0
                    ? null
                    : storageCurrency.sign +
                      chargesPercentage0.displayNum +
                      "."}
                  {Number(chargesPercentage) === 0 ? null : (
                    <small>{chargesPercentage1.displayNum}</small>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="card-footer" style={boxShadows}>
          {Number(unitPrice) === 0 ? null : (
            <div className="form-group" style={boxShadows}>
              <select
                className="form-control"
                id="sel1"
                onClick={(this, this.proforma)}
              >
                <option value="1">Display Unit Price</option>
                <option value="1000">Display Price Per 1,000 units</option>
                <option value="101">Display TOTAL (VAT inc.)</option>
                <option value="102">
                  PROFIT(after tax [
                  {vat0.displayNum + "." + vat1.displayNum + "%"}])
                </option>
              </select>
            </div>
          )}
          {Number(unitPrice) === Infinity ||
          Number(unitPrice) === 0 ? null : proforma === "1" ? (
            <ul style={{ listStyleType: "none" }}>
              <li className="text-secondary h5">
                <span className="h4 text-primary">PROFORMA INVOICE</span> <hr />
                {totalJobUnit0.displayNum} pcs of {lpoItemName} @{" "}
                {storageCurrency.sign}
                {unitPrice0.displayNum + "."}
                <small>{unitPrice1.displayNum}</small>
                {" (" + unitPrice0.displayWord + " " + storageCurrency.senior}
                {Number(unitPrice1.displayNum) === 0
                  ? null
                  : ", and " +
                    unitPrice1.displayWord +
                    " " +
                    storageCurrency.junior}
                ) each.
              </li>
            </ul>
          ) : proforma === "1000" ? (
            <ul style={{ listStyleType: "none" }}>
              <li className="text-secondary h5">
                <span className="h4 text-primary">PROFORMA INVOICE</span> <hr />
                {totalJobUnit0.displayNum} pcs of {lpoItemName} @{" "}
                {storageCurrency.sign}
                {unit1000Price0.displayNum + "."}
                <small>{unit1000Price1.displayNum}</small>
                {" (" +
                  unit1000Price0.displayWord +
                  " " +
                  storageCurrency.senior}
                {Number(unit1000Price1.displayNum) === 0
                  ? null
                  : ", and " +
                    unit1000Price1.displayWord +
                    " " +
                    storageCurrency.junior}
                ) per 1000 units.
              </li>
            </ul>
          ) : proforma === "101" ? (
            <ul style={{ listStyleType: "none" }}>
              <li className="text-secondary h5">
                <span className="h4 text-primary">PROFORMA INVOICE</span> <hr />
                {totalJobUnit0.displayNum} pcs of {lpoItemName} @{" "}
                {storageCurrency.sign}
                {totalPayableWithVat0.displayNum + "."}
                <small>{totalPayableWithVat1.displayNum}</small>
                {" (" +
                  totalPayableWithVat0.displayWord +
                  " " +
                  storageCurrency.senior}
                {Number(totalPayableWithVat1.displayNum) === 0
                  ? null
                  : ", and " +
                    totalPayableWithVat1.displayWord +
                    " " +
                    storageCurrency.junior +
                    ")."}{" "}
              </li>
            </ul>
          ) : (
            <ul style={{ listStyleType: "none" }}>
              <li className="text-secondary h5">
                <span className="h4 text-primary">PROFORMA INVOICE</span> <hr />
                {totalJobUnit0.displayNum} pcs of {lpoItemName} @{" "}
                {storageCurrency.sign}
                {totalPayableWithVat0.displayNum + "."}
                <small>{totalPayableWithVat1.displayNum}</small>
                {" (" +
                  totalPayableWithVat0.displayWord +
                  " " +
                  storageCurrency.senior}
                {Number(totalPayableWithVat1.displayNum) === 0
                  ? null
                  : ", and " +
                    totalPayableWithVat1.displayWord +
                    " " +
                    storageCurrency.junior}
                ). <br />
                <br />
                <span className="h4 text-success">PROFIT</span> <hr />
                {storageCurrency.sign}
                {chargesPercentage0.displayNum + "."}
                <small>{chargesPercentage1.displayNum}</small>
                {" (" +
                  chargesPercentage0.displayWord +
                  " " +
                  storageCurrency.senior}
                {Number(chargesPercentage1.displayNum) === 0
                  ? null
                  : ", and " +
                    chargesPercentage1.displayWord +
                    " " +
                    storageCurrency.junior}
                ).{" "}
              </li>
            </ul>
          )}
        </div>
      </div>
    );
  }
}

QuotesCard.propTypes = {
  proformaInvoice: PropTypes.object.isRequired,
  getProformaInvoice: PropTypes.func.isRequired,
  addProformaInvoice: PropTypes.func.isRequired,
  getCurrency: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  proformaInvoice: state.quotation.proformaInvoice
});

export default connect(mapStateToProps, {
  getProformaInvoice,
  addProformaInvoice,
  getCurrency
})(QuotesCard);

const boxShadows = {
  boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
};

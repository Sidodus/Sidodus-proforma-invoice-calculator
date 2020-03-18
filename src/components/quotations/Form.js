import React from "react";

// import uuid from "uuid";
import { v4 as uuid } from "uuid";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addQuotation } from "../../actions/quotationTypes";

import {
  addCurrency,
  calculateNairaExchangeRate,
  calculateDollarExchangeRate
} from "../../actions/currencyTypes";
import {
  getStorageCurrency,
  getStorageExchangeRate,
  toggleStorageExchangeRateForm,
  toggleStorageForm2
} from "../../actions/currencyStorageActions";
import {
  getStorageQuotations,
  getStorageProformaInvoice
} from "../../actions/quotationStorageAction";

class Form extends React.Component {
  state = {
    itemName: "",
    itemDescription: "",
    itemUnit: "",
    itemPrice: "",
    currencySenior: ""
  };

  componentDidMount() {
    // set toggle For ExchangeRate Form
    toggleStorageExchangeRateForm();
    toggleStorageForm2();

    let currency = getStorageCurrency();

    // Set Currency Flag Display
    if (currency.senior === "Naira") {
      // addCurrency
      document.getElementById("nigCurr").style.opacity = "1";
      document.getElementById("usaCurr").style.opacity = "0.5";
    } else if (currency.senior === "Dollar") {
      document.getElementById("usaCurr").style.opacity = "1";
      document.getElementById("nigCurr").style.opacity = "0.5";
    }

    this.setState({ currencySenior: currency.senior });
  }

  nigCurrency = () => {
    let initCurrency = getStorageCurrency();
    let getAllQuotation = getStorageQuotations();

    const exchangeRate = getStorageExchangeRate();
    const naira = Number(exchangeRate.naira);
    const dollar = Number(exchangeRate.dollar);

    const currency = {
      senior: "Naira",
      junior: "kobo",
      sign: "₦",
      abbrevation: "NGN"
    };

    document.getElementById("nigCurr").style.opacity = "1";
    document.getElementById("usaCurr").style.opacity = "0.5";

    this.props.addCurrency(currency);
    this.setState({ currencySenior: currency.senior });

    if (initCurrency.senior !== currency.senior) {
      if (getAllQuotation.length !== 0) {
        this.props.calculateNairaExchangeRate(naira, dollar);

        // Recaculate Proforma Invoice
        const getProformaInvoice = getStorageProformaInvoice();
        if (getProformaInvoice.totalQuoteAmount !== 0) {
          document.getElementById("recaculateInvoice").click();
        }
      }
    }
  };

  usaCurrency = () => {
    let initCurrency = getStorageCurrency();
    let getAllQuotation = getStorageQuotations();

    const exchangeRate = getStorageExchangeRate();
    const naira = Number(exchangeRate.naira);
    const dollar = Number(exchangeRate.dollar);

    const currency = {
      senior: "Dollar",
      junior: "cent",
      sign: "$",
      abbrevation: "USD"
    };

    document.getElementById("usaCurr").style.opacity = "1";
    document.getElementById("nigCurr").style.opacity = "0.5";

    this.props.addCurrency(currency);
    this.setState({ currencySenior: currency.senior });

    if (initCurrency.senior !== currency.senior) {
      if (getAllQuotation.length !== 0) {
        this.props.calculateDollarExchangeRate(naira, dollar);

        // Recaculate Proforma Invoice
        const getProformaInvoice = getStorageProformaInvoice();
        if (getProformaInvoice.totalQuoteAmount !== 0) {
          document.getElementById("recaculateInvoice").click();
        }
      }
    }
  };

  valueChanged = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  valueSubmited = e => {
    e.preventDefault();

    // Save Init Currency On 1st Expense Save
    // To Be Used To Manage (Set Exchange Rate)
    if (JSON.parse(localStorage.getItem("quotations")).length === 0) {
      const initCurrency = JSON.parse(localStorage.getItem("currency")).senior;

      localStorage.setItem("initCurrency", JSON.stringify(initCurrency));
    }

    let { itemName, itemDescription, itemUnit, itemPrice } = this.state;

    // Set itemUnit Default Value
    if (itemUnit === "") {
      itemUnit = "1";
    }

    const newQuotationItem = {
      id: uuid(),
      itemName,
      itemDescription,
      itemUnit,
      itemPrice
    };

    this.setState({
      itemName: "",
      itemDescription: "",
      itemUnit: "",
      itemPrice: ""
    });

    this.props.addQuotation(newQuotationItem);

    document.getElementById("clearAllInvoice").style.display = "block";
  };

  toggleForm = () => {
    // Colapse Exchange Rate Form OnFocus
    if (toggleStorageExchangeRateForm() === true) {
      document.getElementById("setExchangeRateBtn").click();
    }

    // Colapse Form2 On Focus
    if (toggleStorageForm2() === true) {
      document.getElementById("generateInvoice").click();
    }
  };

  render() {
    const {
      itemName,
      itemDescription,
      itemPrice,
      itemUnit,
      currencySenior
    } = this.state;

    const {
      placeholder1,
      inputGroupText1,
      placeholder2,
      inputGroupText2,
      placeholder4,
      inputGroupText4
    } = this.props;
    return (
      <form onSubmit={this.valueSubmited} onFocus={this.toggleForm}>
        <div className="input-group mb-3 boxShadows" style={boxShadows}>
          <div className="input-group-prepend" style={boxShadows}>
            <span className="input-group-text">{inputGroupText1}</span>
          </div>
          <input
            required
            type="text"
            name="itemName"
            className="form-control"
            placeholder={placeholder1}
            value={itemName}
            onChange={this.valueChanged}
          />
        </div>

        <div className="input-group mb-3" style={boxShadows}>
          <input
            type="text"
            name="itemDescription"
            className="form-control"
            placeholder={placeholder2}
            value={itemDescription}
            onChange={this.valueChanged}
          />
          <div className="input-group-append">
            <span className="input-group-text">{inputGroupText2}</span>
          </div>
        </div>

        <div className="input-group mb-3 boxShadows" style={boxShadows}>
          <div className="input-group-prepend">
            <span
              id="nigCurr"
              className="input-group-text nigeriaCurrencyImage btn btn-outline-success form-control"
              onClick={this.nigCurrency}
            >
              <input type="button" />
            </span>
            <span
              id="usaCurr"
              className="input-group-text usaCurrencyImage btn btn-outline-success form-control"
              onClick={this.usaCurrency}
            >
              <input type="button" className="usaCurrencyImage2" />
            </span>
          </div>
          <input
            required
            type="number"
            name="itemPrice"
            className="form-control"
            placeholder={"Enter Amount In " + currencySenior}
            value={itemPrice}
            onChange={this.valueChanged}
          />
          <div className="input-group-prepend" style={boxShadows}>
            <span className="input-group-text">{inputGroupText4}</span>
          </div>
          <input
            type="number"
            name="itemUnit"
            className="form-control"
            placeholder={placeholder4}
            value={itemUnit}
            onChange={this.valueChanged}
          />
        </div>
        <input
          type="submit"
          value="Submit"
          className="form-control btn btn-secondary"
          style={boxShadows}
        />
      </form>
    );
  }
}

Form.propTypes = {
  quotations: PropTypes.array.isRequired,
  addQuotation: PropTypes.func.isRequired,
  addCurrency: PropTypes.func.isRequired,
  calculateNairaExchangeRate: PropTypes.func.isRequired,
  calculateDollarExchangeRate: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  quotations: state.quotation.quotations
});

export default connect(mapStateToProps, {
  addQuotation,
  addCurrency,
  calculateNairaExchangeRate,
  calculateDollarExchangeRate
})(Form);

const boxShadows = {
  boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
};

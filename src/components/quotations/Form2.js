import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addProformaInvoice } from "../../actions/quotationTypes";

import { getStorageQuotations } from "../../actions/quotationStorageAction";
import { toggleStorageExchangeRateForm } from "../../actions/currencyStorageActions";

class Form2 extends React.Component {
  state = {
    lpoItemName: "",
    totalJobUnit: "",
    serviceCharge: "",
    vat: ""
  };

  valueChanged = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  valueSubmited = e => {
    e.preventDefault();

    let { lpoItemName, totalJobUnit, serviceCharge, vat } = this.state;

    if (isNaN(vat)) {
      alert("Enter A Valid VAT Number");
    } else {
      const quotations = getStorageQuotations();

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

        this.setState({
          lpoItemName: "",
          totalJobUnit: "",
          serviceCharge: "",
          vat: ""
        });
        // Show Clear Invoice & Recaculate BTN
        document.getElementById("clearInvoice").style.display = "block";
        document.getElementById("recaculateInvoice").style.display = "block";
        // Close Form
        document.getElementById("generateInvoice").click();
      } else {
        alert("You  Must Enter At Least 1 Expense In (STEP 1)");
      }
    }
  };

  toggleExchangeRateForm = () => {
    if (toggleStorageExchangeRateForm() === true) {
      // Colapse Exchange Rate Form
      document.getElementById("setExchangeRateBtn").click();
    }
  };

  render() {
    const { lpoItemName, totalJobUnit, serviceCharge, vat } = this.state;

    const {
      placeholder1,
      inputGroupText1,
      placeholder2,
      inputGroupText2,
      placeholder3,
      inputGroupText3,
      placeholder4,
      inputGroupText4
    } = this.props;
    return (
      <form
        onSubmit={this.valueSubmited}
        onFocus={this.toggleExchangeRateForm}
        className="card card-header table-responsive"
      >
        <div className="input-group mb-3" style={boxShadows}>
          <input
            required
            type="text"
            name="lpoItemName"
            className="form-control"
            placeholder={placeholder4}
            value={lpoItemName}
            onChange={this.valueChanged}
          />
          <div className="input-group-prepend" style={boxShadows}>
            <span className="input-group-text">{inputGroupText4}</span>
          </div>
        </div>

        <div className="input-group mb-3" style={boxShadows}>
          <div className="input-group-prepend" style={boxShadows}>
            <span className="input-group-text">{inputGroupText3}</span>
          </div>
          <input
            required
            type="number"
            name="totalJobUnit"
            className="form-control"
            placeholder={placeholder3}
            value={totalJobUnit}
            onChange={this.valueChanged}
          />
        </div>

        <div className="input-group mb-3" style={boxShadows}>
          <input
            required
            type="number"
            name="serviceCharge"
            className="form-control"
            placeholder={placeholder2}
            value={serviceCharge}
            onChange={this.valueChanged}
          />
          <div className="input-group-append" style={boxShadows}>
            <span className="input-group-text">{inputGroupText2}</span>
          </div>
        </div>

        <div className="input-group mb-3" style={boxShadows}>
          <div className="input-group-prepend" style={boxShadows}>
            <span className="input-group-text">{inputGroupText1}</span>
          </div>
          <input
            type="text"
            name="vat"
            className="form-control"
            placeholder={placeholder1}
            value={vat}
            onChange={this.valueChanged}
          />
        </div>

        <div className="row">
          <div className="col-sm-6 mx-auto p-1" style={boxShadows}>
            <input
              type="submit"
              value="Calculate"
              className="form-control btn btn-success btn-sm"
              style={boxShadows}
            />
          </div>
        </div>
      </form>
    );
  }
}

Form2.propTypes = {
  addProformaInvoice: PropTypes.func.isRequired
};

export default connect(null, { addProformaInvoice })(Form2);

const boxShadows = {
  boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
};

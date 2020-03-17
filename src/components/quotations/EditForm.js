import React from "react";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateQuotation } from "../../actions/quotationTypes";
import { getStorageQuotations } from "../../actions/quotationStorageAction";
import Footer from "../layouts/Footer";

class EditForm extends React.Component {
  state = {
    currencySign: "",

    id: "",
    itemName: "",
    itemDescription: "",
    itemUnit: "",
    itemPrice: ""
  };

  componentDidMount() {
    const currencySign = JSON.parse(localStorage.getItem("currency")).sign;

    const { id } = this.props.match.params;

    const quotations = getStorageQuotations();
    const data = quotations.filter(quotation => quotation.id === id);

    const { itemName, itemDescription, itemUnit, itemPrice } = data[0];
    this.setState({
      currencySign,

      id,
      itemName,
      itemDescription,
      itemUnit,
      itemPrice
    });
  }

  valueChanged = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  valueSubmited = e => {
    e.preventDefault();

    let { id, itemName, itemDescription, itemUnit, itemPrice } = this.state;

    // Set itemUnit Default Value
    if (itemUnit === "") {
      itemUnit = "1";
    }

    const newQuotationItem = {
      id,
      itemName,
      itemDescription,
      itemUnit,
      itemPrice
    };

    this.setState({
      id: "",
      itemName: "",
      itemDescription: "",
      itemUnit: "",
      itemPrice: ""
    });

    this.props.updateQuotation(newQuotationItem);

    this.props.history.push("/");
  };

  render() {
    const {
      currencySign,
      itemName,
      itemDescription,
      itemPrice,
      itemUnit
    } = this.state;

    return (
      <React.Fragment>
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
              <div className="col-sm-9 mx-auto">
                <h4 className="text-center text-secondary">
                  <i className="fa fa-align-center fa-sm" /> STEP 1 (update)
                </h4>
                <label>
                  <b>Update Quotation Details...</b>
                </label>
                <form onSubmit={this.valueSubmited}>
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text">Item Name</span>
                    </div>
                    <input
                      required
                      type="text"
                      name="itemName"
                      className="form-control"
                      value={itemName}
                      onChange={this.valueChanged}
                    />
                  </div>

                  <div className="input-group mb-3">
                    <input
                      type="text"
                      name="itemDescription"
                      className="form-control"
                      value={itemDescription}
                      onChange={this.valueChanged}
                    />
                    <div className="input-group-append">
                      <span className="input-group-text">Description</span>
                    </div>
                  </div>

                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text btn btn-outline-success form-control">
                        {currencySign}
                      </span>
                    </div>
                    <input
                      required
                      type="number"
                      name="itemPrice"
                      className="form-control"
                      value={itemPrice}
                      onChange={this.valueChanged}
                    />
                    <div className="input-group-prepend">
                      <span className="input-group-text">Item Value</span>
                    </div>
                    <input
                      type="number"
                      name="itemUnit"
                      className="form-control"
                      value={itemUnit}
                      onChange={this.valueChanged}
                    />
                  </div>
                  <input
                    type="submit"
                    value="Update"
                    className="form-control btn btn-secondary"
                  />
                </form>
              </div>
            </div>
          </div>
          <small>
            <Footer />
          </small>
        </div>
      </React.Fragment>
    );
  }
}

EditForm.propTypes = {
  updateQuotation: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  quotations: state.quotation.quotations
});

export default connect(mapStateToProps, { updateQuotation })(EditForm);

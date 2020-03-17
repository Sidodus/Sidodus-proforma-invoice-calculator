import React, { Component } from "react";
import QuotesForm from "./QuotesForm";
import Quotes from "./Quotes";
import QuotesCard from "./QuotesCard";
import Footer from "../layouts/Footer";

class QuotesHome extends Component {
  render() {
    return (
      <React.Fragment>
        <div
          style={{
            boxShadow: "0px 2px 4px rgba(0, 0, 0, .5)"
          }}
        >
          <QuotesForm />
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-6">
                <Quotes />
              </div>
              <div className="col-sm-6">
                <QuotesCard />
              </div>
            </div>
            <small>
              <Footer />
            </small>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default QuotesHome;

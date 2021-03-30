import React, { Component } from "react";
import VendorService from "../../services/VendorService";

class ViewVendor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      vendor: {},
    };
  }

  componentDidMount() {
    VendorService.getVendorById(this.state.id).then((res) => {
      this.setState({ vendor: res.data.data });
    });
  }
  cancel() {
    this.props.history.push("/vendor-mgmt");
  }

  render() {
    return (
      <div>
        <div className="card col-md-6 offset-md-3">
          <h3 className="text-center"> View Vendor Details</h3>
          <div className="card-body">
            <div className="row">
              <label> Name: {this.state.vendor.name} </label>
            </div>
            <div className="row">
              <label> Email: {this.state.vendor.email} </label>
            </div>
            <div className="row">
              <label> Address: {this.state.vendor.address} </label>
            </div>
            <div className="row">
              <label> Contact: {this.state.vendor.contact} </label>
            </div>
            <button
              className="btn btn-info"
              onClick={this.cancel.bind(this)}
              style={{ marginLeft: "400px" }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default ViewVendor;

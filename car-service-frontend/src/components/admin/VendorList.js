import React, { Component } from "react";
import VendorService from "../../services/VendorService";

class VendorList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      vendors: [],
      isError: false,
    };
    this.addVendor = this.addVendor.bind(this);
    this.editVendor = this.editVendor.bind(this);
    this.deleteVendor = this.deleteVendor.bind(this);
  }

  deleteVendor(id) {
    VendorService.deleteVendor(id)
      .then((res) => {
        this.setState({
          vendors: this.state.vendors.filter((vendor) => vendor.id !== id),
        });
      })
      .catch((error) => {
        this.setState({ isError: true });
        console.log("Error while deleting vendor");
        alert("Error while deleting vendor")
      });
  }
  viewVendor(id) {
    this.props.history.push(`/view-vendor/${id}`);
  }
  editVendor(id) {
    this.props.history.push(`/add-vendor/${id}`);
  }

  componentDidMount() {
    VendorService.getVendors().then((res) => {
      this.setState({ vendors: res.data.data });
    });
  }

  addVendor() {
    this.props.history.push("/add-vendor/_add");
  }

  render() {
    return (
      <div>
        <h2 className="text-center">Vendor List</h2>
        <div className="row">
          <button className="btn btn-primary" onClick={this.addVendor}>
            Add Vendor
          </button>
        </div>
        <br></br>
        <div className="row">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th> No</th>
                <th> Name</th>
                <th> Email</th>
                <th> Password</th>
                <th> Address</th>
                <th> Contact</th>
                <th> Actions</th>
              </tr>
            </thead>
            <tbody>
              {this.state.vendors.map((vendor) => (
                <tr key={vendor.id}>
                  <td> {vendor.id} </td>
                  <td> {vendor.name} </td>
                  <td> {vendor.email}</td>
                  <td> {vendor.password}</td>
                  <td> {vendor.address} </td>
                  <td> {vendor.contact}</td>
                  <td>
                    <button
                      onClick={() => this.editVendor(vendor.id)}
                      className="btn btn-info"
                    >
                      Update
                    </button>
                    <button
                      style={{ marginLeft: "10px" }}
                      onClick={() => this.deleteVendor(vendor.id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                    <button
                      style={{ marginLeft: "10px" }}
                      onClick={() => this.viewVendor(vendor.id)}
                      className="btn btn-info"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* {this.state.isError === true && (
          <div class="alert alert-danger">
            <strong>Danger!</strong> This alert box could indicate a dangerous
            or potentially negative action.
          </div>
        )} */}
      </div>
    );
  }
}

export default VendorList;

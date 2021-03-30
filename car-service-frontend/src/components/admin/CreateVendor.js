import React, { Component } from "react";
import VendorService from "../../services/VendorService";

class CreateVendor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // step 2
      id: this.props.match.params.id,
      name: "",
      email: "",
      password: "",
      address: "",
      contact: "",
      disabled: false
    };
    this.changeNameHandler = this.changeNameHandler.bind(this);
    this.changeEmailHandler = this.changeEmailHandler.bind(this);
    this.changePasswordHandler = this.changePasswordHandler.bind(this);
    this.changeAddressHandler = this.changeAddressHandler.bind(this);
    this.changeContactHandler = this.changeContactHandler.bind(this);
    this.saveOrUpdateVendor = this.saveOrUpdateVendor.bind(this);
  }

  // step 3
  componentDidMount() {
    // step 4
    if (this.state.id === "_add") {
      return;
    } else {
      VendorService.getVendorById(this.state.id).then((res) => {
        let vendor = res.data.data;
        this.setState({
          name: vendor.name,
          email: vendor.email,
          password: vendor.password,
          address: vendor.address,
          contact: vendor.contact,
        });
      });
    }
  }
  saveOrUpdateVendor = (e) => {
    e.preventDefault();
    let vendor = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      address: this.state.address,
      contact: this.state.contact,
    };

    if (this.state.id === "_add") {
      VendorService.createVendor(vendor).then((res) => {
        this.props.history.push("/vendor-mgmt");
      });
    } else {
      VendorService.updateVendor(vendor, this.state.id).then((res) => {
        this.props.history.push("/vendor-mgmt");
      });
    }
  };

  changeNameHandler = (event) => {
    this.setState({ name: event.target.value });
  };

  changeEmailHandler = (event) => {
    this.setState({ email: event.target.value });
  };
  changePasswordHandler = (event) => {
    this.setState({ password: event.target.value });
  };
  changeAddressHandler = (event) => {
    this.setState({ address: event.target.value });
  };
  changeContactHandler = (event) => {
    this.setState({ contact: event.target.value });
  };

  cancel() {
    this.props.history.push("/vendor-mgmt");
  }

  getTitle() {
    if (this.state.id === "_add") {
      return <h3 className="text-center">Add Vendor</h3>;
    } else {
      return <h3 className="text-center">Update Vendor</h3>;
    }
  }
  render() {
    return (
      <div>
        <br></br>
        <div className="container">
          <div className="row">
            <div className="card col-md-6 offset-md-3 offset-md-3">
              {this.getTitle()}
              <div className="card-body">
                <form>
                  <div className="form-group">
                    <label> Name: </label>
                    <input
                      placeholder="Name"
                      name="name"
                      className="form-control"
                      value={this.state.name}
                      onChange={this.changeNameHandler}
                    />
                  </div>
                  <div className="form-group">
                    <label> Email: </label>
                    <input
                      placeholder="Email"
                      name="email"
                      className="form-control email"
                      value={this.state.email}
                      onChange={this.changeEmailHandler}
                    />
                  </div>
                  <div className="form-group">
                    <label> Password: </label>
                    <input
                      placeholder="Password"
                      type="password"
                      name="password"
                      className="form-control"
                      value={this.state.password}
                      onChange={this.changePasswordHandler}
                    />
                  </div>

                  <div className="form-group">
                    <label> Address: </label>
                    <input
                      placeholder="Address"
                      name="address"
                      className="form-control"
                      value={this.state.address}
                      onChange={this.changeAddressHandler}
                    />
                  </div>

                  <div className="form-group">
                    <label> Contact: </label>
                    <input
                      placeholder="Contact"
                      name="contact"
                      className="form-control"
                      value={this.state.contact}
                      onChange={this.changeContactHandler}
                    />
                  </div>

                  <button
                    className="btn btn-success"
                    onClick={this.saveOrUpdateVendor}
                  >
                    Save
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={this.cancel.bind(this)}
                    style={{ marginLeft: "10px" }}
                  >
                    Cancel
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateVendor;

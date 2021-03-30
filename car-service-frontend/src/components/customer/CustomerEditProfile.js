import React, { Component } from "react";
import { connect } from "react-redux";
import CustomerService from "../../services/CustomerService";

class CustomerEditProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {

      id: this.props.match.params.id,
      name: "",
      email: "",
      password: "",
      address: "",
      contact: "",
      employee_id: "",
      disabled: false
    };
    this.changeNameHandler = this.changeNameHandler.bind(this);
    this.changePasswordHandler = this.changePasswordHandler.bind(this);
    this.changeAddressHandler = this.changeAddressHandler.bind(this);
    this.changeEmployeeidHandler = this.changeEmployeeidHandler.bind(this);
    this.saveOrUpdateCustomer = this.saveOrUpdateCustomer.bind(this);
  }

  componentDidMount() {

    if (this.state.id === "_add") {
      return;
    } else {
          const { user: currentUser } = this.props;
      CustomerService.getCustomerById(currentUser.id).then((res) => {
        let customer = res.data.data;
        this.setState({
          name: customer.name,
          email: customer.email,
          password: customer.password,
          address: customer.address,
          contact: customer.contact,
          employee_id: customer.employee_id,
        });
      });
    }
  }
  saveOrUpdateCustomer = (e) => {
    const { user: currentUser } = this.props;
    e.preventDefault();
    let customer = {
      customer_id: currentUser.id,
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      address: this.state.address,
      contact: this.state.contact,
      employee_id: this.state.employee_id,
    };
    if (this.state.id === "_add") {
      CustomerService.createCustomer(customer).then((res) => {
        alert("Profile created successfully")
        this.props.history.push("/profile");
      });
    } else {
      const { user: currentUser } = this.props;
      CustomerService.updateCustomer(customer, currentUser.id).then((res) => {
        alert("Profile updated successfully")
        this.props.history.push("/profile");
      });
    }



    if (this.state.currentUser === "_add")  {
      CustomerService.updateCustomer(customer, this.state.currentUser).then((res) => {
        this.props.history.push(`/add-customer/${currentUser.id}`);
      });
    }
  };

  changeNameHandler = (event) => {
    this.setState({ name: event.target.value });
  };

  changePasswordHandler = (event) => {
    this.setState({ password: event.target.value });
  };
  changeAddressHandler = (event) => {
    this.setState({ address: event.target.value });
  };

  changeEmployeeidHandler = (event) => {
    this.setState({ contact: event.target.value });
  };

  cancel() {
    this.props.history.push("/home");
  }

  getTitle() {
    if (this.state.id === "_add") {
      return <h3 className="text-center">Add Customer</h3>;
    } else {
      return <h3 className="text-center">Update Customer</h3>;
    }
  }
  render() {
    // const { user: currentUser } = this.props;
    return (
      <div>
        <br></br>
        <div className="container">
          <div className="row">
            <div className="card col-md-6 offset-md-3 offset-md-3">
              {this.getTitle()} {/* {currentUser.id} */}
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
                      disabled
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
                      disabled
                    />
                  </div>

                  <button
                    className="btn btn-success"
                    onClick={this.saveOrUpdateCustomer}
                  >
                    Update
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

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}

export default connect(mapStateToProps)(CustomerEditProfile);


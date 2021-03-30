import React, { Component } from "react";
import { connect } from "react-redux";
import EmployeeService from "../../services/EmployeeService";

class CreateCustomer extends Component {
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
      employee_id: "",
      disabled: false,
    };
    this.changeNameHandler = this.changeNameHandler.bind(this);
    this.changeEmailHandler = this.changeEmailHandler.bind(this);
    this.changePasswordHandler = this.changePasswordHandler.bind(this);
    this.changeAddressHandler = this.changeAddressHandler.bind(this);
    this.changeContactHandler = this.changeContactHandler.bind(this);
    this.changeEmployeeidHandler = this.changeEmployeeidHandler.bind(this);
    this.saveOrUpdateCustomer = this.saveOrUpdateCustomer.bind(this);
  }

  componentDidMount() {
    if (this.state.id === "_add") {
      return;
    } else {
      EmployeeService.getCustomerById(this.state.id).then((res) => {
        let employee = res.data.data;
        this.setState({
          name: employee.name,
          email: employee.email,
          password: employee.password,
          address: employee.address,
          contact: employee.contact,
          employee_id: employee.employee_id,
        });
      });
    }
  }
  saveOrUpdateCustomer = (e) => {
    const { user: currentUser } = this.props;
    e.preventDefault();
    let customer = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      address: this.state.address,
      contact: this.state.contact,
      employee_id: currentUser.id,
    };
    // step 5
    if (this.state.id === "_add") {
      EmployeeService.createCustomer(customer).then((res) => {
        this.props.history.push("/employee/customer-mgmt");
      });
    } else {
      EmployeeService.updateCustomer(customer, this.state.id).then((res) => {
        this.props.history.push("/employee/customer-mgmt");
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
  changeEmployeeidHandler = (event) => {
    this.setState({ contact: event.target.value });
  };

  cancel() {
    this.props.history.push("/employee/customer-mgmt");
  }

  getTitle() {
    if (this.state.id === "_add") {
      return <h3 className="text-center">Add Customer</h3>;
    } else {
      return <h3 className="text-center">Update Customer</h3>;
    }
  }
  render() {
    const { user: currentUser } = this.props;
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
                  <div className="form-group">
                    <label> Employee_Id </label>
                    <input
                      placeholder="Employee_Id"
                      name="employee_id"
                      className="form-control"
                      value={currentUser.id}
                      disabled
                    />
                  </div>

                  <button
                    className="btn btn-success"
                    onClick={this.saveOrUpdateCustomer}
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

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}

export default connect(mapStateToProps)(CreateCustomer);

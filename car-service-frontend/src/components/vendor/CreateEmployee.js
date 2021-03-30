import React, { Component } from 'react'
import { connect } from 'react-redux';
import EmployeeService from '../../services/EmployeeService';

class CreateEmployee extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // step 2
            id: this.props.match.params.id,
            name: "",
            email: "",
            password: "",
            birthdate: "",
            vendorid: "",
            disabled: false
          };
          this.changeNameHandler = this.changeNameHandler.bind(this);
          this.changeEmailHandler = this.changeEmailHandler.bind(this);
          this.changePasswordHandler = this.changePasswordHandler.bind(this);
          this.changeBirthdateHandler = this.changeBirthdateHandler.bind(this);
          this.changeVendoridHandler = this.changeVendoridHandler.bind(this);
          this.saveOrUpdateEmployee = this.saveOrUpdateEmployee.bind(this);
    }

  // step 3
  componentDidMount() {
    // step 4
    if (this.state.id === "_add") {
      return;
    } else {
      EmployeeService.getEmployeeById(this.state.id).then((res) => {
        let employee = res.data.data;
        this.setState({
          name: employee.name,
          email: employee.email,
          password: employee.password,
          birthdate: employee.birthdate,
          vendor_id: employee.vendor_id,
        });
      });
    }
  }
  saveOrUpdateEmployee = (e) => {
    const { user: currentUser } = this.props;
    e.preventDefault();
    let employee = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      birthdate: this.state.birthdate,
      vendor_id: currentUser.id,
    };
    console.log("employee => " + JSON.stringify(employee));

    // step 5
    if (this.state.id === "_add") {
        EmployeeService.createEmployee(employee).then((res) => {
          this.props.history.push("/vendor/employee-mgmt");
        });
      } else {
        EmployeeService.updateEmployee(employee, this.state.id).then((res) => {
          this.props.history.push("/vendor/employee-mgmt");
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
      changeBirthdateHandler = (event) => {
        this.setState({ birthdate: event.target.value });
      };
      changeVendoridHandler = (event) => {
        this.setState({ vendorid: event.target.value });
      };
    
      cancel() {
        this.props.history.push("/vendor/employee-mgmt");
      }
    
      getTitle() {
        if (this.state.id === "_add") {
          return <h3 className="text-center">Add Employee</h3>;
        } else {
          return <h3 className="text-center">Update Employee</h3>;
        }
      }
      render() {
        const { user: currentUser } = this.props
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
                        <label> BirthDate: </label>
                        <input
                          placeholder="BirthDate"
                          type="date"
                          data-date=""
                          data-date-format="YYYY MM DD"
                          name="date"
                          className="form-control"
                          value={this.state.address}
                          onChange={this.changeBirthdateHandler}
                        />
                      </div>
    
                      <div className="form-group">
                        <label> Vendor_Id </label>
                        <input
                          placeholder="Vendor_Id"
                          name="vendorid"
                          className="form-control"
                          value={currentUser.id}
                          disabled
                        />
                      </div>
    
                      <button
                        className="btn btn-success"
                        onClick={this.saveOrUpdateEmployee}
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
export default connect(mapStateToProps)(CreateEmployee);

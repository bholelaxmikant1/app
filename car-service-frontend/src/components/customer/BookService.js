import React, { Component } from "react";
import { connect } from "react-redux";
import CustomerService from "../../services/CustomerService";
import PackageService from "../../services/PackageService";

// const options = [
//   {
//     label: "PickUp",
//     value: "PICKUP",
//   },
//   {
//     label: "DropBy",
//     value: "DROPBY",
//   },
// ];
// const option = [
//   {
//     label: "Car",
//     value: "CAR",
//   },
//   {
//     label: "Bike",
//     value: "BIKE",
//   },
// ];

class BookService extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      pid: this.props.match.params.pid,
      pname: "",
      pacakges: [],
      vehicle_reg_no: "",
      vehicle_type: "",
      vehicle_brand: "",
      vehicle_model: "",
      delivery_type: "",
      customer_id: "",
      selectedOption: null,
      disabled: false,
    };
    this.changeVehicleRegNoHandler = this.changeVehicleRegNoHandler.bind(this);
    this.changeVehicleTypeHandler = this.changeVehicleTypeHandler.bind(this);
    this.changeVehicleBrandHandler = this.changeVehicleBrandHandler.bind(this);
    this.changeVehicleModelHandler = this.changeVehicleModelHandler.bind(this);
    this.changeDeliveryTypeHandler = this.changeDeliveryTypeHandler.bind(this);
    this.saveOrUpdateService = this.saveOrUpdateService.bind(this);
    this.handlePackChange = this.handlePackChange.bind(this);
  }

  componentDidMount() {
    const { user: currentUser } = this.props;
    PackageService.getPackages().then((res) => {
      this.setState({
        pacakges: res.data,
      });
    });

    if (this.state.id === "_add") {
     
      PackageService.getPackageById(this.state.pid).then((res) => {
        let pack = res.data;
        this.setState({
          pid: pack.package_id,
          pname: pack.package_name,
        });
      });
      return;
    } else {
      CustomerService.getServiceById(currentUser.id).then((res) => {
        let service = res.data.data;
        this.setState({
          vehicle_reg_no: service.vehicle_reg_no,
          vehicle_type: service.vehicle_type,
          vehicle_brand: service.vehicle_brand,
          vehicle_model: service.vehicle_model,
          delivery_type: service.delivery_type,
          customer_id: service.customer_id,
        });
      });
    }
  }
  saveOrUpdateService = (e) => {
    const { user: currentUser } = this.props;
    e.preventDefault();
    let service = {
      vehicle_reg_no: this.state.vehicle_reg_no,
      vehicle_type: this.state.vehicle_type,
      vehicle_brand: this.state.vehicle_brand,
      vehicle_model: this.state.vehicle_model,
      delivery_type: this.state.delivery_type,
      customer_id: currentUser.id,
      package_id: this.state.pid,
    };
    if (this.state.id === "_add") {
      CustomerService.createService(service, currentUser.id).then((res) => {
        this.props.history.push("/customer/book-service");
      });
    } else {
      CustomerService.updateService(service, this.state.id).then((res) => {
        this.props.history.push("/customer/book-service");
      });
    }
  };

  changeVehicleRegNoHandler = (event) => {
    this.setState({ vehicle_reg_no: event.target.value });
  };

  changeVehicleTypeHandler = (event) => {
    this.setState({ vehicle_type: event.target.value });
  };
  changeVehicleBrandHandler = (event) => {
    this.setState({ vehicle_brand: event.target.value });
  };
  changeVehicleModelHandler = (event) => {
    this.setState({ vehicle_model: event.target.value });
  };
  changeDeliveryTypeHandler = (event) => {
    this.setState({ delivery_type: event.target.value });
  };

  cancel() {
    this.props.history.push("/customer/book-service");
  }

  getTitle() {
    if (this.state.id === "_add") {
      return <h3 className="text-center">Book Service</h3>;
    } else {
      return <h3 className="text-center">Update Service</h3>;
    }
  }

  handleChange = (e) => {
    this.setState({ status: e.target.value });
  };

  handlePackChange = (e) => {
    this.setState({ pid: e.target.value });
  };

  render() {
    const { user: currentUser } = this.props;
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
                    <label> Vehicle Registration No: </label>
                    <input
                      placeholder="Mh12sv1234"
                      name="vehicle_reg_no"
                      type="text"
                      className="form-control"
                      value={this.state.vehicle_reg_no}
                      onChange={this.changeVehicleRegNoHandler}
                    />
                  </div>
                  <div>
                    <label> Vehicle Type </label>
                    <input
                      placeholder="Car/Bike"
                      name="car/bike"
                      className="form-control"
                      value={this.state.vehicle_type}
                      onChange={this.changeVehicleTypeHandler}
                    />
                  </div>

                  {/* <div className="form-group">
                    <label> Vehicle Type </label>
                    <select
                      value={this.state.vehicle_type}
                      onChange={this.handleChange}
                      className="form-control"
                    >
                      {option.map((option, index) => (
                        <option key={index} value={option.value}>{option.label}</option>
                      ))}
                    </select>
                  </div> */}

                  <div className="form-group">
                    <label> Vehicle Brand: </label>
                    <input
                      placeholder="Brand"
                      type="text"
                      name="vehicle_brand"
                      className="form-control"
                      value={this.state.vehicle_brand}
                      onChange={this.changeVehicleBrandHandler}
                    />
                  </div>

                  <div className="form-group">
                    <label> Vehicle Model: </label>
                    <input
                      placeholder="Model"
                      name="vehicle_model"
                      className="form-control"
                      value={this.state.vehicle_model}
                      onChange={this.changeVehicleModelHandler}
                    />
                  </div>
                  <div className="form-group">
                    <label>Delivery Type:</label>
                    <input
                      placeholder="Drop-By/Pick-Up"
                      name="deliverytype"
                      className="form-control"
                      value={this.state.delivery_type}
                      onChange={this.changeDeliveryTypeHandler}
                    />
                  </div>

                  {/* <div className="form-group">
                    <label> Delivery Type </label>
                    <select
                      value={this.state.delivery_type}
                      onChange={this.handleChange}
                      className="form-control"
                    >
                      {options.map((option, index) => (
                        <option key={index} value={option.value}>{option.label}</option>
                      ))}
                    </select>
                  </div> */}

                  {/* <select
                    className="mt-4 col-md-6 col-offset-4"
                    onChange={this.handleChange}
                    options={options}
                    autoFocus={true}
                  /> */}

                  <div className="form-group" hidden>
                    <label> Employee_Id </label>
                    <input
                      placeholder="Employee_Id"
                      name="employee_id"
                      className="form-control"
                      value={1}
                      disabled
                    />
                  </div>
                  <div className="form-group" hidden>
                    <label> Customer Id </label>
                    <input
                      placeholder="Customer Id"
                      name="customer_id"
                      className="form-control"
                      value={currentUser.id}
                      disabled
                    />
                  </div>
                  <div className="form-group">
                    <label> Service Package </label>
                    <select
                      value={this.state.pid}
                      onChange={this.handlePackChange}
                      className="form-control"
                    >
                      {this.state.pacakges.map((p, index) => (
                        <option key={index} value={p.package_id}>
                          {p.package_name} {`->`} {"\u20B9"} {p.package_price}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    className="btn btn-success"
                    onClick={this.saveOrUpdateService}
                  >
                    Book Service
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
        <br></br>
        <br></br>
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

export default connect(mapStateToProps)(BookService);

import React, { Component } from "react";
import { connect } from "react-redux";
import CustomerService from "../../services/CustomerService";

class ServiceList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      services: [],
      isError: false,
    };
    this.addService = this.addService.bind(this);
    this.editService = this.editService.bind(this);
    this.deleteServicer = this.deleteService.bind(this);
  }

  deleteService(id) {
    CustomerService.deleteService(id)
      .then((res) => {
        this.setState({
          services: this.state.services.filter((service) => service.id !== id),
        });
      })
      .catch((error) => {
        this.setState({ isError: true });
        console.log("Error while deleting vendor");
        alert("Error while deleting vendor");
      });
  }
  viewInvoice(requestId, customerId) {
    this.props.history.push(
      `/customer/print-invoice/${customerId}/${requestId}`
    );
  }
  editService(id) {
    this.props.history.push(`/add-service/${id}`);
  }

  componentDidMount() {
    const { user: currentUser } = this.props;
    CustomerService.getServices(currentUser.id).then((res) => {
      this.setState({ services: res.data.data });
    });
  }

  addService() {
    this.props.history.push(`/customer/add-service/_add/${1}`);
  }

  render() {
    return (
      <div>
        <h2 className="text-center">Service List</h2>
        <div className="row">
          <button className="btn btn-primary" onClick={this.addService}>
            Book Service
          </button>
        </div>
        <br></br>
        <div className="row">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th> No</th>
                <th> Vehicle Reg No.</th>
                <th> Vehicle Type</th>
                <th> Vehicle Brand</th>
                <th> Vehicle Model</th>
                <th> Delivery Type</th>
                <th> Actions</th>
              </tr>
            </thead>
            <tbody>
              {this.state.services.map((service, index) => (
                <tr key={service.request_id}>
                  <td> {index + 1} </td>
                  <td> {service.vehicle_reg_no} </td>
                  <td> {service.vehicle_type} </td>
                  <td> {service.vehicle_brand}</td>
                  <td> {service.vehicle_model}</td>
                  <td> {service.delivery_type} </td>
                  <td>
                    {service.status === "INVOICEGENERATED" && (
                      <button
                        style={{ marginLeft: "10px" }}
                        onClick={() =>
                          this.viewInvoice(
                            service.request_id,
                            service.customer_Id
                          )
                        }
                        className="btn btn-info"
                      >
                        View Invoice
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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

export default connect(mapStateToProps)(ServiceList);

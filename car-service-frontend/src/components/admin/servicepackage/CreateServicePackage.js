import React, { Component } from "react";
import { connect } from "react-redux";
import PackageService from "../../../services/PackageService";

class CreateServicePackage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      package_name: "",
      package_description: "",
      package_price: "",
      disabled: false,
    };
    this.changeNameHandler = this.changeNameHandler.bind(this);
    this.changeDescHandler = this.changeDescHandler.bind(this);
    this.changePriceHandler = this.changePriceHandler.bind(this);
    this.saveOrUpdatePackage = this.saveOrUpdatePackage.bind(this);
  }

  componentDidMount() {
    if (this.state.id === "_add") {
      return;
    } else {
      PackageService.getPackageById(this.state.id).then((res) => {
        let sPackage = res.data.data;
        this.setState({
          package_name: sPackage.package_name,
          package_description: sPackage.package_description,
          package_price: sPackage.package_price,
        });
      });
    }
  }
  saveOrUpdatePackage = (e) => {
    e.preventDefault();
    let sPackage = {
      package_name: this.state.package_name,
      package_description: this.state.package_description,
      package_price: this.state.package_price,
      
    };

    if (this.state.id === "_add") {
      PackageService.createPackage(sPackage).then((res) => {
        this.props.history.push("/service-package");
      });
    } else {
      PackageService.updatePackage(sPackage, this.state.id).then((res) => {
        this.props.history.push("/service-package");
      });
    }
  };

  changeNameHandler = (event) => {
    this.setState({ package_name: event.target.value });
  };

  changeDescHandler = (event) => {
    this.setState({ package_description: event.target.value });
  };
  changePriceHandler = (event) => {
    this.setState({ package_price: event.target.value });
  };

  cancel() {
    this.props.history.push("/service-package");
  }

  getTitle() {
    if (this.state.id === "_add") {
      return <h3 className="text-center">Add Service Package</h3>;
    } else {
      return <h3 className="text-center">Update Service Package</h3>;
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
                      name="package_name"
                      className="form-control"
                      value={this.state.package_name}
                      onChange={this.changeNameHandler}
                    />
                  </div>
                  <div className="form-group">
                    <label> Description: </label>
                    <textarea
                      placeholder="Package Description"
                      name="package_description"
                      className="form-control email"
                      rows="5"
                      value={this.state.package_description}
                      onChange={this.changeDescHandler}
                    />
                  </div>
                  <div className="form-group">
                    <label> Price: </label>
                    <input
                      placeholder="Price"
                      name="package_price"
                      type="number"
                      className="form-control"
                      value={this.state.package_price}
                      onChange={this.changePriceHandler}
                    />
                  </div>

                  <button
                    className="btn btn-success"
                    onClick={this.saveOrUpdatePackage}
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
export default connect(mapStateToProps)(CreateServicePackage);

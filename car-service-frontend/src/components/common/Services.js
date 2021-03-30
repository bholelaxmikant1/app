import React, { Component } from "react";
import { connect } from "react-redux";
import PackageService from "../../services/PackageService";
import CardComponent from "../../shared/CardComponent";

class Services extends Component {
  constructor(props) {
    super(props);

    this.state = {
      packages: [],
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    PackageService.getPackages().then((res) => {
      this.setState({ packages: res.data });
    });
  }

  handleClick(pId) {
    const { user: currentUser } = this.props;
    if (!currentUser) {
      this.props.history.push("/login");
    } else if (currentUser.role.includes("EMPLOYEE")) {
      this.props.history.push(`/add-service/_add/${pId}`);
    } else if (currentUser.role.includes("CUSTOMER")) {
      this.props.history.push(`/customer/add-service/_add/${pId}`);
    }
  }

  render() {
    return (
      <div className="container">
        {this.state.packages.map((spackage) => (
          <CardComponent
            key={spackage.package_id}
            title={spackage.package_name}
            desc={spackage.package_description}
            price={spackage.package_price}
            click={() => this.handleClick(spackage.package_id)}
          />
        ))}
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

export default connect(mapStateToProps)(Services);

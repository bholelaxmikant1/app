import React, { Component } from "react";
import { connect } from "react-redux";
import { Router, Switch, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import logo from "./assets/logo.png";

import Login from "./components/login";
import Register from "./components/register";
import Home from "./components/common/home";
import Profile from "./components/profile";
import FooterComponent from "./components/common/FooterComponent";

import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";

import { history } from "./helpers/history";
import { AdminHome } from "./components/admin/AdminHome";
import VendorList from "./components/admin/VendorList";
import CreateVendor from "./components/admin/CreateVendor";
import ViewVendor from "./components/admin/ViewVendor";
import { FeedbackComponent } from "./components/admin/FeedbackComponent";
import { VendorHome } from "./components/vendor/VendorHome";
import { SiteMaitainance } from "./shared/SiteMaitainance";
import EmployeeList from "./components/vendor/EmployeeList";
import CreateEmployee from "./components/vendor/CreateEmployee";
import CustomerList from "./components/vendor/CustomerList";
import CreateCustomer from "./components/employee/CreateCustomer";
import { Aboutus } from "./components/common/Aboutus";
import { Contactus } from "./components/common/Contactus";
import { FAQs } from "./components/common/FAQs";
import CustomerListByEmployee from "./components/employee/CustomerListByEmployee";
import { CustomerHome } from "./components/customer/CustomerHome";
import BookService from "./components/customer/BookService";
import ServiceList from "./components/customer/ServiceList";
import AddService from "./components/employee/AddService";
import ListofService from "./components/employee/ListofService";
import GenerateInvoice from "./components/employee/GenerateInvoice";
import CustomerEditProfile from "./components/customer/CustomerEditProfile";
import ServicePackageList from "./components/admin/servicepackage/ServicePackageList";
import CreateServicePackage from "./components/admin/servicepackage/CreateServicePackage";
import Services from "./components/common/Services";
import Invoice from "./components/customer/Invoice";
import ViewInvoice from "./components/employee/ViewInvoice";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showAdminBoard: false,
      showVendorBoard: false,
      showEmployeeBoard: false,
      showCustomerBoard: false,
      showCommonBoard: false,
      currentUser: undefined,
    };

    history.listen((location) => {
      props.dispatch(clearMessage()); // clear message when changing location
    });
  }

  componentDidMount() {
    const user = this.props.user;
    if (user) {
      this.setState({
        currentUser: user,
        showAdminBoard: user.role.includes("ADMIN"),
        showVendorBoard: user.role.includes("VENDOR"),
        showEmployeeBoard: user.role.includes("EMPLOYEE"),
        showCustomerBoard: user.role.includes("CUSTOMER"),
      });
    } else {
      this.setState({
        showCommonBoard: true,
      });
    }
  }

  logOut() {
    this.props.dispatch(logout());
  }

  render() {
    const {
      currentUser,
      showAdminBoard,
      showVendorBoard,
      showEmployeeBoard,
      showCommonBoard,
      showCustomerBoard,
    } = this.state;
    return (
      <Router history={history}>
        <div>
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link to={"/"} className="navbar-brand">
              <div>
                <img src={logo} alt="" />
                {/* We provide most unique premium template for you. */}
              </div>
            </Link>
            <div className="navbar-nav mr-auto">
              {/* -----------------------Home Page----------------------------------- */}
              {showCommonBoard && (
                <li className="nav-item">
                  <Link to={"/home"} className="nav-link">
                    Home
                  </Link>
                </li>
              )}
              {showCommonBoard && (
                <li className="nav-item">
                  <Link to={"/services"} className="nav-link">
                    Services
                  </Link>
                </li>
              )}
              {showCommonBoard && (
                <li className="nav-item">
                  <Link to={"/aboutus"} className="nav-link">
                    About us
                  </Link>
                </li>
              )}
              {showCommonBoard && (
                <li className="nav-item">
                  <Link to={"/faqs"} className="nav-link">
                    FAQs
                  </Link>
                </li>
              )}
              {showCommonBoard && (
                <li className="nav-item">
                  <Link to={"/contactus"} className="nav-link">
                    Contact us
                  </Link>
                </li>
              )}

              {/* --------------------Admin Board--------------------------------------------- */}
              {currentUser && showAdminBoard && (
                <li className="nav-item">
                  <Link to={"/home"} className="nav-link">
                    Home
                  </Link>
                </li>
              )}

              {currentUser && showAdminBoard && (
                <li className="nav-item">
                  <Link to={"/vendor-mgmt"} className="nav-link">
                    Vendor Management
                  </Link>
                </li>
              )}

              {currentUser && showAdminBoard && (
                <li className="nav-item">
                  <Link to={"/service-package"} className="nav-link">
                    Service Package
                  </Link>
                </li>
              )}

              {currentUser && showAdminBoard && (
                <li className="nav-item">
                  <Link to={"/admin/feedback"} className="nav-link">
                    Feedback
                  </Link>
                </li>
              )}

              {/* ---------------Vendor Board---------------------------------- */}
              {showVendorBoard && (
                <li className="nav-item">
                  <Link to={"/home"} className="nav-link">
                    Home
                  </Link>
                </li>
              )}

              {showVendorBoard && (
                <li className="nav-item">
                  <Link to={"/vendor/employee-mgmt"} className="nav-link">
                    Employee Management
                  </Link>
                </li>
              )}

              {showVendorBoard && (
                <li className="nav-item">
                  <Link to={"/vendor/customer-mgmt"} className="nav-link">
                    Customer Management
                  </Link>
                </li>
              )}

              {showVendorBoard && (
                <li className="nav-item">
                  <Link to={"/vendor"} className="nav-link">
                    Feedback
                  </Link>
                </li>
              )}

              {/* --------------------Employee Board--------------------------------------------- */}
              {showEmployeeBoard && (
                <li className="nav-item">
                  <Link to={"/home"} className="nav-link">
                    Home
                  </Link>
                </li>
              )}

              {showEmployeeBoard && (
                <li className="nav-item">
                  <Link to={"/employee/customer-mgmt"} className="nav-link">
                    Customer Management
                  </Link>
                </li>
              )}

              {showEmployeeBoard && (
                <li className="nav-item">
                  <Link to={"/employee/service-mgmt"} className="nav-link">
                    Service Management
                  </Link>
                </li>
              )}
              {/* {showEmployeeBoard && (
                <li className="nav-item">
                  <Link to={"/employee/invoice-mgmt"} className="nav-link">
                    Invoice Management
                  </Link>
                </li>
              )} */}

              {showEmployeeBoard && (
                <li className="nav-item">
                  <Link to={"/employee"} className="nav-link">
                    Feedback
                  </Link>
                </li>
              )}

              {/* --------------------Customer Board--------------------------------------------- */}
              {showCustomerBoard && (
                <li className="nav-item">
                  <Link to={"/home"} className="nav-link">
                    Home
                  </Link>
                </li>
              )}
              {showCustomerBoard && (
                <li className="nav-item">
                  <Link to={"/services"} className="nav-link">
                    Services
                  </Link>
                </li>
              )}
              {showCustomerBoard && (
                <li className="nav-item">
                  <Link to={"/customer/book-service"} className="nav-link">
                    Book Service
                  </Link>
                </li>
              )}
              {showCustomerBoard && (
                <li className="nav-item">
                  <Link to={"/customer/feedback"} className="nav-link">
                    Feedback
                  </Link>
                </li>
              )}

              {showCustomerBoard && (
                <li className="nav-item">
                  <Link to={"/customer/editprofile"} className="nav-link">
                    Profile
                  </Link>
                </li>
              )}
            </div>
            {/* --------------------Common Board--------------------------------------------- */}
            {currentUser ? (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/profile"} className="nav-link">
                    {currentUser.email}
                  </Link>
                </li>
                <li className="nav-item">
                  <a href="/login" className="nav-link" onClick={this.logOut}>
                    Logout
                  </a>
                </li>
              </div>
            ) : (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/login"} className="nav-link">
                    Login
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to={"/register"} className="nav-link">
                    Sign Up
                  </Link>
                </li>
              </div>
            )}
          </nav>
          <FooterComponent />

          <div className="container mt-3">
            <Switch>
              <Route exact path={["/", "/home"]} component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/services" component={Services} />
              <Route exact path="/profile" component={Profile} />
              <Route path="/admin-home" component={AdminHome} />

              {/* vendor */}
              <Route path="/vendor-mgmt" component={VendorList} />
              <Route
                exact
                path="/service-package"
                component={ServicePackageList}
              />
              <Route
                exact
                path="/add-package/:id"
                component={CreateServicePackage}
              />
              <Route path="/add-vendor/:id" component={CreateVendor}></Route>
              <Route path="/view-vendor/:id" component={ViewVendor}></Route>
              <Route
                path="/admin/feedback"
                component={FeedbackComponent}
              ></Route>
              <Route exact path="/vendor/home" component={VendorHome} />

              {/* employee crud operation from vendor */}
              <Route
                exact
                path="/vendor/employee-mgmt"
                component={EmployeeList}
              />
              <Route
                path="/add-employee/:id"
                component={CreateEmployee}
              ></Route>
              <Route path="/vendor/customer-mgmt" component={CustomerList} />
              <Route
                exact
                path="/employee/view-invoice/:customerId/:requestId"
                component={ViewInvoice}
              />
              {/* customer crud operation from employee */}
              <Route
                exact
                path="/employee/customer-mgmt"
                component={CustomerListByEmployee}
              />
              <Route path="/add-customer/:id" component={CreateCustomer} />
              <Route
                exact
                path="/employee/service-mgmt"
                component={ListofService}
              />
              <Route exact path="/add-service/:id/:pid" component={AddService} />
              <Route
                exact
                path="/employee/invoice-mgmt"
                component={SiteMaitainance}
              />
              <Route
                path="/customer/editprofile"
                component={CustomerEditProfile}
              />
              <Route
                path="/generate-invoice/:customerId/:requestId"
                component={GenerateInvoice}
              />
              {/* Customer CRUD */}
              <Route path="/customer-home" component={CustomerHome} />
              <Route path="/customer/book-service" component={ServiceList} />
              <Route path="/customer/add-service/:id/:pid" component={BookService} />
              <Route
                path="/customer/print-invoice/:customerId/:requestId"
                component={Invoice}
              />

              <Route path="/customer/feedback" component={SiteMaitainance} />

              {/* maintenance page */}
              <Route exact path="/m" component={SiteMaitainance} />
              <Route exact path="/aboutus" component={Aboutus} />
              <Route exact path="/contactus" component={Contactus} />
              <Route exact path="/faqs" component={FAQs} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}

export default connect(mapStateToProps)(App);

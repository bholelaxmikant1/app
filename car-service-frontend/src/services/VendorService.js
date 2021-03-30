import axios from "axios";
import authHeader from "./auth-header";

const VENDOR_API_BASE_URL = "http://localhost:8080/admin";

class VendorService {
  getVendors() {
    return axios.get(VENDOR_API_BASE_URL + "/vendorlist", {
      headers: authHeader(),
    });
  }

  createVendor(vendor) {
    return axios.post(VENDOR_API_BASE_URL + "/vendor/signup", vendor, {
      headers: authHeader(),
    });
  }

  getVendorById(vendorId) {
    return axios.get(VENDOR_API_BASE_URL + "/vendor/" + vendorId, {
      headers: authHeader(),
    });
  }

  updateVendor(vendor, vendorId) {
    return axios.put(VENDOR_API_BASE_URL + `/editVendor/` + vendorId, vendor, {
      headers: authHeader(),
    });
  }

  deleteVendor(vendorId) {
    return axios.delete(VENDOR_API_BASE_URL + `/deleteVendor/${vendorId}`, {
      headers: authHeader(),
    });
  }

  deleteCustomer(vendorId) {
    return axios.delete(VENDOR_API_BASE_URL + `/deleteVendor/${vendorId}`, {
      headers: authHeader(),
    });
  }
  getCustomer() {
    return axios.get("/employee/customerlist", {
      headers: authHeader(),
    });
  }
}

export default new VendorService();

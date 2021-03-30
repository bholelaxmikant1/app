import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/servicepackage";

class PackageService {
    getPackages(){
        return axios.get(API_URL + "/list")
    }
    createPackage(sPackage){
        return axios.post(API_URL+ "/add",  sPackage,{
            headers: authHeader(),
          });
    }
    getPackageById(packageId){
        return axios.get(API_URL + '/' + packageId,{
            headers: authHeader(),
          });
    }
    updatePackage(sPackage, packageId){
        return axios.put(API_URL + '/update/' + packageId, sPackage,{
            headers: authHeader(),
          });
    }
    deletePackage(packageId){
        return axios.delete(API_URL + '/delete/' + packageId,{
            headers: authHeader(),
          });
    }
}

export default new PackageService();

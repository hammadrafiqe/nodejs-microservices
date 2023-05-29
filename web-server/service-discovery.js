const SERVICE_HOST = "_SERVICE_HOST";
const SERVICE_PORT = "_SERVICE_PORT";

const { api_service_name, last_mile_service_name } = process.env;
const API_SERVICE = api_service_name
  ? `http://${process.env[api_service_name.toUpperCase() + SERVICE_HOST]}:${
      process.env[api_service_name.toUpperCase() + SERVICE_PORT]
    }`
  : "http://localhost:8081";

const LAST_MILE_SERVICE = last_mile_service_name
  ? `http://${
      process.env[last_mile_service_name.toUpperCase() + SERVICE_HOST]
    }:${process.env[last_mile_service_name.toUpperCase() + SERVICE_PORT]}`
  : "http://localhost:8082";

console.log("hosts", [LAST_MILE_SERVICE, API_SERVICE]);

module.exports = { API_SERVICE, LAST_MILE_SERVICE };

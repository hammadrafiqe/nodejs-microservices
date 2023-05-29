const SERVICE_HOST = "_SERVICE_HOST";
const SERVICE_PORT = "_SERVICE_PORT";

const { last_mile_service_name } = process.env;

const LAST_MILE_SERVICE = last_mile_service_name
  ? `http://${
      process.env[last_mile_service_name.toUpperCase() + SERVICE_HOST]
    }:${process.env[last_mile_service_name.toUpperCase() + SERVICE_PORT]}`
  : "http://localhost:8082";

console.log("hosts", [LAST_MILE_SERVICE]);

module.exports = { LAST_MILE_SERVICE };

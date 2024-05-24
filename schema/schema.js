const { object, string, number } = require("zod");
module.exports.resister = object({
  body: object({
    firstname: string({ required_error: "Component firstname is required" }),
    lastname: string({ required_error: "Component lastname is required" }),
    email: string({ required_error: "Email is required" }),
    password: string({ required_error: "password is required" }),
    pincode: number({ required_error: "pincode is required" }),
    addr: string({ required_error: "Addr is required" }),
  }),
});

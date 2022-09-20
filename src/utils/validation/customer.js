const Joi = require("joi");

function validateCustomerSignup(body) {
  const schema = {
    first_name: Joi.string().required().min(2).trim(),
    last_name: Joi.string().required().min(2).trim(),
    email: Joi.string().required().email({ minDomainAtoms: 2 }).trim(),
    password: Joi.string().min(5).max(255).required().trim(),
    confirm_password: Joi.string().min(5).max(255).required().trim(),
    phone: Joi.number().allow("").required(),
    location: Joi.string().min(2).trim().allow(""),
  };
  return Joi.validate(body, schema);
}
function validateEditCustomer(body) {
  const schema = {
    first_name: Joi.string().required().min(2).trim(),
    image: Joi.string().allow(""),
    last_name: Joi.string().required().min(2).trim(),
    phone: Joi.number().allow("").required(),
    location: Joi.string().min(2).trim().allow("").required(),
  };
  return Joi.validate(body, schema);
}
module.exports = {
  validateCustomerSignup,
  validateEditCustomer
};

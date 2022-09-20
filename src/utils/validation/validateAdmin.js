const Joi = require("joi");

function validateAdmin(user) {
  const schema = {
    full_name: Joi.string()
      .regex(/^[a-z A-Z]+$/)
      .min(3)
      .max(20)
      .required()
      .trim(),
    email: Joi.string().required().email({ minDomainAtoms: 2 }).trim(),
    password: Joi.string().min(5).max(255).required().trim(),
    confirm_password: Joi.string().min(5).max(255).required().trim(),
  };
  return Joi.validate(user, schema);
}

function validateEditAdmin(user) {
  const schema = {
    full_name: Joi.string()
      .regex(/^[a-z A-Z]+$/)
      .min(3)
      .max(20)
      .required()
      .trim(),
    profile_image: Joi.string().trim().required(),
    status: Joi.boolean().required(),
  };
  return Joi.validate(user, schema);
}
module.exports = {
  validateAdmin,
  validateEditAdmin,
};

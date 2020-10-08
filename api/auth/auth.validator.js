const Joi = require("joi");

const validationSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string()
    .pattern(/^[a-zA-Z0-9]{8,16}$/)
    .required()
    .error((errors) => {
      errors.forEach((err) => {
        if (err.code === "string.pattern.base") {
          err.message = "'password' is not valid";
        }
      });
      return errors;
    }),
});

const dataValidationMiddleware = (schema) => async (req, res, next) => {
  const { error } = await schema.validate(req.body);
  if (error) {
    res.status(400).send(error.message);
    return;
  }
  next();
};

module.exports = {
  validatorMiddleware: dataValidationMiddleware(validationSchema),
};

import Joi from "joi";

const signinValidationSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "any.required": "Email is required",
    "string.email": "Fill Valid email",
  }),

  password: Joi.string().required().messages({
    "any.required": "Password is required",
  }),
});

export default signinValidationSchema;

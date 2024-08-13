import Joi from "joi";

const ForgotPasswordSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "any.required": "Email is required",
  }),
  password: Joi.string()
    .min(8) // Minimum length
    .max(20) // Maximum length
    .required() // Required field
    .pattern(/^[a-zA-Z0-9!@#$%^&*()_+={}\[\]|;:',.<>?`~\-\/\\]+$/) // Allowed characters
    .pattern(/[a-z]/) // At least one lowercase letter
    .pattern(/[A-Z]/) // At least one uppercase letter
    .pattern(/[0-9]/) // At least one digit
    .pattern(/[!@#$%^&*()_+={}\[\]|;:',.<>?`~\-\/\\]/) // At least one special character
    .messages({
      "string.base": "Password should be a type of string",
      "string.empty": "Password cannot be an empty field",
      "string.min": "Password should have a minimum length of {#limit}",
      "string.max": "Password should have a maximum length of {#limit}",
      "string.pattern.base":
        "Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character",
      "any.required": "Password is a required field",
    }),

  cpassword: Joi.string()
    .valid(Joi.ref("password")) // Ensures cpassword matches password
    .required() // Required field
    .messages({
      "any.only": "Confirm Password must match Password",
      "any.required": "Confirm Password is a required field",
    }),
}).with("password", "cpassword"); // Ensures both fields are present together

export default ForgotPasswordSchema;

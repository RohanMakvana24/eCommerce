import Joi from "joi";
const ResetPasswordSchema = Joi.object({
  oldPassword: Joi.string().required().messages({
    "any.required": "The Old Password is Required",
  }),
  newPassword: Joi.string()
    .min(8) // Minimum length
    .max(20) // Maximum length
    .required() // Required field
    .pattern(/^[a-zA-Z0-9!@#$%^&*()_+={}\[\]|;:',.<>?`~\-\/\\]+$/) // Allowed characters
    .pattern(/[a-z]/) // At least one lowercase letter
    .pattern(/[A-Z]/) // At least one uppercase letter
    .pattern(/[0-9]/) // At least one digit
    .pattern(/[!@#$%^&*()_+={}\[\]|;:',.<>?`~\-\/\\]/) // At least one special character
    .messages({
      "string.base": "New Password should be a type of string",
      "string.empty": "New Password cannot be an empty field",
      "string.min": "New Password should have a minimum length of {#limit}",
      "string.max": "New Password should have a maximum length of {#limit}",
      "string.pattern.base":
        "New Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character",
      "any.required": "New Password is a required field",
    }),
});

export default ResetPasswordSchema;

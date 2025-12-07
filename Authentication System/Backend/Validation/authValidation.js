import Joi from "joi";

// ✅ Register Validation Schema
export const registerSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    "string.empty": "Name is required",
    "string.min": "Name must be at least 3 characters",
  }),
  email: Joi.string().email().min(6).max(24).required().messages({
    "string.email": "Invalid email format",
  }),
  password: Joi.string().min(8).max(16).required().messages({
    "string.min": "Password must be at least 8 characters",
  }),
});

// ✅ Login Validation Schema
export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Invalid email format",
  }),
  password: Joi.string().min(8).required().messages({
    "string.min": "Password must be at least 8 characters",
  }),
});

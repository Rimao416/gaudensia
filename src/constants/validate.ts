import Joi from "joi";
import i18n from "../i18n";

export const getEmailValidationSchema = () => {
  return Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .messages({
        "string.email": "L'adresse e-mail est invalide.",
        "string.empty": "L'adresse e-mail est obligatoire.",
      }),
  });
};

export const getFullNameValidationSchema = () => {
  return Joi.object({
    fullName: Joi.string()
      .required()
      .pattern(/^[A-Za-z\s]+$/) // permet uniquement les lettres et espaces
      .messages({
        "string.empty": i18n.t("validation.fullNameRequired"),
        "string.pattern.base": i18n.t("validation.fullNameInvalid"), // message personnalisé pour la validation
      }),
  });
};

export const getPasswordValidationSchema = () => {
    return Joi.object({
      password: Joi.string()
        .required()
        .min(8)
        .pattern(/[0-9]/, "number") // at least one digit
        .pattern(/[A-Z]/, "uppercase") // at least one uppercase letter
        .pattern(/[a-z]/, "lowercase") // at least one lowercase letter
        .messages({
          "string.empty": i18n.t("validation.passwordRequired"),
          "string.min": i18n.t("validation.passwordMinLength"),
          "string.pattern.number": i18n.t("validation.passwordNumberRequired"),
          "string.pattern.uppercase": i18n.t("validation.passwordUppercaseRequired"),
          "string.pattern.lowercase": i18n.t("validation.passwordLowercaseRequired"),
        }),
      newPassword: Joi.string()
        .required()
        .valid(Joi.ref("password"))
        .messages({
          "any.only": i18n.t("validation.passwordsMustMatch"),
        }),
      confirmPassword: Joi.string()
        .required()
        .valid(Joi.ref("newPassword"))
        .messages({
          "any.only": i18n.t("validation.passwordsMustMatch"),
        }),
    });
  };

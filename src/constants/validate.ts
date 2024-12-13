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
      .messages({
        "string.empty": i18n.t("validation.fullNameRequired"),
      }),
  });
};

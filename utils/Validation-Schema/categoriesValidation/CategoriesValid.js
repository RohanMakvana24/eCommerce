import Joi from "joi";

const categoryValid = Joi.object({
  name: Joi.string().required("The Name is required"),
  status: Joi.number().required("The Status is required"),
  public_id: Joi.string().required("The Public_id is Required"),
  url: Joi.string().required("The  URL  is Required"),
  description: Joi.string().required("The Categories Description is Required"),
});

export default categoryValid;

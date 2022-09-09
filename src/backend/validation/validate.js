import { celebrate, Joi, Segments } from "celebrate"

class validate {
  static registration = celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().min(6).required(),
      username: Joi.string().min(3).max(32).required(),
      email: Joi.string().min(6).max(255).required().email(),
      password: Joi.string().min(8).max(127).required(),
    })
  })

  static requestValidation = celebrate({
    [Segments.BODY]: Joi.object().keys({
      title: Joi.string().min(3).required(),
      description: Joi.string().min(6).required(),
    }),
  });


  static updateRequest = celebrate({
    [Segments.BODY]: Joi.object().keys({
      title: Joi.string().min(3).required(),
      description: Joi.string().min(6).required(),
    }),
  });

  static signIn = celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().min(3).max(320).required().email(),
      password: Joi.string().min(8).max(127).required(),
    }),
  });
}

export default validate
import * as Yup from 'yup';

import Spot from '../models/Spot';
import User from '../models/User';

class SpotController {
  async store(req, res) {
    const schema = Yup.object().shape({
      body: Yup.object().shape({
        company: Yup.string().required(),
        techs: Yup.string(),
        price: Yup.number()
          .required()
          .positive(),
      }),
      headers: Yup.object().shape({
        user_id: Yup.string().required(),
      }),
      file: Yup.object().shape({
        filename: Yup.string().required(),
      }),
    });

    if (!(await schema.isValid(req))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const { company, techs, price } = req.body;
    const { user_id } = req.headers;
    const { filename } = req.file;

    const userExists = await User.findById(user_id);

    if (!userExists) {
      return res.status(400).json({ error: 'User does not exists' });
    }

    const spot = await Spot.create({
      user: user_id,
      thumbnail: filename,
      company,
      techs: techs.split(',').map(tech => tech.trim()),
      price,
    });

    return res.json(spot);
  }

  async index(req, res) {
    const { tech } = req.query;

    const spots = await Spot.find({ techs: tech });

    return res.json(spots);
  }
}

export default new SpotController();

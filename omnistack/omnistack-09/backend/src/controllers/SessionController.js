import * as Yup from 'yup';

import User from '../models/User';

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const { email } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.json(userExists);
    }

    const user = await User.create({ email });

    return res.json(user);
  }
}

export default new SessionController();

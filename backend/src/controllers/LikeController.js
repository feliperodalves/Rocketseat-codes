import * as Yup from 'yup';

import Dev from '../models/Dev';

class LikeController {
  async store(req, res) {
    const schema = Yup.object().shape({
      params: Yup.object().shape({
        devId: Yup.string().required(),
      }),
      headers: Yup.object().shape({
        user: Yup.string().required(),
      }),
    });

    if (!(await schema.isValid(req))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const { user } = req.headers;
    const { devId } = req.params;

    const loggedDev = await Dev.findById(user);
    const targetDev = await Dev.findById(devId);

    if (!targetDev) {
      return res.status(400).json({ error: 'Dev not exists' });
    }

    if (targetDev.likes.includes(loggedDev._id)) {
      const loggedSocket = req.connectedUsers[user];
      const targetSocket = req.connectedUsers[devId];

      if (loggedSocket) {
        req.io.to(loggedSocket).emit('match', targetDev);
      }

      if (targetSocket) {
        req.io.to(targetSocket).emit('match', loggedDev);
      }
    }

    loggedDev.likes.push(targetDev._id);
    await loggedDev.save();

    return res.json(loggedDev);
  }
}

export default new LikeController();

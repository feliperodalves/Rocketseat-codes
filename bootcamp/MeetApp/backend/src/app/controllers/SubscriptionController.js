import { Op } from 'sequelize';

import Subscription from '../models/Subscription';
import Meetup from '../models/Meetup';
import User from '../models/User';
import File from '../models/File';

import Notification from '../schemas/Notification';
import Queue from '../../lib/Queue';
import SubscriptionMail from '../jobs/SubscriptionMail';

class SubscriptionController {
  async index(req, res) {
    const subscriptions = await Subscription.findAll({
      where: { user_id: req.userId },
      attributes: ['id'],

      include: [
        {
          model: Meetup,
          as: 'meetup',
          where: { datetime: { [Op.gt]: new Date() } },
          attributes: ['id', 'title', 'description', 'location', 'datetime'],
          required: true,
          include: [
            {
              model: User,
              as: 'organizer',
              attributes: ['id', 'name'],
              include: [
                {
                  model: File,
                  as: 'avatar',
                  attributes: ['id', 'path', 'url'],
                },
              ],
            },
            {
              model: File,
              as: 'banner',
              attributes: ['id', 'url', 'path'],
            },
          ],
        },
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['id', 'path', 'url'],
            },
          ],
        },
      ],
      order: [['meetup', 'datetime']],
    });

    return res.json(subscriptions);
  }

  async store(req, res) {
    const meetup = await Meetup.findByPk(req.params.id);
    if (!meetup) {
      return res.status(400).json({ error: 'Meetup does not exists' });
    }
    if (meetup.user_id === req.userId) {
      return res
        .status(400)
        .json({ error: 'You can not subscribe in this meetup' });
    }
    if (meetup.past) {
      return req
        .status(400)
        .json({ error: 'This meetup has already happened' });
    }

    const subscribed = await Subscription.findOne({
      where: { user_id: req.userId, meetup_id: meetup.id },
    });
    if (subscribed) {
      return res
        .status(400)
        .json({ error: 'You have already subscribed for this meetup' });
    }

    const sameTime = await Meetup.findOne({
      where: {
        datetime: meetup.datetime,
        id: { [Op.ne]: meetup.id },
      },
      include: [
        {
          model: Subscription,
          as: 'subscription',
          where: {
            user_id: req.userId,
          },
        },
      ],
    });
    if (sameTime) {
      return res
        .status(400)
        .json({ error: 'You can not subscribe for 2 meetups at same time' });
    }

    const subscription = await Subscription.create({
      meetup_id: meetup.id,
      user_id: req.userId,
    });

    const user = await User.findByPk(req.userId);
    const organizer = await User.findByPk(meetup.user_id);

    await Notification.create({
      content: `Nova inscrição de ${user.name} para o Meetup ${meetup.title}`,
      user: meetup.user_id,
    });

    await Queue.add(SubscriptionMail.key, {
      meetup,
      organizer,
      user,
    });

    return res.json(subscription);
  }

  async delete(req, res) {
    const subscription = await Subscription.findOne({
      where: { meetup_id: req.params.id },
    });
    if (!subscription) {
      return res.status(400).json({ error: 'Subscription does not exists' });
    }
    if (subscription.user_id !== req.userId) {
      return res
        .status(401)
        .json({ error: 'You can not delete others subscription' });
    }

    await subscription.destroy();

    return res.send();
  }
}

export default new SubscriptionController();

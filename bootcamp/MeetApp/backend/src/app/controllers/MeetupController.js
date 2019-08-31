import {
  parseISO,
  startOfDay,
  endOfMonth,
  addMonths,
  endOfDay,
} from 'date-fns';
import { Op } from 'sequelize';

import Meetup from '../models/Meetup';
import User from '../models/User';
import File from '../models/File';
import Subscription from '../models/Subscription';

class MeetupController {
  async index(req, res) {
    const { page = 1 } = req.query;
    const initialDate = req.query.date
      ? startOfDay(parseISO(req.query.date))
      : startOfDay(new Date());
    const finalDate = req.query.date
      ? endOfDay(parseISO(req.query.date))
      : endOfMonth(addMonths(new Date(), 1));

    const meetups = await Meetup.findAll({
      where: {
        user_id: { [Op.ne]: req.userId },
        datetime: {
          [Op.between]: [initialDate, finalDate],
        },
      },
      attributes: [
        'id',
        'title',
        'description',
        'datetime',
        'location',
        'user_id',
        'file_id',
        'past',
      ],
      order: ['datetime'],
      limit: 10,
      offset: (page - 1) * 10,
      include: [
        {
          model: User,
          as: 'organizer',
          attributes: ['id', 'name'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['id', 'url', 'path'],
            },
          ],
        },
        {
          model: File,
          as: 'banner',
          attributes: ['id', 'url', 'path'],
        },
        {
          model: Subscription,
          as: 'subscription',
          attributes: ['id'],
          where: {
            user_id: req.userId,
          },
          required: false,
        },
      ],
    });

    return res.json(meetups);
  }

  async detail(req, res) {
    const meetup = await Meetup.findByPk(req.params.id, {
      where: {
        user_id: req.userId,
      },
      attributes: ['id', 'title', 'description', 'datetime', 'location'],
      include: [
        {
          model: User,
          as: 'organizer',
          attributes: ['id', 'name'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['id', 'url', 'path'],
            },
          ],
        },
        {
          model: File,
          as: 'banner',
          attributes: ['id', 'url', 'path'],
        },
      ],
    });
    return res.json(meetup);
  }
}

export default new MeetupController();

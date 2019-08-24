import {
  startOfHour,
  isBefore,
  parseISO,
  startOfDay,
  endOfMonth,
  addMonths,
  endOfDay,
} from 'date-fns';
import * as Yup from 'yup';
import { Op } from 'sequelize';

import Meetup from '../models/Meetup';
import User from '../models/User';
import File from '../models/File';

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
        user_id: req.userId,
        datetime: {
          [Op.between]: [initialDate, finalDate],
        },
      },
      attributes: ['id', 'title', 'description', 'datetime'],
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
              attributes: ['id', 'url'],
            },
          ],
        },
        {
          model: File,
          as: 'banner',
          attributes: ['id', 'url'],
        },
      ],
    });
    return res.json(meetups);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      description: Yup.string().required(),
      location: Yup.string().required(),
      datetime: Yup.date().required(),
      file_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const hourStart = startOfHour(parseISO(req.body.datetime));
    if (isBefore(hourStart, new Date())) {
      return res.status(400).json({ error: 'Past dates are not permitted' });
    }

    const fileExists = await File.findByPk(req.body.file_id);
    if (!fileExists) {
      return res.status(400).json({ error: 'File does not exists' });
    }

    const { id, title, location, datetime } = await Meetup.create({
      ...req.body,
      user_id: req.userId,
    });
    return res.json({ id, title, location, datetime });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string(),
      file_id: Yup.number(),
      description: Yup.string(),
      location: Yup.string(),
      datetime: Yup.date(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const meetup = await Meetup.findByPk(req.params.id);
    if (!meetup) {
      return res.status(400).json({ error: 'Meetup does not exists' });
    }
    if (meetup.user_id !== req.userId) {
      return res.status(401).json({ error: 'You can not edit others meetups' });
    }
    if (
      req.body.datetime &&
      isBefore(parseISO(req.body.datetime), new Date())
    ) {
      return res.status(400).json({ error: 'Invalid datetime' });
    }
    if (meetup.past) {
      return res.status(400).json({ error: 'Past dates are not permitted' });
    }

    const fileExists = await File.findByPk(req.body.file_id);
    if (req.body.file_id && !fileExists) {
      return res.status(400).json({ error: 'File does not exists' });
    }
    const { id, title, description, location, datetime } = await meetup.update(
      req.body
    );
    return res.json({ id, title, description, location, datetime });
  }

  async delete(req, res) {
    const meetup = await Meetup.findByPk(req.params.id);
    if (!meetup) {
      return res.status(400).json({ error: 'Meetup does not exists' });
    }
    if (meetup.user_id !== req.userId) {
      return res
        .status(401)
        .json({ error: 'You can not delete others meetups' });
    }
    if (meetup.past) {
      return res.status(400).json({ error: 'Past dates are not permitted' });
    }

    await meetup.destroy();

    return res.send();
  }
}

export default new MeetupController();

const axios = require('axios');
const Dev = require('../models/Dev');

const parseStringAsArray = require('../utils/ParseStringAsArray');

module.exports = {
  async store(req, res) {
    const { github, techs, lat, lng } = req.body;

    const devExists = await Dev.findOne({ github });

    if (devExists) {
      return res.json(devExists);
    }

    const response = await axios.get(`https://api.github.com/users/${github}`);

    const { name = login, avatar_url, bio } = response.data;
    const techsArray = parseStringAsArray(techs);

    const location = {
      type: 'Point',
      coordinates: [lng, lat],
    };

    const dev = await Dev.create({
      github,
      name,
      avatar_url,
      bio,
      techs: techsArray,
      location,
    });

    return res.json(dev);
  },

  async index(req, res) {
    const devs = await Dev.find();

    return res.json(devs);
  },
};

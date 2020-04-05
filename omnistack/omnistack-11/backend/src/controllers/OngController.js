const crypto = require('crypto');
const conn = require('../database');

module.exports = {
  async store(req, res) {
    const { name, email, whatsapp, city, uf } = req.body;
    const id = crypto.randomBytes(4).toString('HEX');

    const ong = await conn('ongs').insert({
      id,
      name,
      email,
      whatsapp,
      city,
      uf,
    });

    return res.json(ong);
  },

  async index(req, res) {
    const ongs = await conn('ongs').select('*');

    return res.json(ongs);
  },
};

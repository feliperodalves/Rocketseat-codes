/*
|--------------------------------------------------------------------------
| DatabaseSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const User = use('App/Models/User');

class DatabaseSeeder {
  async run() {
    const user = await User.create({
      name: 'Felipe Alves',
      email: 'felipe.rod.alves@gmail.com',
      password: '123456',
    });

    await user.teams().create({
      name: 'Felipe Alves Tech',
      user_id: user.id,
    });
  }
}

module.exports = DatabaseSeeder;

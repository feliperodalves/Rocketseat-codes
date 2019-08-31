import { isBefore } from 'date-fns';
import Sequelize, { Model } from 'sequelize';

class Meetup extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        description: Sequelize.TEXT,
        location: Sequelize.STRING,
        datetime: Sequelize.DATE,
        past: {
          type: Sequelize.VIRTUAL,
          get() {
            return isBefore(this.datetime, new Date());
          },
        },
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.hasMany(models.Subscription, {
      foreignKey: 'meetup_id',
      as: 'subscription',
    });
    this.belongsTo(models.File, { foreignKey: 'file_id', as: 'banner' });
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'organizer' });
  }
}

export default Meetup;

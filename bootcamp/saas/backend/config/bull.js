const Env = use('Env');

module.exports = {
  connection: Env.get('BULL_CONNECTION', 'bull'),
  bull: {
    redis: {
      host: 'felipealves.tech',
      port: 6379,
      password: null,
      db: 0,
      keyPrefix: 'adonis_saas',
    },
  },
  // remote: 'redis://redis.example.com?password=correcthorsebatterystaple',
};

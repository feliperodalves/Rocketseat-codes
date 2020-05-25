/** @type {typeof import('@rocketseat/adonis-bull/src/')} */

const User = use('App/Models/User');
const Bull = use('Rocketseat/Bull');
const Job = use('App/Jobs/InvitationEmail');

const InviteHook = (exports = module.exports = {});

InviteHook.sendInvitationEmail = async (invite) => {
  const { email, team_id } = invite;
  const invited = await User.findBy('email', email);

  if (invited) {
    await invited.teams().attach(team_id);
  } else {
    const user = await invite.user().fetch();
    const team = await invite.team().fetch();

    Bull.add(
      Job.key,
      { team, user, email },
      {
        delay: 15000,
        attempts: 3,
      }
    );
  }
};

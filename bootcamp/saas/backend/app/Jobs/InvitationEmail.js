const Mail = use('Mail');

class InvitationEmail {
  static get key() {
    return 'InvitationEmail-key';
  }

  async handle(job) {
    const { user, team, email } = job.data;

    await Mail.send(
      'emails.invitation',
      { team: team.name, user: user.name },
      (message) => {
        message
          .to(email)
          .from('me@felipealves.tech', 'Felipe Alves')
          .subject(`Convite para o time ${team.name}`);
      }
    );
  }
}

module.exports = InvitationEmail;

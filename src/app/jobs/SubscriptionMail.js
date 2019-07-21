import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale';
import Mail from '../../lib/Mail';

class SubscriptionMail {
  get key() {
    return 'SubscriptionMail';
  }

  async handle({ data }) {
    const { meetup, organizer, user } = data;

    await Mail.sendMail({
      to: `${organizer.name} <${organizer.email}>`,
      subject: 'Inscrição realizada',
      template: 'subscription',
      context: {
        organizer: organizer.name,
        user: user.name,
        title: meetup.title,
        location: meetup.location,
        date: format(
          parseISO(meetup.datetime),
          "'dia' dd 'de' MMMM', às' H:mm'h'",
          {
            locale: pt,
          }
        ),
      },
    });
  }
}

export default new SubscriptionMail();

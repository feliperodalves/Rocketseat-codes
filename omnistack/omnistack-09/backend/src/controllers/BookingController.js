import Booking from '../models/Booking';

class BookingController {
  async store(req, res) {
    const { user_id } = req.headers;
    const { spot_id } = req.params;
    const { date } = req.body;

    const booking = await Booking.create({
      user: user_id,
      spot: spot_id,
      date,
    });

    await booking
      .populate('spot')
      .populate('user')
      .execPopulate();

    const ownerSocket = req.connectedUsers[booking.spot.user];
    if (ownerSocket){
      req.io.to(ownerSocket).emit('booking-request', booking);
      console.log(booking);
    }

    return res.json(booking);
  }

  async index(req,res){
    const { user_id } = req.headers;

    const booking = await Booking.find().populate('user').populate({
      path: 'spot', 
      match: {
        user: user_id 
      }
    });

    return res.json(booking.filter(book => book.spot && !book.approved))
  }
}

export default new BookingController();

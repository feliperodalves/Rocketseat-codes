import Booking from '../models/Booking';

class ApprovalController {
  async store(req, res) {
    const { booking_id } = req.params;

    const booking = await Booking.findById(booking_id).populate('spot');
    booking.approved = true;

    await booking.save();

    const bookingUserSocket = req.connectedUsers[booking.user];
    if (bookingUserSocket) {
      req.io.to(bookingUserSocket).emit('booking-response', booking);
    }

    return res.json(booking);
  }
}

export default new ApprovalController();

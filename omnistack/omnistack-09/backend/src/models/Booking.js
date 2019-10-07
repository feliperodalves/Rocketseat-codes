import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema(
  {
    date: {
      type: String,
      required: true,
    },
    approved: {
      type: Boolean,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    spot: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Spot',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Booking', BookingSchema);

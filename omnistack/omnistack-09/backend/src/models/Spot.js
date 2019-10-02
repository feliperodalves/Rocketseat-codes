import mongoose from 'mongoose';

const SpotSchema = new mongoose.Schema(
  {
    thumbnail: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    techs: {
      type: [String],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Spot', SpotSchema);

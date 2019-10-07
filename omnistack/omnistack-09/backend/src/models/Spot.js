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
    toJSON: {
      virtuals: true,
    },
  }
);

SpotSchema.virtual('thumbnail_url').get(function() {
  return `http://192.168.15.10:3333/files/${this.thumbnail}`;
});

export default mongoose.model('Spot', SpotSchema);

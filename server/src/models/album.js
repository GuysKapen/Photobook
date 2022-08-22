import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const Schema = mongoose.Schema;
const AlbumSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  images: [{
    type: String,
  }],
  commnets: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment',
  }]
});

AlbumSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Album', AlbumSchema);

const mongoose = require('mongoose');

const ParameterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  required: { type: Boolean, default: false },
  example: { type: String },
  type: { type: String, required: true },
});

const RequestBodySchema = new mongoose.Schema({
  description: { type: String },
  required: { type: Boolean, default: false },
  content: {
    type: Map,
    of: {
      type: {
        type: String,
        enum: ['string', 'number', 'integer', 'boolean', 'array', 'object'],
        required: true,
      },
      description: { type: String },
      required: { type: Boolean, default: false },
      example: { type: String },
      properties: {
        type: Map,
        of: ParameterSchema,
      },
      items: {
        type: ParameterSchema,
      },
    },
  },
});

const RequestBody = mongoose.model('RequestBody', RequestBodySchema);

module.exports = RequestBody;
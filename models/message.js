const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { DateTime } = require('luxon');
const User = require('./user');
const MessageSchema = new Schema({
    author: {type: Schema.Types.ObjectId, ref: User, required: true},
    message: {type: String, required: true},
    date_of_creation: {type: Date, required: true, default: Date.now}
});

MessageSchema.virtual("date_formatted").get(function() {
    return DateTime.fromJSDate(this.date_of_creation).toLocaleString(DateTime.DATETIME_SHORT);
});

MessageSchema.virtual("url").get(function() {
    return `/messages/${this._id}`;
});
module.exports = mongoose.model("Message", MessageSchema);


'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CategorySchema = new Schema({
    name: {type: String, required: true, unique: true},
    description: {type: String, required: true},
    createdAt: {type: Date, required: true},
    createdBy: {type: Schema.Types.ObjectId, required: true, ref: "User"},
    updatedAt: {type: Date},
    routines: {type: [Schema.Types.ObjectId], ref: "Routine"},
    imageUrl: {type: String}
});

mongoose.model('Category', CategorySchema);

const mongoose = require('mongoose');
const Joi = require('joi');

const clubSchema = new mongoose.Schema({
    name: String,
    phone: String,
    logo_url: String,
    org: String,
    location: String,
    insta_url: String,
    face_url: String,
    trip_url: String,
    createdAt: {
        type: Date,
        default: Date.now()
    },
    visible:Boolean,
    user_id: String
})

exports.ClubModel = mongoose.model('clubs', clubSchema);

exports.validClubData = (_bodyData) => {
    let schemaJoi = Joi.object({
        name: Joi.string().min(2).max(20).required(),
        phone: Joi.string().min(8).max(25).required(),
        logo_url: Joi.string().min(2).max(999).required(),
        org: Joi.string().min(2).max(99).required(),
        location: Joi.string().min(2).max(99).required(),
        insta_url: Joi.string().optional().allow('').min(2).max(999),
        face_url: Joi.string().optional().allow('').min(2).max(999),
        trip_url: Joi.string().optional().allow('').min(2).max(999)
    })
    return schemaJoi.validate(_bodyData);
}
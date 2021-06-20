const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        trim: true,
        maxlength: 25
    },
    username: {
        type: String,
        required: true,
        trim: true,
        maxlength: 25,
        unique: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: 'data:image/png;base64,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'
    },
    role: { type: String, default: 'user' },
    gender: { type: String, default: 'male' },
    mobile: { type: String, default: '+84' || '0' },
    address: { type: String, default: '' },
    story: {
        type: String,
        default: '',
        maxlength: 200
    },
    website: { type: String, default: '' },
    followers: [{ type: mongoose.Types.ObjectId, ref: 'user' }],
    following: [{ type: mongoose.Types.ObjectId, ref: 'user' }],
    saved: [{ type: mongoose.Types.ObjectId, ref: 'user' }]
}, {
    timestamps: true
})


module.exports = mongoose.model('user', userSchema)
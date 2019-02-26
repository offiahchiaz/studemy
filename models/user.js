const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstname: {
        type: String,
        lowercase: true
    },
    lastname: {
        type: String, 
        lowercase: true
    },
    email: {
        type: String, 
        unique: true, 
        lowercase: true
    },
    password: {
        type: String, 
        minlength: 6
    },
    picture: {
        type: String
    },
    address: {
        type: String
    },
    history: [{
        paid: {type: Number, default: 0},
        item: {type: Schema.Types.ObjectId, ref: 'Product'}
    }]
});

// Virtual for user's full name
UserSchema.virtual('name').get(function () {
    return `${this.firstname} ${this.lastname}`;
});

UserSchema.pre('save', function (next) {
    const user = this;
    if (!user.isModified('password')) return next();
    bcrypt.genSalt(10, function (err, salt) {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, null, function (err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);
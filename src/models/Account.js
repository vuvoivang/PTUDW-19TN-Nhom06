const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema.Types;
const AutoIncrement = require('mongoose-sequence')(mongoose);

const addressSchema = new Schema({
    province: String,
    district: String,
    ward: String,
})

const accountSchema = new Schema({
    _id: {
        type: Number,
        unique: true,
    },
    email: {
        type: String,
        unique: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    displayName: {
        type: String,
    },
    address: {
        type: addressSchema,
    },
    dateOfBirth: {
        type: Date,
    },
    avatarUrl: {
        type: String,
    },
    avatarName: {
        type: String,
    },
    ifHasAvatar: {
        type: Boolean,
    },
    cardID: {
        type: String,
        $regex: /^([0-9]{12})$/
    },
    state: {
        type: String,
        enum: ["Khỏi bệnh", 'F0', 'F1', 'F2', 'F3', 'F4']
    },
    auth: {
        type: String,
        default: 'normal'
    },
    isBlock: {
        type: Boolean,
    },
    role: {
        type: String,
        enum: ['admin', 'active_manager', 'inactive_manager', 'user'],
        default: 'user'
    },
    quarantineLocation: [{
        type: ObjectId,
        ref: 'QuarantineLocation',
    }]
}, {
    _id: false, // mongodb can't interfere this field
    timestamps: true,
});

accountSchema.plugin(AutoIncrement, {
    id: "account_seq",
    collection_name: "account_counters"
});

accountSchema.pre('save', async function (next) {
    if (!this.displayName) this.displayName = this.username;
    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12);
    next();
});

accountSchema.methods.correctPassword = async function (candidate, password) {
    await bcrypt.compare(candidate, password, (err, isMatch) => {
        if (err) throw err;
        return isMatch;
  });
};


module.exports = mongoose.model('accounts', accountSchema);

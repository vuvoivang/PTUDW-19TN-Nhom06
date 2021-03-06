const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema.Types;
const AutoIncrement = require('mongoose-sequence')(mongoose);

const addressSchema = new Schema({
    province: String,
    district: String,
    ward: String,
});

const accountSchema = new Schema({
    _id: {
        type: Number,
        unique: true,
    },
    email: {
        type: String,
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
        // accept all number and length only = 9 or 12
        match: /^[0-9]{9,12}$/,
    },
    state: {
        type: String,
        enum: ["Khỏi bệnh", 'F0', 'F1', 'F2', 'F3']
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
    quarantineLocation: {
        type: ObjectId,
        ref: 'QuarantineLocation',
    },
    isNew: {
        type: Boolean
    }
}, {
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

accountSchema.pre('findOneAndUpdate', async function (next) {
    let data = this.getUpdate();
    this.password = await bcrypt.hash(data.password, 12);
    this.update({}, { password: this.password });
    next();
});

accountSchema.methods.correctPassword = async function (candidate, password) {
    return await bcrypt.compare(candidate, password);
};


module.exports = mongoose.model('accounts', accountSchema);

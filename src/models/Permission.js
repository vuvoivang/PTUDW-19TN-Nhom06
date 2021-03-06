const mongoose = require('mongoose');

const permissionSchema = mongoose.Schema({
    managerUsername: {
        type: String,
        required: true,
        unique: true
    },
    permissions: [String]
});

const Permission = mongoose.model('Permission', permissionSchema);

module.exports = Permission;
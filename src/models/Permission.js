const mongoose = require('mongoose');

const permissionSchema = mongoose.Schema({
    managerId: {
        type: String,
        required: true,
    },
    permissions: [String]
});

const Permission = mongoose.model('Permission', permissionSchema);

module.exports = Permission;
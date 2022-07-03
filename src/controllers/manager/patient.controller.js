const path = "layouts/manager";
const Account = require('../../models/Account');
const QuarantineLocation = require('../../models/QuarantineLocation');
const RelatedUser = require('../../models/RelatedUser');
const utils = require('../../utils/functions');

module.exports = {
    // get All Accounts with role user
    getPatientManagement: async (req, res) => {
        try {
            let patients = await Account.find({ role: "user" });
            patients = utils.mapObjectInArray(patients);
            res.render(`${path}/patientManagement`, {
                layout: "manager/main",
                tag: "patient",
                patients,
            });
        } catch (err) {
            console.log(err.message);
            res.render("error/500");
        }
    },

    getAddPatient: async (req, res) => {
        try {
            let quarantineLocations = await QuarantineLocation.find({});
            quarantineLocations = utils.mapObjectInArray(quarantineLocations);
            let relates = await Account.find({ role: "user" });
            relates = utils.mapObjectInArray(relates);

            res.render(`${path}/addPatient`, {
                layout: "manager/main",
                tag: "patient",
                quarantineLocations,
                relates
            });
        } catch (err) {
            console.log(err.message);
            res.render("error/500");
        }
    },

    addPatient: async (req, res) => {
        try {
            const account = await Account.findOne({ username: req.body.username });
            if (account) {
                return res.status(400).json({
                    status: 'Bad Request',
                    message: 'Tài khoản đã tồn tại',
                    errorCode: "USERNAME_EXIST"
                })
            }

            if (req.body.state === "F3") {
                return res.status(400).json({
                    status: 'Bad Request',
                    message: 'F3 không cần thêm người liên quan',
                    errorCode: "INVALID_DATA"
                })
            }

            const quarantineLocation = await QuarantineLocation.findById(req.body.quarantineLocation);
            if (quarantineLocation.patientsNumber >= quarantineLocation.capacity) {
                return res.status(400).json({
                    status: 'Bad Request',
                    message: 'Đã đạt giới hạn số bệnh nhân trong khu vực',
                    errorCode: "QUARANTINE_LOCATION_FULL"
                })
            }

            const relates = req.body.relates ? req.body.relates.split(', ').map(item => parseInt(item)) : [];
            const patient = new Account({
                username: req.body.username,
                password: req.body.password,
                displayName: req.body.displayName,
                cardID: req.body.cardID,
                dateOfBirth: req.body.dateOfBirth,
                state: req.body.state,
                address: {
                    province: req.body.province,
                    district: req.body.district,
                    ward: req.body.ward
                },
                quarantineLocation: req.body.quarantineLocation,
                role: "user",
                isNew: true,
            });
            await patient.save();

            const patientId = patient._id;

            // add this patient relate to itself
            let relate = new RelatedUser({
                userId: null,
                relatedUserId: patientId,
                stateRelatedUser: req.body.state
            });
            await relate.save();

            if (relates.length > 0) {
                for (let relateId of relates) {
                    let relatedUser = new RelatedUser({
                        userId: patientId,
                        relatedUserId: relateId,
                        stateRelatedUser: utils.getNextStateRelated(req.body.state)
                    });
                    await relatedUser.save();


                    let relatedAccount = await Account.findById(relateId);
                    if (utils.compareState(relatedAccount.state, utils.getNextStateRelated(req.body.state))) {
                        relatedAccount.state = utils.getNextStateRelated(req.body.state);
                        await relatedAccount.save();
                    }
                }
            }

            quarantineLocation.patientsNumber += 1;
            await quarantineLocation.save();

            return res.status(201).json({
                status: 'success',
                message: 'Thêm bệnh nhân thành công',
                data: patient
            })

        } catch (err) {
            console.log(err.message);
            res.status(500).json({
                status: 'Server Error',
                message: 'Có lỗi xảy ra, vui lòng thử lại!!',
                errorCode: "SERVER_ERROR"
            })
        }
    },

    detailPatient: async (req, res) => {
        try {
            const id = req.params.id;
            let patient = await Account.findById(id);
            if (!patient) {
                return res.render("error/404");
            }
            patient = patient.toObject();
            patient.dateOfBirth = utils.formatDate(patient.dateOfBirth);
            let relates = await RelatedUser.find({ userId: id });
            relates = utils.mapObjectInArray(relates);
            patient.relates = relates.map(item => item.relatedUserId).join(', ');

            let quarantineLocation = await QuarantineLocation.findById(patient.quarantineLocation);
            quarantineLocation = quarantineLocation.toObject();

            res.render(`${path}/detailPatient`, {
                layout: "manager/main",
                tag: "patient",
                patient,
                relates,
                quarantineLocation
            });
        } catch (err) {
            console.log(err.message);
            res.render("error/500");
        }
    },

    historyPatient: async (req, res) => {
        res.render(`${path}/historyPatient`, {
            layout: "manager/main",
            tag: "patient"
        })
    },

    updatePatient: async (req, res) => {

    },

    deletePatient: async (req, res) => {

    },

}
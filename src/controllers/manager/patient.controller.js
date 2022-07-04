const path = 'layouts/manager';
const Account = require('../../models/Account');
const LogManager = require('../../models/LogManager');
const QuarantineLocation = require('../../models/QuarantineLocation');
const RelatedUser = require('../../models/RelatedUser');
const utils = require('../../utils/functions');
const { hyperlinksSidebarManager, managerBreadCrumb } = require('../../constants/index');
const jwt = require('jsonwebtoken');

const pushBreadCrumb = (label, link, isActive = true) => {
    let thisBreadCrumb = {};
    Object.assign(thisBreadCrumb, managerBreadCrumb);
    thisBreadCrumb.path = [...managerBreadCrumb.path];
    thisBreadCrumb.path.push({
        label,
        link,
        isActive
    })
    thisBreadCrumb.mainLabel = label;
    return thisBreadCrumb;
};

module.exports = {
    // get All Accounts with role user
    getPatientManagement: async (req, res) => {
        try {
            res.locals.hyperlinks = hyperlinksSidebarManager('patient-management');
            res.locals.breadCrumb = pushBreadCrumb("Quản lý bệnh nhân", '/manager/patient-management');
            let patients = await Account.find({ role: 'user' });
            const decoded = await jwt.decode(req.cookies.token, { complete: true });
            const id = decoded.payload.id;
            const user = await Account.findById(id).lean();
            patients = utils.mapObjectInArray(patients);
            res.render(`${path}/patientManagement`, {
                layout: 'manager/main',
                tag: 'patient',
                patients,
                user
            });
        } catch (err) {
            console.log(err.message);
            res.render('error/500');
        }
    },

    getAddPatient: async (req, res) => {
        try {
            let quarantineLocations = await QuarantineLocation.find({});
            quarantineLocations = utils.mapObjectInArray(quarantineLocations);
            let relates = await Account.find({ role: 'user' });
            relates = utils.mapObjectInArray(relates);

            res.render(`${path}/addPatient`, {
                layout: 'manager/main',
                tag: 'patient',
                quarantineLocations,
                relates,
            });
        } catch (err) {
            console.log(err.message);
            res.render('error/500');
        }
    },

    addPatient: async (req, res) => {
        try {
            const account = await Account.findOne({ username: req.body.username });
            if (account) {
                return res.status(400).json({
                    status: 'Bad Request',
                    message: 'Tài khoản đã tồn tại',
                    errorCode: 'USERNAME_EXIST',
                });
            }

            if (req.body.state === 'F3') {
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
                    errorCode: 'QUARANTINE_LOCATION_FULL',
                });
            }

            const relates = req.body.relates ? req.body.relates.split(', ').map((item) => parseInt(item)) : [];
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
                    ward: req.body.ward,
                },
                quarantineLocation: req.body.quarantineLocation,
                role: 'user',
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
                        stateRelatedUser: utils.getNextStateRelated(req.body.state),
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
                data: patient,
            });
        } catch (err) {
            console.log(err.message);
            res.status(500).json({
                status: 'Server Error',
                message: 'Có lỗi xảy ra, vui lòng thử lại!!',
                errorCode: 'SERVER_ERROR',
            });
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
            let relatedUsers = await RelatedUser.find({ userId: id });
            relatedUsers = utils.mapObjectInArray(relatedUsers);
            patient.relateData = relatedUsers.map(item => item.relatedUserId).join(', ');

            let quarantineLocations = await QuarantineLocation.find({});
            quarantineLocations = utils.mapObjectInArray(quarantineLocations);

            // find all account with role user except account with id = id
            let relates = await Account.find({ role: 'user', _id: { $ne: id } });
            relates = utils.mapObjectInArray(relates);

            // sort relates with all relate has id in relatedUsers first
            relates = utils.sortRelatesPatient(relates, relatedUsers);

            res.render(`${path}/detailPatient`, {
                layout: "manager/main",
                tag: "patient",
                patient,
                quarantineLocations,
                relates
            });
        } catch (err) {
            console.log(err.message);
            res.render("error/500");
        }
    },

    historyPatient: async (req, res) => {
        try {
            const userId = req.params.id;
            let patient = await Account.findById(userId).lean();
            let managementHistory = await LogManager.find({
                userId: Number(userId)
            }).lean();
            if (managementHistory.length === 0) {
                managementHistory = [];
            }
            let relationships = await RelatedUser.find({
                userId: Number(userId)
            }).select({ relatedUserId: 1, _id: 0 }).lean();
            let relatedUsers = [];
            if (relationships.length > 0) {
                for (let i = 0; i < relationships.length; i++) {
                    let relatedUser = await Account.findById(relationships[i].relatedUserId).lean();
                    relatedUsers.push(relatedUser);
                }
            }

            res.render(`${path}/historyPatient`, {
                layout: "manager/main",
                tag: "patient",
                patient,
                managementHistory,
                relatedUsers
            })
        } catch (err) {
            console.log(err.message);
            res.render("error/500");
        }
    },

    updatePatient: async (req, res) => {
        try {
            const id = req.params.id;
            let patient = await Account.findById(id);
            if (!patient) {
                return res.status(400).json({
                    status: 'Bad Request',
                    message: 'Không tìm thấy bệnh nhân',
                    errorCode: "PATIENT_NOT_FOUND",
                })
            }

            if (req.body.state === 'F3') {
                return res.status(400).json({
                    status: 'Bad Request',
                    message: 'F3 không cần thêm người liên quan',
                    errorCode: "INVALID_DATA"
                })
            }

            const isNewState = patient.state !== req.body.state;
            const oldQuarantine = patient.quarantineLocation.toString() !== req.body.quarantineLocation ? patient.quarantineLocation : null;

            if (oldQuarantine) {
                const quarantineLocation = await QuarantineLocation.findById(req.body.quarantineLocation);
                if (quarantineLocation.patientsNumber >= quarantineLocation.capacity) {
                    return res.status(400).json({
                        status: 'Bad Request',
                        message: 'Đã đạt giới hạn số bệnh nhân trong khu vực',
                        errorCode: 'QUARANTINE_LOCATION_FULL',
                    });
                }
            }

            await patient.updateOne({
                $set: {
                    displayName: req.body.displayName,
                    cardID: req.body.cardID,
                    dateOfBirth: req.body.dateOfBirth,
                    address: {
                        province: req.body.province,
                        district: req.body.district,
                        ward: req.body.ward,
                    },
                    state: req.body.state,
                    quarantineLocation: req.body.quarantineLocation,
                }
            });

            // update quarantine location
            if (oldQuarantine) {
                const oldQuarantineLocation = await QuarantineLocation.findById(oldQuarantine);
                oldQuarantineLocation.patientsNumber -= 1;
                await oldQuarantineLocation.save();

                const newQuarantineLocation = await QuarantineLocation.findById(req.body.quarantineLocation);
                newQuarantineLocation.patientsNumber += 1;
                await newQuarantineLocation.save();
            }

            // update related user
            const oldRelates = req.body.oldRelates ? req.body.oldRelates.split(', ').map((item) => parseInt(item)) : [];
            const newRelates = req.body.relates ? req.body.relates.split(', ').map((item) => parseInt(item)) : [];
            const oldRelatesNotNewRelates = oldRelates.filter(item => !newRelates.includes(item));
            const newRelatesNotOldRelates = newRelates.filter(item => !oldRelates.includes(item));
            const relatesInBoth = oldRelates.filter(item => newRelates.includes(item));

            if (!isNewState && req.body.oldRelates !== req.body.relates) {
                // with oldRelatesNotNewRelates, each item in oldRelatesNotNewRelates is removed from relatedUsers has userId = id
                for (let i = 0; i < oldRelatesNotNewRelates.length; i++) {
                    await RelatedUser.deleteOne({ userId: id, relatedUserId: oldRelatesNotNewRelates[i] });
                }

                // with newRelatesNotOldRelates, each item in newRelatesNotOldRelates is added to relatedUsers has userId = id
                for (let i = 0; i < newRelatesNotOldRelates.length; i++) {
                    await RelatedUser.create({ userId: id, relatedUserId: newRelatesNotOldRelates[i], stateRelatedUser: utils.getNextStateRelated(req.body.state) });

                    let relatedAccount = await Account.findById(newRelatesNotOldRelates[i]);
                    if (utils.compareState(relatedAccount.state, utils.getNextStateRelated(req.body.state))) {
                        relatedAccount.state = utils.getNextStateRelated(req.body.state);
                        await relatedAccount.save();
                    }
                }
            }

            if (isNewState) {
                // add this patient relate to itself
                let relate = new RelatedUser({
                    userId: null,
                    relatedUserId: id,
                    stateRelatedUser: req.body.state
                });
                await relate.save();

                // with oldRelatesNotNewRelates, each item in oldRelatesNotNewRelates is removed from relatedUsers has userId = id
                for (let i = 0; i < oldRelatesNotNewRelates.length; i++) {
                    await RelatedUser.deleteOne({ userId: id, relatedUserId: oldRelatesNotNewRelates[i] });
                }

                // with newRelatesNotOldRelates, each item in newRelatesNotOldRelates is added to relatedUsers has userId = id
                for (let i = 0; i < newRelatesNotOldRelates.length; i++) {
                    await RelatedUser.create({ userId: id, relatedUserId: newRelatesNotOldRelates[i], stateRelatedUser: utils.getNextStateRelated(req.body.state) });

                    let relatedAccount = await Account.findById(newRelatesNotOldRelates[i]);
                    if (utils.compareState(relatedAccount.state, utils.getNextStateRelated(req.body.state))) {
                        relatedAccount.state = utils.getNextStateRelated(req.body.state);
                        await relatedAccount.save();
                    }
                }

                // with relatesInBoth, each item in relatesInBoth is updated
                for (let i = 0; i < relatesInBoth.length; i++) {
                    await RelatedUser.updateOne({ userId: id, relatedUserId: relatesInBoth[i] }, { stateRelatedUser: utils.getNextStateRelated(req.body.state) });

                    let relatedAccount = await Account.findById(relatesInBoth[i]);
                    if (utils.compareState(relatedAccount.state, utils.getNextStateRelated(req.body.state))) {
                        relatedAccount.state = utils.getNextStateRelated(req.body.state);
                        await relatedAccount.save();
                    }
                }
            }

            res.status(200).json({
                status: 'success',
                message: 'Cập nhật thông tin bệnh nhân thành công',
                data: patient,
            });
        } catch (err) {
            console.log(err.message);
            res.status(500).json({
                status: 'Server Error',
                message: err.message,
                errorCode: 'SERVER_ERROR',
            });
        }
    },

    deletePatient: async (req, res) => { },

    statisticsPatient: async (req, res) => {
        let relatedUsers = await RelatedUser.find({}).lean();

        relatedUsers = relatedUsers.map((item) => {
            let month = item.updatedAt.getMonth() + 1;
            if (month < 10) {
                month = `0${month}`;
            }
            let year = item.updatedAt.getFullYear();
            return {
                relatedUserId: item.relatedUserId,
                stateRelatedUser: item.stateRelatedUser,
                date: `${month}/${year}`,
            };
        });

        const states = ['Khỏi bệnh', 'F0', 'F1', 'F2', 'F3']
        let result = {};
        states.forEach(state => {
            result[state] = {
                '01/2022': 0,
                '02/2022': 0,
                '03/2022': 0,
                '04/2022': 0,
                '05/2022': 0,
                '06/2022': 0,
                '07/2022': 0,
            };
            relatedUsers.forEach(relate => {
                if (relate.stateRelatedUser === state) {
                    result[state][relate.date] += 1;
                }
            })
        })

        res.json({ status: 'success', data: result });

    },
};

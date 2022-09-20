const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");
const _ = require("lodash");
const moment = require("moment");
const object = require("joi/lib/types/object");
const subjectSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    type: {
        type: String,
        default: "",
    },
});
subjectSchema.plugin(timestamps);
subjectSchema.methods.toJSON = function () {
    const subject = this;
    const subjectObject = subject.toObject();
    const subjectJson = _.pick(subjectObject, [
        "_id",
        "title",
        "type",
        "createdAt",
        "updatedAt",
    ]);
    subjectJson.createdAt = moment(subjectJson.createdAt).format(
        "DD:MM:YYYY hh:mm:ss a"
    );
    subjectJson.updatedAt = moment(subjectJson.updatedAt).format(
        "DD:MM:YYYY hh:mm:ss a"
    );
    return subjectJson;
};
const Subject = mongoose.model("Subject", subjectSchema);
exports.Subject = Subject;

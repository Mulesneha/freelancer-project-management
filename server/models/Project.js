const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },

        description: {
            type: String,
            required: true
        },

        budget: {
            type: Number,
            required: true
        },

        status: {
            type: String,
            enum: ["pending", "active", "completed"],
            default: "pending"
        },

        client: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },

        freelancer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Project", projectSchema);
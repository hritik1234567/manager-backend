const mongoose = require('mongoose');

// Define the schema for health metrics
const healthMetricSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
     },
    date: {
        type: Date,
        required: true
    },
    temperature: {
        type: String, // Store as a string to include units (e.g., '37.5 °C')
        required: true
    },
    bloodPressure: {
        type: String, // Store as a string to include both systolic and diastolic values (e.g., '120/80')
        required: true
    },
    heartRate: {
        type: Number, // Store heart rate as a number (bpm)
        required: true
    }
}, {
    timestamps: true // Automatically add createdAt and updatedAt timestamps
});

// Create the model from the schema
const HealthMetric = mongoose.model('HealthMetric', healthMetricSchema);

module.exports = HealthMetric;

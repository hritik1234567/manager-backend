const HealthMetric = require("../models/dataModel"); // Import the HealthMetric model
const mongoose=require("mongoose");
// Controller function to handle form data
const formController = async (req, res) => {
    try {
        // Extract data from the request body
        const { date, temperature, bloodPressure, heartRate } = req.body;

        // Ensure user is authenticated and user ID is available
        const userId = req.user.id; // This assumes `req.user` contains the authenticated user's details
        
        // Create a new health metric record
        const newMetric = new HealthMetric({
            user: userId,
            date,
            temperature,
            bloodPressure,
            heartRate
        });

        // Save the record to the database
        await newMetric.save();

        // Respond with success message
        res.status(201).json({ message: "Health record added successfully", data: newMetric });
    } catch (error) {
        // Respond with error message
        console.error(error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}
const getmetricController = async (req, res) => {
    try {
        //user: req.user.id
    
        const metrics = await HealthMetric.find({ user: req.user.id});

        res.json(metrics);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
}
const updatemetricController = async (req, res) => {
    try {
        // Extract data from the request body
        const { date, temperature, bloodPressure, heartRate } = req.body;
        const newMetric = {}; // Correct variable name

        // Add fields to newMetric if they exist
        if (date) {
            newMetric.date = date;
        }
        if (temperature) {
            newMetric.temperature = temperature;
        }
        if (bloodPressure) {
            newMetric.bloodPressure = bloodPressure;
        }
        if (heartRate) {
            newMetric.heartRate = heartRate;
        }

        // Find the metric by ID
        //req.params.id
        let metric = await HealthMetric.findById(req.params.id);
        if (!metric) {
            return res.status(404).send("Metric not found");
        }

        // Check if the metric belongs to the user
        if (metric.user.toString() !== req.user.id.toString()) {
            return res.status(401).send("Not authorized to update this record");
        }

        // Update the metric
        
        metric = await HealthMetric.findByIdAndUpdate(req.params.id, { $set: newMetric }, { new: true });

        // Respond with the updated metric
        res.json({ metric });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: "Server error", error: error.message });
    }
}
const deletemetricController=async(req,res)=>{
    try {
        const { id } = req.params;
       
    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ error: 'Invalid ObjectId' });
        
    }

    let metric = await HealthMetric.findById(id);
    
    if (!metric) { return res.status(404).send("Not found") }
    //if (metric.user.toString() !== req.user.id) { return res.status(401).send("Cannot be Deleted") }
    //req.params.id
    metric = await HealthMetric.findByIdAndDelete(id);
    res.json({ "Succesfully deleted the note": "Yaadein mit gyi" });
    } catch (error) {
        
    }
}
module.exports = {
    formController,
    getmetricController,
    updatemetricController,
    deletemetricController
};

const School = require('../models/school');
const haversine = require('haversine-distance');

// Add School
const addSchool = async (req, res) => {
  try {
    const { name, address, latitude, longitude } = req.body;

    // Validation
    if (!name || !address || !latitude || !longitude) {
      return res.status(400).json({ msg: 'Please enter all fields' });
    }

    // Create and save the new school
    const newSchool = new School({
      name,
      address,
      latitude,
      longitude,
    });

    await newSchool.save();
    res.status(201).json(newSchool);
  } catch (error) {
    res.status(500).json({ msg: 'Server Error' });
  }
};

// List Schools
const listSchools = async (req, res) => {
  try {
    const { userLat, userLong } = req.query;

    if (!userLat || !userLong) {
      return res.status(400).json({ msg: 'Please provide your location' });
    }

    const schools = await School.find();

    // Calculate distance and sort
    const sortedSchools = schools.sort((a, b) => {
      const distanceA = haversine(
        { lat: userLat, lng: userLong },
        { lat: a.latitude, lng: a.longitude }
      );
      const distanceB = haversine(
        { lat: userLat, lng: userLong },
        { lat: b.latitude, lng: b.longitude }
      );
      return distanceA - distanceB;
    });

    res.status(200).json(sortedSchools);
  } catch (error) {
    res.status(500).json({ msg: 'Server Error' });
  }
};

module.exports = { addSchool, listSchools };

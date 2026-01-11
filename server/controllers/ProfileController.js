//Add a new profile
const Profile = require('../models/Profile');
const User = require('../models/User');

const addProfile = async (req, res) => {
     try {
     const { name, phone, location, role, skills} = req.body;
     
     // Check if profile already exists
     const existingProfile = await Profile.findOne({ vin });
     if (existingProfile) {
          return res.status(400).json({ message: 'Profile already exists' });
     }
     
     // Create new profile
     const profile = await Profile.create({
          name, 
          phone, 
          location, 
          role,
          skills},
          owner: req.user._id, // Set the owner to the authenticated user
     });
     
     res.status(201).json(profile);
     } catch (error) {
     console.error(error);
     res.status(500).json({ message: 'Server error' });
     }
     }         
// Get all profiles
const getAllProfiles = async (req, res) => {
     try {
     const profiles = await Profile.find().populate('owner', 'name email');
     res.status(200).json(profiles);
     } catch (error) {
     console.error(error);
     res.status(500).json({ message: 'Server error' });
     }
};
// Get profile by ID
const getProfileById = async (req, res) => {
     try {
     const profile = await Profile.findById(req.params.id).populate('owner', 'name email');
     if (!profile) {
          return res.status(404).json({ message: 'Profile not found' });
     }
     res.status(200).json(profile);
     } catch (error) {
     console.error(error);
     res.status(500).json({ message: 'Server error' });
     }
};
// Update profile
const updateProfile = async (req, res) => {
     try {
     const { vin, make, model, year } = req.body;
     
     const profile = await Profile.findByIdAndUpdate(
          req.params.id,
          { vin, make, model, year },
          { new: true }
     );
     
     if (!profile) {
          return res.status(404).json({ message: 'Profile not found' });
     }
     
     res.status(200).json(profile);
     } catch (error) {
     console.error(error);
     res.status(500).json({ message: 'Server error' });
     }
};
// Delete profile
const deleteProfile = async (req, res) => {
     try {
     const profile = await Profile.findByIdAndDelete(req.params.id);
     if (!profile) {
          return res.status(404).json({ message: 'Profile not found' });
     }
     res.status(200).json({ message: 'Profile deleted successfully' });
     } catch (error) {
     console.error(error);
     res.status(500).json({ message: 'Server error' });
     }
};
// Get profiles by owner
const getProfilesByOwner = async (req, res) => {
     try {
     const profiles = await Profile.find({ owner: req.user._id }).populate('owner', 'name email');
     res.status(200).json(profiles);
     } catch (error) {
     console.error(error);
     res.status(500).json({ message: 'Server error' });
     }
};


// Export all functions
module.exports = {
     addProfile,
     getAllProfiles,
     getProfileById,
     updateProfile,
     deleteProfile,
     getProfilesByOwner,
};

// routes
// const express = require('express');
const router = express.Router();
const {
  getAllProfiles,
  createProfile,
  getProfileById,
  updateProfile,
  deleteProfile,
} = require('../controllers/profileController');

//create profile
router.post('/', createProfile);
// Get all profiles
router.get('/', getAllProfiles);
// Get profile by ID
router.get('/:id', getProfileById);
// Update profile
router.put('/:id', updateProfile);
// Delete profile
router.delete('/:id', deleteProfile);
// Export the router
module.exports = router;
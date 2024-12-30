import { User } from "../models/user.model.js";
/**
 * Updates the profile picture URL for a user.
 * @param userId - ID of the user to update.
 * @param profilePicUrl - URL of the uploaded profile picture.
 */
export const updateProfilePic = async (userId, profilePicUrl) => {
    return User.findByIdAndUpdate(userId, { profilePicUrl }, { new: true } // Return the updated document
    );
};

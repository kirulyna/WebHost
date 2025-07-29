import User from '../../models/userModel.js';
import Credentials from '../../models/credentialsModel.js';

// GET /api/admin/users - összes user (admin jogosultsággal)
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE /api/admin/users/:id - user törlése (admin jogosultsággal)
export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    await User.findByIdAndDelete(userId);
    await Credentials.deleteOne({ userID: userId });
    res.json({ message: 'Employee removed successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/admin/bosses - összes boss (admin jogosultsággal)
export const getAllBosses = async (req, res) => {
  try {
    const bosses = await User.find({ role: 'boss' });
    res.json(bosses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
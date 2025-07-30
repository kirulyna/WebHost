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

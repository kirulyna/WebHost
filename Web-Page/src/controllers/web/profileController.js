import User from '../../models/userModel.js';

export const renderDriverProfile = async (req, res) => {
  try {
    const driver = await User.findById(req.params.id);
    if (!driver || driver.role !== 'driver') {
      return res.status(404).send('Driver not found');
    }
    res.render('driverProfile', {
      title: driver.name + ' Profile',
      driver: driver
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};

export const renderBossProfile = async (req, res) => {
  try {
    const boss = await User.findById(req.params.id);
    if (!boss || boss.role !== 'boss') {
      return res.status(404).send('Boss not found');
    }
    res.render('bossProfile', {
      title: boss.name + ' Profile',
      boss: boss
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};
export const Dashboard = (req, res) => {
  const user = req.user;
  res.render("backend/dashboard");
};

export const ProfilePage = (req, res) => {
  res.render("backend/profile/profilePage");
};

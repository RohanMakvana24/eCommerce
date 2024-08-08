export const Dashboard = (req, res) => {
  const user = req.user;
  res.render("backend/dashboard", { user: user });
};

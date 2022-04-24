module.exports = {
    get: (req, res) => {
        res.render("layouts/sites/home", {
            layout: "sites/main",
        });
    },
    signIn: (req,res) => {
        res.render("layouts/sites/login");
    },
    signUp: (req,res) => {
        res.render("layouts/sites/signup");
    }
};

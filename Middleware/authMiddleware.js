const auth = (req, res, done) =>{
    if(req.user){
        return done();
    }
    res.json("you have not permission to access this");
}

module.exports = {
    auth
}
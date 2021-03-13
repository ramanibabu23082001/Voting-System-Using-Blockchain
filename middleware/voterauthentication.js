module.exports=(req,res,next)=>{
    if(!req.session.voter){
    return res.redirect('/voterlogin/');}
    if(!req.session.isLoggedIn){
    return res.redirect('/voterlogin/');}
    next();
    }
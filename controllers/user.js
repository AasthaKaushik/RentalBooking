const User = require("../models/user");

module.exports.renderSinupForm = (req,res)=>{
    res.render("users/signup.ejs");
 }


module.exports.signup= async(req,res)=>{
    try{    
    let {username, email,password}= req.body; 
    const newUser= new User({email,username});
   const registeredUser= await User.register(newUser ,password);
   console.log(registeredUser);
   // to auto login after signUp
   req.login(registeredUser,(err)=>{
    if(err){
        return next(err);
    }
    req.flash("success","Welcome to wanderlust");
   res.redirect("/listings");
   })
    }catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }
} 

module.exports.renderLoginForm = (req,res)=>{
    res.render("users/login.ejs");
}

module.exports.login = async(req,res)=>{
    req.flash("success","Welcome back to WanderLust !! you are logged in");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
}

module.exports.logout= (req,res)=>{
    req.logout((err)=>{
        if(err){
            next(err);
        }
        req.flash("success","You have been logged out successfully!!!");
        res.redirect("/listings");
    })
}
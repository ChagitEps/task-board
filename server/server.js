require("dotenv").config()
const mongoose=require("mongoose")
const conectDB=require("./config/dbConn")
const express=require("express")
const cors=require("cors")
const corsOptions=require("./config/corsOptions")
const session = require("express-session");
const passport = require("passport");
require("./config/passport"); // נגדיר את זה עוד רגע

const PORT=process.env.PORT||2023
const app=express()
conectDB()
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.static("public"))
// app.use('/api/users',require("./routes/UserRoute"))
app.use('/api/auth',require("./routes/AuthRoute"))
app.use('/api/task',require("./routes/TaskRoute"))
app.use('/api/functionToken',require("./middleware/verifyJWT"))
// Session middleware
app.use(session({
  secret: "secret123",
  resave: false,
  saveUninitialized: false
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
app.get("/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"],  prompt: 'select_account'
 })
);

app.get("/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login", session: true }),
  (req, res) => {
    const name = req.user._googleProfile?.name;
    const picture = req.user._googleProfile?.picture;

    res.redirect(`http://localhost:3000/google-success?email=${req.user.email}&name=${encodeURIComponent(name)}&picture=${encodeURIComponent(picture)}`);
  }
);



app.use((req,res)=>{
    res.status(404).send("not defind")
})
mongoose.connection.once("open",()=>{
    console.log("conect to mongoDB")
    app.listen(PORT,()=>{
        console.log(`running on port ${PORT}`)
    })
})
mongoose.connection.on("error",(err)=>{
    console.log("error")
    console.log(err)
})
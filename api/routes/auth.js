const { getFirestore, Timestamp} = require('firebase-admin/firestore');
const router = require("express").Router();
const bcrypt = require("bcrypt");
const db = getFirestore();
router.post("/register",async(req,res)=>{
    try {
        if (req.body.password.length<8){
            return res.status(400).json("password must be 8 characters or more")
        }
        const user = db.collection("Users")
        const snapshot2 = await user.where("email", "==", req.body.email)
        .get();
        const snapshot3 = await user.where("username", "==", req.body.username)
        .get();
        if(!snapshot2.empty ||!snapshot3.empty ) return res.status(400).json("email and name is not available")
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(req.body.password,salt);
        // const newUser = {
        //     username:req.body.username,
        //     email:req.body.email,
        //     password:hashed,
        //     profile:"",
        //     createdAt:Timestamp.fromDate(new Date())
        // }
        const users =await db.collection("Users").add({
                username:req.body.username,
                email:req.body.email,
                password:hashed,
                profile:"",
                createdAt:Timestamp.fromDate(new Date())
            })
        const response = await users.get()
        const {password,...others} = response.data();
        others._id =response.id
     
        // console.log(response.data());
        // const respone  = await resp.get()
        res.status(200).json({data:others})
        
    } catch (error) {
        console.log(error);
        res.status(500).json("something went wrong try again")
    }
})

router.post("/login",async(req,res)=>{
    console.log("login");
    try {
        const user = db.collection("Users")
        const snapshot = await user.where("email",'==',req.body.email).get();
        if(snapshot.empty){
           return res.status(400).json("wrong credentials")
        }
      
        const time = snapshot.docs[0].data().createdAt;
        const date = new Date(time._seconds*1000+time._nanoseconds/1000000)
        console.log(date);
        const options = {timeZone: 'Asia/Karachi', hour12: true, month: '2-digit',year: 'numeric',  day: '2-digit', hour: '2-digit', minute:'2-digit', second:'2-digit'};
        const formattedDate = date.toLocaleString('en-US', options).replace(/\//g, '-');

        const validate = await bcrypt.compare(req.body.password,snapshot.docs[0].data().password)
        if(!validate) return res.status(400).send("Wrong credentials")
        
       const {password,createdAt,...others} = snapshot.docs[0].data()
       const id = snapshot.docs[0].id
        const response = {
            _id:id,
            createdAt:formattedDate,
            ...others
        }
        res.status(200).json(response)
        
    } catch (error) {
        console.log(error);
        res.status(500).json("something wrong")
    }
})

module.exports  = router
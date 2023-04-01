const router = require("express").Router();
const { getFirestore, Timestamp} = require('firebase-admin/firestore');
const db = getFirestore();
const bcrypt = require("bcrypt");


router.put("/:id",async(req,res)=>{
    console.log(req.body);
    if(req.body.userId===req.params.id){
        if(req.body.password){
            const salt = await bcrypt.genSalt(10);
            req.body.password =await bcrypt.hash(req.body.password,salt)
        }
        try {
            const {userId,...others} = req.body
            await db.collection("Users").doc(req.params.id).update({
                ...others
            })
            res.status(200).json("updated")

        } catch (error) {
            
            res.status(500).json("something went wrong")
        }
    }
    else {
        res.status(401).json("You can update only your account!");
      }

})

router.delete("/:id", async (req, res) => {
    if (req.body.id === req.params.id) {
      try {
        const cityRef = db.collection('Users').doc(req.params.id);
        const doc = await cityRef.get();
        if (!doc.exists) {
           return res.status(404).json("user not found");
        } else {
        console.log('Document data:', doc.data());
        }
         const snapshot = await db.collection("Posts").where("username","==",doc.data().username).get();
         if (!snapshot.empty) {

          snapshot.forEach(doc => {
            // console.log(doc.id, '=>', doc.data());
            
            if(doc.data()){
              db.collection("Posts").doc(doc.id).delete().then((e)=>{
                console.log(e);
                console.log("deleted");
              })
              posts.push({id:doc.id, data:doc.data()})
            }
          });
        }  
        
      
        try {
          await db.collection('Users').doc(req.params.id).delete();  
          res.status(200).json("User has been deleted...");
        } catch (err) {
          res.status(500).json(err);
        }
      } catch (err) {
        res.status(404).json("User not found!");
      }
    } else {
      res.status(401).json("You can delete only your account!");
    }
  });


  router.get("/:id", async (req, res) => {
    try {
    //   const user = await User.findById(req.params.id);
        const cityRef = db.collection('Users').doc(req.params.id);
        const doc = await cityRef.get();
        if (!doc.exists) {
           return res.status(404).json("not found");
        } else {
        console.log('Document data:', doc.data());
        }
      const { password, ...others } = doc.data();
      const id = doc.id;
      const data= {id:id,data:others} 
      if(doc.data()){
      return res.status(200).json(data);
    
      }
      
        res.status(404).json("not found");
    
   } catch (err) {
      res.status(500).json(err);
    }
  });


  module.exports = router
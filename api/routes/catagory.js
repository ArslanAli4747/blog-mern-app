const router = require("express").Router();
const { getFirestore, Timestamp} = require('firebase-admin/firestore');
const db = getFirestore();

router.post("/",async(req,res)=>{

    try {
        const cat = db.collection("Category")
        const snapshot = await cat.where("category", "==", req.body.category)
        .get();
        if(!snapshot.empty){
            return res.status(400).json("duplicate entry")
        }
        const resp = await db.collection("Category").add({
          category:req.body.category  
        })
        res.status(200).json({data:"category added"})
        
    } catch (error) {
        res.status(500).json({error:error})
    }
    
})


router.get("/",async(req,res)=>{

    try {
        
        const cat =  db.collection("Category");
        const snapshot = await cat.get();
        let respone = []
        if(snapshot.empty){
            return res.status(200).json(respone)
        }
        

        snapshot.forEach(doc => {
            console.log(doc.id, '=>', doc.data());
            respone.push(doc.data())
          }); 
        
        res.status(200).json({data:respone})
        
    } catch (error) {
        res.status(500).json({error:error})
    }
    
})

module.exports = router
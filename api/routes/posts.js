const router = require("express").Router();
//CREATE POST
const { getFirestore, Timestamp} = require('firebase-admin/firestore');
const db = getFirestore();
router.post("/", async (req, res) => {
    // const newPost = new Post(req.body);
    try {
        let image = "";
        if(req.body.image){
          image = req.body.image
        }
    //   const savedPost = await newPost.save();
        const savedPost = await db.collection("Posts").add({
            tittle:req.body.tittle,
            description:req.body.description,
            username:req.body.username,
            image:image,
            createdAt:Timestamp.fromDate(new Date())
        });
      const dat= (await savedPost.get())
      const data = dat.data();
      const id = dat.id;
      res.status(200).json({id,data});
    } catch (err) {
      res.status(500).json("error");
    }
  });


  router.put("/:id", async (req, res) => {
    try {
      const p = await db.collection("Posts").doc(req.params.id).get();
      const post  = p.data()
      if (post.username === req.body.username) {
        try {
          const updatedPost = await db.collection("Posts").doc(req.params.id).update(
            {
                ...req.body
            }
          );
          
          
          console.log(updated);
          res.status(200).json("updated");
        } catch (err) {
          console.log(err);
          res.status(500).json(err);
        }
      } else {
        res.status(401).json("You can update only your post!");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.delete("/:id", async (req, res) => {
    try {
      const post =  (await db.collection("Posts").doc(req.params.id).get()).data();
      if (post.username === req.body.username) {
        try {
          await db.collection("Posts").doc(req.params.id).delete();
          res.status(200).json("Post has been deleted...");
        } catch (err) {
          res.status(500).json(err);
        }
      } else {
        res.status(401).json("You can delete only your post!");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });



  router.get("/:id", async (req, res) => {
    try {
      const post =  (await db.collection("Posts").doc(req.params.id).get());
      const id =post.id;
      const response = post.data()
      let data = {}
      if(response){
        data= {id:id,data:response}
      }
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  //GET ALL POSTS
  router.get("/", async (req, res) => {
    const username = req.query.user;
    const catName = req.query.cat;
    try {
      let posts = [];
     if(catName && username ){
      const citiesRef = db.collection('Posts');
      const snapshot = await citiesRef.get();
      snapshot.forEach(doc => {
        // console.log(doc.id, '=>', doc.data());
          if(doc.data()){
            posts.push({id:doc.id, data:doc.data()})
          }
      });
      posts = posts.filter((p)=>{
        if(p.data.username === username && p.data.category === catName){
          return p
        }
      })
      return res.status(200).json(posts);
     }
      if (username ) {
            // console.log("in if");
            // posts = await Post.find({ username });
            const citiesRef = db.collection('Posts');
            const snapshot = await citiesRef.where('username', '==', username).get();
            if (snapshot.empty) {
                // console.log('No matching documents.');
                return res.status(404).json("not found");
              }  
              
              snapshot.forEach(doc => {
                // console.log(doc.id, '=>', doc.data());
                if(doc.data()){
                  posts.push({id:doc.id, data:doc.data()})
                }
              });
      } 
       if (catName) {
         
          const citiesRef = db.collection('Posts');
          const snapshot = await citiesRef.where('category', '==', catName).get();
          if (snapshot.empty) {
              // console.log('No matching documents.');
              return res.status(404).json("not found");
            }  
            
            snapshot.forEach(doc => {
              // console.log(doc.id, '=>', doc.data());
              if(doc.data()){
                posts.push({id:doc.id, data:doc.data()})
              }
            });
      } 
      if(!catName && !username) {
        // console.log("in else");
          const citiesRef = db.collection('Posts');
          const snapshot = await citiesRef.get();
          snapshot.forEach(doc => {
            // console.log(doc.id, '=>', doc.data());
            if(doc.data()){
              posts.push({id:doc.id, data:doc.data()})
            }
          });
      }
    
      // 
      res.status(200).json(posts);
    } 
    catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });
  
  module.exports = router;
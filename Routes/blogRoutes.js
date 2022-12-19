 const express = require ('express')
 const router = express.Router()
 const collectionRef = require('../configuration/firebaseConfig');
 const {msgJson,update} = require('../utils/utils')




 router.post("/create", (req, res) => {
    console.log(req.body)
    collectionRef
      .add({
        firstname: `${req.body.firstname}`,
        lastname: `${req.body.lastname}`,
        comment: `${req.body.comment}`,
      })
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        res
          .status(200)
          .json({ message: `Document written with ID: ${docRef.id}` });
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  });
 
  router.get("/getcomments", (req, res) => {
    collectionRef.get().then((snapshot) => {
      let comments = [];
      snapshot.docs.forEach((doc) => {
        comments.push({ ...doc.data(), id: doc.id });
      });
      res.status(200).send(comments);
    });
  });
 
  router.delete("/delete/:id", (req, res) => {
    let ID = req.params.id;
    let found = false
 
    collectionRef.get().then((snapshot) => {
      snapshot.forEach((blog)=>{
     if(blog.id === ID){
       found = true;
     }
      })
     
      if(found){
         collectionRef
         .doc(`${req.params.id}`)
         .delete()
         .then((doc) => {
          return msgJson(req, res, 200, "blog deleted successfully");
         })
         .catch(() => {
           
         });
     }else{
       return msgJson(req, res, 500, `error deleting blog: blog with ID: ${ID} not found`); 
     }
    
 })
  })
    
 
  router.patch("/update/:id", (req, res) => {
     let ID = req.params.id;
     let document;
     collectionRef.doc(`${ID}`).get().then((data)=>{
         
     update(collectionRef,req,res,ID,data,msgJson)
         
   })
   .catch(()=>{
    return msgJson(req, res, 500, `error updating blog: blog with ID: ${ID} not found`)
   })

        })

        module.exports = router;
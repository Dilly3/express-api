const msgJson = (req,res,code, message)=>{
    return res.status(code).json({"message":`${message}`})
    
 }

 const update = (collectionRef,req,res,id,data,msgjson)=>{
    collectionRef
    .doc(`${id}`)
    .update({
        firstname: `${req.body.firstname?req.body.firstname:data.data().firstname}`,
        lastname:   `${req.body.lastname?req.body.lastname:data.data().lastname}`,
       comment:     `${req.body.comment?req.body.comment:data.data().comment}`
   }).then(() => {
   return msgjson(req, res, 500, `document with ID: ${id} updated`);
    }).catch(()=>{
          return msgjson(req, res, 500, `document with : ${id} does not exist`);
        })      
}

 module.exports = {msgJson,update};
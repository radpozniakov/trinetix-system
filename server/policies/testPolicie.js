module.exports = function (req, res, next) { 
  const {name, email} = req.body
  if (name === "Rad Poznyakov"){
    next() 
  }else{
    res.status(400).send("Error")
  }
}
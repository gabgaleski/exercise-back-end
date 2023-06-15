const verifyId = async (req, res, next) => {
  const homeBody = req.body;
  const containId = ['title'];
  const haveId = containId.every((property) => property in homeBody);
  
  if(!haveId) return res.status(400).json({message: 'Error, nao possui title'})

  next();
}

module.exports = verifyId;
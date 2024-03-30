const mongoose = require('mongoose')
const id = new mongoose.Types.ObjectId();

//console.log(id.getTimestamp())

//console.log(id)


const oid = "6607b8f4d9d9c9e60198e745"

const isvalid = mongoose.Types.ObjectId.isValid(oid)


console.log(isvalid)

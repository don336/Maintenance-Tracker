import mongoose from "mongoose"

const requestSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  approved: {
    type: Boolean
  },
  resolved: {
    type: Boolean
  }
})

export default mongoose.model("Request", requestSchema)
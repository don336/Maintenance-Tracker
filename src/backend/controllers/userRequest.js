import { v4 as uuidv4 } from "uuid";
import Request from "../model/request.js"

class controllers {
  static  async getRequests (req, res) {
    try {
      const requests = await Request.find()

      return res.status(200).json({
        Title: "Requests",
        requests: requests
      })
    }
    catch(err) {
      return res.status(200).json({
        msg: err
      })
    }
  }

  static async getRequest (req, res) {
    try {
      const { id } = req.params

      const request = await Request.findById(id)

      return res.status(200).json({
        Title: "Request",
        request: request
      })
    }
    catch(err){
      return res.status(400).json({
        message: "Cannot find request"
      })
    }
  }

  static async createRequest (req, res){
    try {
      const { title, description } = req.body

      const newReq = await Request.create({
        requestId: uuidv4(),
        title,
        description
      })

      return res.status(201).json(newReq)
    }
    catch(err){
      return res.status(400).json({
        msg: err
      })
    }
  }

  static async updateRequest (req, res){
    try {
      const { id } = req.params
      const { title, description } = req.body

      const updateReq = await Request.updateOne(
        {_id:id},
        {$set: 
          {
            title: title,
            description: description
          }
      },
      {new: true}
        )
        return res.status(201).json({
          message: "Request updated successfully"
        })
    }
    catch(err){
      return res.status(400).json({
        err: "Request not found"
      })
    }
  }
}

export default controllers
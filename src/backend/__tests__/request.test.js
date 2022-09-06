import request from "supertest"
import app from "../index.js"

const baseUrl = "/api/v1/users/requests"
describe("Get /requests", function(){
  const req = {
    title: "request",
    description: "first Request"
  }

  beforeAll(async function () {
     await request(app).post(baseUrl).send(req)

  })

  it("should return requests", async () =>{
    
    const response  = await request(app).get(baseUrl).send({});

    expect(response.status).toBe(200);

    expect(response.body).toEqual(expect.arrayContaining([]));
  })

  it("should return a request", async () => {
    const newReq =  await request(app).post(baseUrl).send(req)
       const id = newReq.body._id

    const response = await request(app).get(`/api/v1/users/requests/${id}`)

    expect(response.status).toBe(200)
    expect(response.body).toEqual(expect.objectContaining({
      Title: "Request",
      request: {
        __v: 0,
        _id: id,
        title: "request",
        description: "first Request"
      }
    }))
  })

  it("should return an error message if the question doesn't exist", async ()=>{

    const response = await request(app).get(`/api/v1/users/requests/invalid`)

    expect(response.status).toBe(400)
    expect(response.body).toEqual({
      message: "Cannot find request"
    })
  })

  it("should post a request", async ()=> {
    const response = await request(app).post(baseUrl).send({
      title: "second request",
      description: "this is my second request"
    })

    const id  = response.body._id

    expect(response.status).toBe(201)
    expect(response.body).toEqual({
      title: "second request",
      description: "this is my second request",
      __v: 0,
      _id: id
    })
  })

  it("should update a request", async ()=>{
    const newReq =  await request(app).post(baseUrl).send(req)
       const id = newReq.body._id

    const response = await request(app).put(`/api/v1/users/requests/${id}`)

    expect(response.status).toBe(201)
    expect(response.body).toEqual({
      message: "Request updated successfully"
    })
  })
  
  it("shouldn't update a request but return an err message", async ()=>{

    const response = await request(app).put(`/api/v1/users/requests/invalidId`)

    expect(response.status).toBe(400)
    expect(response.body).toEqual({
      err: "Request not found"
    })
  })
})

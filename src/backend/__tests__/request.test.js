import request from "supertest"
import app from "../index.js"

const baseUrl = "/api/v1/users/requests/"
describe("Get /requests", function(){
  const req = {
    title: "request",
    description: "first Request"
  }

  const user = {
    name: "userman",
    username: "user1",
    email: "user1@gmail.com",
    password: "user12322"
  }

  beforeAll(async function () {
     await request(app).post(baseUrl).send(req)
     await request(app).post('/api/v1/auth/user/signup').send(user)
     
  })

  afterAll(async function () {
    await request(app).deleteMany(`/api/v1/auth/user/signup`);
    await request(app).deleteMany(baseUrl);
  });

  it("should return requests", async () =>{
    
    const response  = await request(app).get(baseUrl).send({});

    expect(response.status).toBe(200);

    expect(response.body).toEqual(expect.arrayContaining([]));
  })

  it("should return a request", async () => {
    const login = await request(app).post('/api/v1/auth/user/login').send({
      email:"user1@gmail.com",
      password:"$2b$08$y4WWa5E47iccuuGv6apu4Oa3nEBHF7vDnNdlkCH7A5mmSj1hrS2.m"
    })
    const token = login.body.token
    const newReq =  await request(app).post(baseUrl).set("Authorization", token).send(req)
       const id = newReq.body._id
    const response = await request(app).get(`/api/v1/users/requests/${id}`).set("Authorization", token).send({})

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
    const login = await request(app).post('/api/v1/auth/user/login').send({
      email:"user1@gmail.com",
      password:"$2b$08$y4WWa5E47iccuuGv6apu4Oa3nEBHF7vDnNdlkCH7A5mmSj1hrS2.m"
    })
    const token = login.body.token
    const response = await request(app).get(`/api/v1/users/requests/invalid`).set('Authorization', token).send({})

    expect(response.status).toBe(400)
    expect(response.body).toEqual({
      message: "Cannot find request"
    })
  })

  it("should post a request", async ()=> {
    const login = await request(app).post('/api/v1/auth/user/login').send({
      email:"user1@gmail.com",
      password:"$2b$08$y4WWa5E47iccuuGv6apu4Oa3nEBHF7vDnNdlkCH7A5mmSj1hrS2.m"
    })
    const token = login.body.token
    const response = await request(app).post(baseUrl).set('Authorization', token).send({
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
    const login = await request(app).post('/api/v1/auth/user/login').send({
      email:"user1@gmail.com",
      password:"$2b$08$y4WWa5E47iccuuGv6apu4Oa3nEBHF7vDnNdlkCH7A5mmSj1hrS2.m"
    })
    const token = login.body.token
    const newReq =  await request(app).post(baseUrl).set('Authorization', token).send(req)
       const id = newReq.body._id

    const response = await request(app).put(`/api/v1/users/requests/${id}`).set('Authorization', token).send({
      title: "trial request",
      description: "this is a trial request"
    })

    expect(response.status).toBe(201)
    expect(response.body).toEqual({
      message: "Request updated successfully"
    })
  })
  
  it("shouldn't update a request but return an err message", async ()=>{
    const login = await request(app).post('/api/v1/auth/user/login').send({
      email:"user1@gmail.com",
      password:"$2b$08$y4WWa5E47iccuuGv6apu4Oa3nEBHF7vDnNdlkCH7A5mmSj1hrS2.m"
    })
    const token = login.body.token

    const response = await request(app).put(`/api/v1/users/requests/invalidId`).set("Authorization", token).send({
      title: "trial request",
      description: "this is a trial request"
    })

    expect(response.status).toBe(400)
    expect(response.body).toEqual({
      err: "Request not found"
    })
  })

  it("should approve a request", async ()=>{
    const login  = await request(app).post('/api/v1/auth/user/login').send({
      email:"user1@gmail.com",
      password:"$2b$08$y4WWa5E47iccuuGv6apu4Oa3nEBHF7vDnNdlkCH7A5mmSj1hrS2.m"
    })
    const token = login.body.token

    const newReq =  await request(app).post(baseUrl).set('Authorization', token).send(req)
    const id = newReq.body._id

    const response = await request(app).put(`/api/v1/users/requests/${id}/approve`).set("Authorization", token).send({
      approved: true
    })

    expect(response.status).toBe(201)
    expect(response.body).toEqual({
      message: "Request Approved"
    })
  })

  it("shouldn't approve a request on a wrong id", async ()=>{
    const login  = await request(app).post('/api/v1/auth/user/login').send({
      email:"user1@gmail.com",
      password:"$2b$08$y4WWa5E47iccuuGv6apu4Oa3nEBHF7vDnNdlkCH7A5mmSj1hrS2.m"
    })
    const token = login.body.token

    await request(app).post(baseUrl).set('Authorization', token).send(req)
  

    const response = await request(app).put(`/api/v1/users/requests/invalidId/approve`).set("Authorization", token).send({
      approved: true
    })

    expect(response.status).toBe(400)
    expect(response.body).toEqual({
      Err: "Request Not Found"
    })
  })

  it("should disapprove a request", async ()=>{
    const login  = await request(app).post('/api/v1/auth/user/login').send({
      email:"user1@gmail.com",
      password:"$2b$08$y4WWa5E47iccuuGv6apu4Oa3nEBHF7vDnNdlkCH7A5mmSj1hrS2.m"
    })
    const token = login.body.token

    const newReq =  await request(app).post(baseUrl).set('Authorization', token).send(req)
    const id = newReq.body._id

    const response = await request(app).put(`/api/v1/users/requests/${id}/disapprove`).set("Authorization", token).send({
      approved: false
    })

    expect(response.status).toBe(201)
    expect(response.body).toEqual({
      message: "Request disapproved"
    })
  })

  it("shouldn't disapprove a request on a wrong id", async ()=>{
    const login  = await request(app).post('/api/v1/auth/user/login').send({
      email:"user1@gmail.com",
      password:"$2b$08$y4WWa5E47iccuuGv6apu4Oa3nEBHF7vDnNdlkCH7A5mmSj1hrS2.m"
    })
    const token = login.body.token

    await request(app).post(baseUrl).set('Authorization', token).send(req)
  

    const response = await request(app).put(`/api/v1/users/requests/invalidId/disapprove`).set("Authorization", token).send({
      approved: false
    })

    expect(response.status).toBe(400)
    expect(response.body).toEqual({
      Err: "Request Not Found"
    })
  })

  it("should resolve a request", async ()=>{
    const login  = await request(app).post('/api/v1/auth/user/login').send({
      email:"user1@gmail.com",
      password:"$2b$08$y4WWa5E47iccuuGv6apu4Oa3nEBHF7vDnNdlkCH7A5mmSj1hrS2.m"
    })
    const token = login.body.token

    const newReq =  await request(app).post(baseUrl).set('Authorization', token).send(req)
    const id = newReq.body._id

    const response = await request(app).put(`/api/v1/users/requests/${id}/resolve`).set("Authorization", token).send({
      resolve: true
    })

    expect(response.status).toBe(201)
    expect(response.body).toEqual({
      message: "Request resolved"
    })
  })

  it("shouldn't resolve a request on a wrong id", async ()=>{
    const login  = await request(app).post('/api/v1/auth/user/login').send({
      email:"user1@gmail.com",
      password:"$2b$08$y4WWa5E47iccuuGv6apu4Oa3nEBHF7vDnNdlkCH7A5mmSj1hrS2.m"
    })
    const token = login.body.token

    await request(app).post(baseUrl).set('Authorization', token).send(req)
  

    const response = await request(app).put(`/api/v1/users/requests/invalidId/resolve`).set("Authorization", token).send({
      resolve: true
    })

    expect(response.status).toBe(400)
    expect(response.body).toEqual({
      Err: "Request Not Found"
    })
  })
})

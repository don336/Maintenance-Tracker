import request from "supertest"
import app from "../index.js"

describe ("Register a User", function (){
  const user = {
    name: "usermanic",
    username: "user4",
    email: "user4@gmail.com",
    password: "userlike34"
  }

  beforeAll (async ()=>{
    await request(app).post('/api/v1/auth/user/signup').send(user)
  })

  it("should register a user", async ()=>{
    const response = await request(app).post('/api/v1/auth/user/signup').send({
      name: "usermanic",
      username: "user5",
      email: "user5@gmail.com",
      password: "userlike34"
    })

    expect(response.status).toBe(201)
    expect(response.body).toEqual({
      message: "User Registered",
      user: {
        name: "usermanic",
        username: "user5",
        email: "user5@gmail.com",
        password: response.body.user.password,
        _id: response.body.user._id,
        dateCreated: response.body.user.dateCreated,
        __v: 0
      }
    })
  })

  it("should not register a user with a username that already exists", async ()=>{
    const response = await request(app).post('/api/v1/auth/user/signup').send({
      name: "usermanic",
      username: "user4",
      email: "user7@gmail.com",
      password: "userlike34"
    })

    expect(response.status).toBe(409)
    expect(response.body).toEqual({
      message: "username already exists"
      }
    )
  })

  it("should not register a user with an email that already exists", async ()=>{
    const response = await request(app).post('/api/v1/auth/user/signup').send({
      name: "usermanic",
      username: "user8",
      email: "user4@gmail.com",
      password: "userlike34"
    })

    expect(response.status).toBe(409)
    expect(response.body).toEqual({
      message: "Email already exists"
      }
    )
  })

  it("should Login a user", async ()=>{
    const response = await request(app).post('/api/v1/auth/user/login').send({
      email: "user1@gmail.com",
      password: "$2b$08$ZQFN2bwEVAgVMklWYTrhuux/z6Eq9ma3AlSdjfc2BWkkc08rTNm8C"
    })
    const token = response.body.token
    const id = response.body.user._id
    const email = response.body.user.email
    const username = response.body.user.username
    expect(response.status).toBe(201)
    expect(response.body).toEqual({
      token: token,
      user: {
        _id: id,
        username: username,
        email: email
      }
    })
  })

  it("shouldnot Login a user with a wrong email", async ()=>{
    const response = await request(app).post('/api/v1/auth/user/login').send({
      email: "use1@gmail.com",
      password: "$2b$08$ZQFN2bwEVAgVMklWYTrhuux/z6Eq9ma3AlSdjfc2BWkkc08rTNm8C"
    })

    expect(response.status).toBe(400)
    expect(response.body).toEqual({
      Error: "Email doesnot Exist"
    })
  })
})
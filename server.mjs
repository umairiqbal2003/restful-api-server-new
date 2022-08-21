import express from 'express'
import cors from 'cors'

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT ||  3000;

let users = [];

/// generate random number for user

function randomNumber(){

  return Math.floor(Math.random() * 10000000)
}

app.post('/user', (req, res) => {
    console.log(req.body);

    let newUser = {
     
      id:randomNumber(),
        fullname: req.body.userfullname,
        Email      : req.body.userEmail,
        Password   : req.body.userPassword,
        City : req.body.userCity

    }

    users.push(newUser);

    res.send("user is created" );
})
app.get('/user/:userId', (req,res)=>{
    
    let userId = req.params.userId
    
    let isFound = false;

    for( let i=0 ; i < users.length ; i++){

      if(users[i].id == userId){
        res.send(users[i])
        isFound = true;
        break;
      }
    }
   if(!isFound){
    res.send("user is not found")
   } 

})
app.get('/users', (req,res)=>{
  res.send(users)
})

app.put('/user/:userId', (req, res) => {
  res.send('Your user is modified')
  
  let userId = req.params.userId;
  let userIndex = -1;
  
  for( i=0 ; i < users.length ; i++){

    if(users[i].id == userId){
      userIndex = i
      break;
    }
  }
  if(userIndex === -1){
    res.send("user is not found")
  }else{
   if(req.body.userfullname) users[userIndex].fullname = req.body.userfullname
    if(req.body.userEmail)   users[userIndex].Email = req.body.userEmail
   if(req.body.userPassword) users[userIndex].Password = req.body.userPassword
   if(req.body.userCity)     users[userIndex].City = req.body.userCity

  res.send(users[userIndex])
  }
  

})

app.delete('/user/:userId', (req, res) => {

        
  let userId = req.params.userId;
  let userIndex = -1;
  
  for( i=0 ; i < users.length ; i++){

    if(users[i].id == userId){
      userIndex = i
      break;
    }
  }
  if(userIndex === -1){
    res.send("user is not found")
  }else{
    users.splice(userIndex,1);
    res.send('Your user is modified')
    
  }

  })

  app.delete('/users', (req, res) => {
    // console.log("aik request server pe i")

    users = [];
      res.send('Hello World!')
  })
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
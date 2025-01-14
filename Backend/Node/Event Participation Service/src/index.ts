import express, { Express, Request, Response } from 'express';
import { request } from 'http';
var mongo = require('mongodb');

import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import Participation from "./event_participation";
import participation from './event_participation';
import {Eureka} from 'eureka-js-client';
import { User } from './User';



// // example configuration
// const client = new Eureka({
//   // application instance information
//   instance: {
//     app: 'Node-Js-Service',
//     instanceId: 'Node-Js-Service',
//     hostName: 'localhost',
//     ipAddr: '127.0.0.1',
//     port: {
//       '$': 3000,
//       '@enabled': true,
//     },
//     vipAddress: 'Node-Js-Service',
//     statusPageUrl: 'http://localhost:3000/',
//     dataCenterInfo: {
//     '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
//       name: 'MyOwn',
//     },
//   },
//   eureka: {
//     host: '127.0.0.1',
//     port: 8761,
//     servicePath: '/eureka/apps/'
//   },
// });


// client.start()



function getUserName(req:any):String|undefined{
return req.kauth.grant.access_token.content.preferred_username
}


function getUserProfile(req:any):User|undefined{
  let u : User = new User();
  req.kauth.grant.access_token.content
  u.email= req.kauth.grant.access_token.content.email;
  u.name= req.kauth.grant.access_token.content.name;
  u.preferred_username= req.kauth.grant.access_token.content.preferred_username;

  return u;
  }
  

const keycloak = require('../src/keycloakConfig.js').initKeycloak();
const app: Express = express();
const port = 3000;
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.options("/", (req:Request,res:Response)=>{
  res.send("ok")
  });
app.use(keycloak.middleware());



const uri:string="mongodb://127.0.0.1:27017/Project";
mongoose.connect(uri,(err)=>{
    if(err){ console.log(err); }
    else{ console.log("Mongo db connection sucess");}
});





app.get("/",keycloak.protect("user") ,async (req:any,res:Response)=>{
let  result = participation.aggregate([ 
{$set:{Notparticipated:{$not :"$participents."+getUserName(req)}}},
{$project: {_id:1, name:1,avatar:1 ,date:1 , description:1,Notparticipated:1}}
])
res.send(await result)
});




app.get("/:id",keycloak.protect("user") ,async (req:any,res:Response)=>{
  let  result = participation.aggregate([ 
  { $match: { $expr : { $eq: [ '$_id' , { $toObjectId: req.params.id } ] } } },
  {$set:{Notparticipated:{$not :"$participents."+getUserName(req)}}},
  {$project: {_id:1, name:1,avatar:1 ,date:1 , description:1,Notparticipated:1}}
  ])
  let r = await result
  res.send(r[0])
  });
  

app.post("/:id", keycloak.protect("user"),async (req:any,res:Response)=>{
  var o_id = new mongo.ObjectID(req.params.id );

  let r = await participation.findById({'_id': o_id})
  let x = {}
  if(r!=null){
    x=r
  }
  if(x.participents== undefined) {
    x.participents = new Map<String,User>();
  }
  if(x.participents.get(getUserName(req))==undefined){
    x.participents.set(getUserName(req),getUserProfile(req))
    await participation.updateOne({'_id': o_id}, { $set:x})
  }else{

    x.participents.delete(getUserName(req))
    await participation.updateOne({'_id': o_id}, { $set:x})
  }
  res.send(x)
})


 


  app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
  });



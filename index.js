const express = require("express");
const mongoose = require("mongoose");
const {MongoClient}=require("mongodb");
const cors = require("cors");
const dotnev=require('dotenv')
const app = express();
dotnev.config();
//const mongoClient=new MongoClient(process.env.MONGODB_ATLAS_URI);
//var database,collection;
const authRouter = require("./router/auth");
const userRouter = require("./router/user");
const commentRouter = require("./router/comment");
const postRouter = require("./router/post");
const conservationRouter = require("./router/conservation");
const messageRouter = require("./router/message");

app.use(cors());
app.use(express.json());
const PORT=process.env.APP_PORT||3000;
app.use(authRouter);
app.use(userRouter);
app.use(commentRouter);
app.use(postRouter);
app.use(conservationRouter);
app.use(messageRouter);

//?retryWrites=true&w=majority
mongoose
  //.connect(`${process.env.DB}`)
  //.connect(`mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@social-chat-db.e6i4aml.mongodb.net/?retryWrites=true&w=majority`)
  .connect(process.env.MONGODB_ATLAS_URI,{
    dbName:"socialDb",
    useNewUrlParser:true,
    useUnifiedTopology:true
  })
  .then(() => {
    console.log("Connection Successful");
  })
  .catch((e) => {
    console.log(`db connection error:${e}`);
  });
  /*
 mongoose
  .connect(DB)
  .then(() => {
    console.log("Connection successful!");
  })
  .catch((err) => {
    console.log(err);
  });
 */
  app.listen(PORT,async ()=>{
    /*try {
      await mongoClient.connect({
        useNewUrlParser:true,
        useUnifiedTopology:true
      });
      database=mongoClient.db("socialDb");
      collection=database.collection("socialchat")
      console.log("bağlantı başarılı");
    } catch (error) {
      console.error(error);
      console.log("hata alındı");
    }
   */
    console.log(` sunucu ${PORT}  ayaga kalktı`);
});
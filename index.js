const express=require('express');
const cors=require("cors");
const port=process.env.PORT || 5000;
const app=express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
app.use(express.json());
app.use(cors());

// practiceday
// practiceday12345 

// ---------


const uri = "mongodb+srv://practiceday:practiceday12345@cluster0.r1jidx8.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const chocoCollection = client.db("choco-data").collection("add-choco-data");
app.post('/chocos',async(req,res)=>{
const addChoco=req.body;
const result=await chocoCollection.insertOne(addChoco);
res.send(result);
console.log(addChoco);
})
// put update

app.put('/chocos/:id',async(req,res)=>{
  const id=req.params.id;
  const filter={_id: new ObjectId(id)};
  const option={upsert: true};
  const updating=req.body;
  const choco={
   $set:{
    name:updating.name,
    url:updating.url,
    country:updating.country,
    category:updating.cate,
   }
  }
const result=await chocoCollection.updateOne(filter,choco,option);
res.send(result)

})
app.get('/chocos/:id',async(req,res)=>{
  const id=req.params.id;
  const query={_id: new ObjectId(id)};
  const result= await chocoCollection.findOne(query)
  res.send(result);
})
// ----


app.get('/chocos',async(req,res)=>{
  const cursor=  chocoCollection.find();
  const result= await cursor.toArray();
  res.send(result);
})

// delete
app.delete('/chocos/:id',async(req,res)=>{
  const id=req.params.id
  const query={_id: new ObjectId(id)};
  const result= await chocoCollection.deleteOne(query)
  res.send(result);
  console.log("deleted");
})
// ---
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

// -------


// basic setup
app.get('/',(req,res)=>{
  res.send("Server is Running....")
})

app.listen(port,()=>{
  console.log(`Server is Running on PORT :  ${port}`);
})
//...........

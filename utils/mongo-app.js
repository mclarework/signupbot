const faker = require("faker");
const { MongoClient } = require("mongodb");

const bulkAdd = () => {
  let people = [];
  for (i = 0; i < 100; i++) {
    people.push({
      email: faker.internet.email(),
      created_at: faker.date.past()
    });
  }
  return people;
};

const getTotal = async () => {
  const uri =
    "mongodb+srv://Mike:%23Asmodii1981@practise-cluster-jdtv7.mongodb.net/test?retryWrites=true&w=majority";
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  try {
    await client.connect();
    const db = client.db("joinus");
    const response = await db
      .collection("emails")
      .find()
      .count();
    return response;
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
};

const addEmail = async email => {
  const uri =
    "mongodb+srv://Mike:%23Asmodii1981@practise-cluster-jdtv7.mongodb.net/test?retryWrites=true&w=majority";
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  try {
    await client.connect();
    const db = client.db("joinus");
    await db
      .collection("emails")
      .insertOne({ email: email, created_at: new Date() });
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
};

addEmail();

// const main = async () => {
//   const uri =
//     "mongodb+srv://Mike:%23Asmodii1981@practise-cluster-jdtv7.mongodb.net/test?retryWrites=true&w=majority";
//   const client = new MongoClient(uri, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   });
//   try {
//     await client.connect();
//     console.log("Connected successfully");
//     const db = await client.db("myDB");
//     await db.collection("emails").insertMany([
//       { email: "grumpy@mike.com", created_at: new Date() },
//       { email: "liam@acks.people", created_at: new Date() }
//     ]);
//     const response = await db
//       .collection("emails")
//       .find()
//       .count();
//     console.log(response);
//   } catch (error) {
//     console.log(error);
//   } finally {
//     await client.close();
//   }
// };
module.exports = { getTotal, addEmail }
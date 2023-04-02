const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.MONGODB_URL;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

export async function addManualCharacter(name, attributes, skin, hair, physical, clothes, image) {
    await client.connect();
    const id = (await client.db().collection("characters").insertOne({
        name, attributes, skin, hair, physical, clothes, image, narrative: [], panels: [null*12]
    })).insertedId.toHexString();
    await client.close();
    console.log(id)
    return id;
}
export async function addGeneratedCharacter(name, prompt, image) {
    await client.connect();
    const id = (await client.db().collection("characters").insertOne({
        name, prompt, image
    })).insertedId.toHexString();
    await client.close();
    return id;
}
export async function addComics(name, story, mood, location, style) {
    await client.connect();
    const id = (await client.db().collection("comics").insertOne({
        name, story, mood, location, style
    })).insertedId.toHexString();
    await client.close();
    return id;
}
export async function setNarrative(id, array) {
    await client.connect();
    const uid = (await client.db().collection("comics").updateOne({
        _id: id
    }, {
        $set: {
            narrative: array
        }
    })).upsertedId.toHexString();
    await client.close();
    return uid;
}
export async function setPanel(id, order, base64) {
    await client.connect();
    const uid = (await client.db().collection("comics").updateOne({
        _id: id
    }, {
        $set: {
            [`panels.${order}`]: base64
        }
    })).upsertedId.toHexString();
    await client.close();
    return uid;
}

export async function getAllCollection() {
    await client.connect();
    const alldata = {};

    const data = client.db().collection("comics").find().limit(10);
    const documents = [];
    while (await data.hasNext()) {
        documents.push(await data.next())
    }
    await data.close();
    alldata.comics = documents;

    const data2 = client.db().collection("characters").find().limit(10);
    const documents2 = [];
    while (await data2.hasNext()) {
        documents2.push(await data2.next())
    }
    await data2.close();
    alldata.characters = documents2;

    await client.close();
    return alldata;
}

export async function getCharacters() {
    await client.connect();

    const data2 = client.db().collection("characters").find({}, {
        projection: {
            image: false
        }
    }).limit(10);
    const documents2 = [];
    while (await data2.hasNext()) {
        documents2.push(await data2.next())
    }
    await data2.close();

    await client.close();
    return documents2;
}
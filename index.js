const express = require('express')
const { MongoClient, ObjectId } = require('mongodb')
const path = require('path')
const PORT = process.env.PORT || 5000


const salasona = "Hernesupp12"
const andmebaas = "matkaApp"
const mongoUrl = `mongodb+srv://matka-app:${salasona}@cluster0.wgc5g.mongodb.net/${andmebaas}?retryWrites=true&w=majority`

const client = new MongoClient(mongoUrl)

const matk1 = {
  id: 0,
  nimetus: "Rattamatk Jõgevamaal",
  kirjeldus: "Lorem ipsum dolor sit amet consectetur adipiscing elit. Vero harum, doloremque reprehenderit tempora laboriosam tenetur sapiente at unde totam quam voluptate. Possimus magni nam voluptatibus dolore libero repellendus excepturi facere!",
  pildiUrl:"/assets/maed.jpg",
  osalejad:[]
}
const matk2 = {
  id: 1,
  nimetus: "Süstamak Kõrvemaal",
  kirjeldus: "Lorem ipsum dolor sit amet consectetur adipiscing elit. Vero harum, doloremque reprehenderit tempora laboriosam tenetur sapiente at unde totam quam voluptate. Possimus magni nam voluptatibus dolore libero repellendus excepturi facere!",
  pildiUrl:"/assets/harjumaa.jpg",
  osalejad: []
}
matkad = [
  matk1,
  matk2,
{ 
  id: 2,
  nimetus: "Matk Vändra metsades",
  kirjeldus: "Lorem ipsum dolor sit amet consectetur adipiscing elit. Vero harum, doloremque reprehenderit tempora laboriosam tenetur sapiente at unde totam quam voluptate. Possimus magni nam voluptatibus dolore libero repellendus excepturi facere!",
  pildiUrl:"/assets/friends.jpg",
  osalejad: []
}
]

const uudis0 = {
  id: 0,
  nimetus: "Uued matkarajad Harjumaal",
  kirjeldus: "Lorem ipsum dolor sit amet consectetur adipiscing elit. Vero harum, doloremque reprehenderit tempora laboriosam tenetur sapiente at unde totam quam voluptate. Possimus magni nam voluptatibus dolore libero repellendus excepturi facere!",
  pildiUrl:"/assets/harjumaa.jpg",
  sisu: "Cum maxime, quaerat neque modi velit similique a sit rem inventore suscipit dignissimos tempora corporis nisi sapiente labore ratione voluptatem quo nostrum! Repellendus nemo a animi eum illo delectus ipsa deleniti quia cupiditate ipsum dolor quasi qui, odit, tempore adipisci nulla, aliquam soluta incidunt quod ducimus blanditiis! Odio voluptate, quia quisquam laboriosam autem obcaecati cupiditate molestias, modi quis tempore, consequatur ab ipsa. Error eos delectus quibusdam, dignissimos explicabo consequatur soluta quas suscipit, modi consequuntur non molestiae facere possimus? Praesentium voluptates, numquam ab eos quis, atque consectetur deserunt veniam, quo tempora libero unde quibusdam dicta repellat excepturi! Doloribus, provident officiis quod et dolores ipsa iste aperiam in incidunt excepturi ipsum voluptatibus nisi. Fugit ipsum eos magni magnam ea tempora ex consequuntur, qui iusto maxime quia cumque earum excepturi laboriosam. Hic reiciendis nihil a veniam neque odio, praesentium aliquam autem", 
}
const uudis1 = {
  id: 1,
  nimetus: "Hea matkavarustuse tava",
  kirjeldus: "Lorem ipsum dolor sit amet consectetur adipiscing elit. Vero harum, doloremque reprehenderit tempora laboriosam tenetur sapiente at unde totam quam voluptate. Possimus magni nam voluptatibus dolore libero repellendus excepturi facere!",
  pildiUrl:"/assets/varustus.jpg",
  sisu: "Cum maxime, quaerat neque modi velit similique a sit rem inventore suscipit dignissimos tempora corporis nisi sapiente labore ratione voluptatem quo nostrum! Repellendus nemo a animi eum illo delectus ipsa deleniti quia cupiditate ipsum dolor quasi qui, odit, tempore adipisci nulla, aliquam soluta incidunt quod ducimus blanditiis! Odio voluptate, quia quisquam laboriosam autem obcaecati cupiditate molestias, modi quis tempore, consequatur ab ipsa. Error eos delectus quibusdam, dignissimos explicabo consequatur soluta quas suscipit, modi consequuntur non molestiae facere possimus? Praesentium voluptates, numquam ab eos quis, atque consectetur deserunt veniam, quo tempora libero unde quibusdam dicta repellat excepturi! Doloribus, provident officiis quod et dolores ipsa iste aperiam in incidunt excepturi ipsum voluptatibus nisi. Fugit ipsum eos magni magnam ea tempora ex consequuntur, qui iusto maxime quia cumque earum excepturi laboriosam. Hic reiciendis nihil a veniam neque odio, praesentium aliquam autem", 
}
uudised = [
  uudis0,
  uudis1,
{ 
  id: 2,
  nimetus: "Tule matkama koos matkasell Mati Maasikaga!",
  kirjeldus: "Lorem ipsum dolor sit amet consectetur adipiscing elit. Vero harum, doloremque reprehenderit tempora laboriosam tenetur sapiente at unde totam quam voluptate. Possimus magni nam voluptatibus dolore libero repellendus excepturi facere!",
  pildiUrl:"/assets/hiker.jpg",
  sisu: "Cum maxime, quaerat neque modi velit similique a sit rem inventore suscipit dignissimos tempora corporis nisi sapiente labore ratione voluptatem quo nostrum! Repellendus nemo a animi eum illo delectus ipsa deleniti quia cupiditate ipsum dolor quasi qui, odit, tempore adipisci nulla, aliquam soluta incidunt quod ducimus blanditiis! Odio voluptate, quia quisquam laboriosam autem obcaecati cupiditate molestias, modi quis tempore, consequatur ab ipsa. Error eos delectus quibusdam, dignissimos explicabo consequatur soluta quas suscipit, modi consequuntur non molestiae facere possimus? Praesentium voluptates, numquam ab eos quis, atque consectetur deserunt veniam, quo tempora libero unde quibusdam dicta repellat excepturi! Doloribus, provident officiis quod et dolores ipsa iste aperiam in incidunt excepturi ipsum voluptatibus nisi. Fugit ipsum eos magni magnam ea tempora ex consequuntur, qui iusto maxime quia cumque earum excepturi laboriosam. Hic reiciendis nihil a veniam neque odio, praesentium aliquam autem", 
}
]

let matkajad = []

function naitaRegistreerimist(req, res) {
  const index = parseInt(req.params.matk)
  console.log("valitud matk " + index)
  console.log(matkad[index])
  res.render('pages/registreerumine', {matk: matkad[index]})
  }

  async function registreeriOsaleja(req, res) {
    console.log("Serverisse saadeti parameetrid:")
    console.log(req.query)
  
    if (!req.query.nimi) {
      return res.end("Matkaja nimi peab olemas olema")
    }
  
    if (!req.query.matkaId) {
      return res.end("Matka identifikaator puudub")
    }
  
    const matk = matkad[req.query.matkaId]
  
    if (!matk) {
      return res.send("Matka indeks on vale")
    }

    const uusMatkaja = {
      nimi: req.query.nimi,
      email: req.query.email,
      teade: req.query.teade,
      id: req.query.matkaId,
      matkNimetus: matk.nimetus
    }

  matkajad.push(uusMatkaja)
  matk.osalejad.push(uusMatkaja.email)

  
  console.log("Kõik matkajad:")
  console.log(matkajad)


  await client.connect()
  const database = client.db(andmebaas)
  const registreerumised = database.collection("registreerumised")
  const tulemus = await registreerumised.insertOne(uusMatkaja)
  console.log("Lisati uus matkaja: " + tulemus.insertedId)

  res.render("pages/reg-kinnitus", {matk: matk})
}

function tagastaMatkad(req, res) {
    res.send(matkad)
}

function naitaUudist (req, res) {
  const index = parseInt (req.params.uudis)
  console.log("Valitud uudis " + index);
  console.log(uudised [index])
  res.render('pages/uudiseSisu', {uudis: uudised [index]})
}

function tagastaMatkad(req, res) {
  res.send(matkad)
}

async function tagastaOsalejad(req, res) {
  let matkaIndeks = req.params.matk
  const filter = {
    id: matkaIndeks
  }

  let vastusMassiiv = await loeOsalejad(filter)
  client.close()

  res.send(vastusMassiiv)
}

async function loeOsalejad(filter) {
  await client.connect()
  const database = client.db(andmebaas)
  const registreerumised = database.collection("registreerumised")
  let vastusMassiiv = await registreerumised.find(filter).toArray()
  client.close()
  return vastusMassiiv
}

async function naitaMatkasid(req, res) {
  const osalejad = await loeOsalejad({})

  for(indeks in osalejad) {
    const osaleja = osalejad [indeks]
    const matkaIndeks = parseInt(osaleja.id)
    const matk = matkad[matkaIndeks]
    console.log (matkad)
    matk.osalejad.push(osaleja.email)
  }

  console.log(osalejad)
  res.render('pages/index', {matkad: matkad})
}

async function eemaldaOsaleja(req,res) {
  const id = req.params.id
  await client.connect()
  const database = client.db(andmebaas)
  const registreerumised = database.collection("registreerumised")
  const result = await registreerumised.deleteOne( {"_id": ObjectId(id)})
  res.send({"staatus":"ok", detailid: result})
}


express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', naitaMatkasid)
  .get('/kontakt', (req, res) => res.render('pages/kontakt'))
  .get("/uudised", (req, res) => res.render("pages/uudised", { uudised: uudised }))
  .get("/uudiseSisu/:uudis", naitaUudist)
  
  .get('/registreerumine/:matk', naitaRegistreerimist) 
  .get('/kinnitus', registreeriOsaleja) // req.query.matkaId
  .get('/api/matk', tagastaMatkad)

  .delete('/api/osaleja/:id', eemaldaOsaleja)
  .get('/api/matkaja/:matk', tagastaOsalejad)
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
const express = require('express')
const { MongoClient } = require('mongodb')
const path = require('path')
const PORT = process.env.PORT || 5000


const salasona = "Super0092"
const andmebaas = "matkaApp"
const mongoUrl = `mongodb+srv://matka-app:${salasona}@cluster0.cm46p.mongodb.net/${andmebaas}?retryWrites=true&w=majority`

const client = new MongoClient(mongoUrl)

const matk1 = {
  id: 0,
  nimetus: "Rattamatk Jõgevamaal",
  kirjeldus: "Lorem ipsum dolor sit amet consectetur adipiscing elit. Vero harum, doloremque reprehenderit tempora laboriosam tenetur sapiente at unde totam quam voluptate. Possimus magni nam voluptatibus dolore libero repellendus excepturi facere!",
  pildiUrl:"/assets/maed.jpg",
  osalejad:['mati@matkaja.ee','kati@matkaja.ee']
}
const matk2 = {
  id: 1,
  nimetus: "Süstamak Kõrvemaal",
  kirjeldus: "Lorem ipsum dolor sit amet consectetur adipiscing elit. Vero harum, doloremque reprehenderit tempora laboriosam tenetur sapiente at unde totam quam voluptate. Possimus magni nam voluptatibus dolore libero repellendus excepturi facere!",
  pildiUrl:"/assets/hiking.jpg",
  osalejad: ['klaabu@suurmeri.ee']
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

function naitaRegistreerimist(req, res) {
  const index = parseInt(req.params.matk)
  console.log("valitud matk " + index)
  console.log(matkad[index])
  res.render('pages/registreerumine', {matk: matkad[index]})
}

const uudis0 = {
  id: 0,
  nimetus: "Uued matkarajad Harjumaal",
  kirjeldus: "Lorem ipsum jne",
  pildiUrl:"/assets/harjumaa.jpg",
}
const uudis1 = {
  id: 1,
  nimetus: "Hea matkavarustuse tava",
  kirjeldus: "Lorem ipsum jne",
  pildiUrl:"/assets/varustus.jpg",
}
uudised = [
  uudis0,
  uudis1,
{ 
  id: 2,
  nimetus: "Tule matkama koos matkasell Mati Maasikaga!",
  kirjeldus: "Lorem ipsum jne",
  pildiUrl:"/assets/hiker.jpg",
}
]
let matkajad = []

async function registreeriOsaleja(reg, res) {
  console.log("Serverisse saadeti parameerid:")
  console.log(req.query)

  if (!req.query.nimi) {
    return res.end("Matkaja nimi peab olemas olema")
  }
  if (!req.query.matkaId) {
    return res.end("Matkaja identifikaator puudub")
  }

  const matk = matkad[req.query.matkaId]

  if (!matk){
    return res.send("Matka indeks on vale")
  }

  const uusMatkaja = {
    nimi: req.query.nimi,
    email: req.query.email,
    markus: req.query.teade,
    id: req.query.matkaId,
    matkNimetus: matk.nimetus
  }

  matkajad.push(uusMatkaja)
  matk.osalejad.push (uusMatkaja.email)

  console.log("K6ik matkajad:")
  console.log(matkajad)

   await client.connect ()
   const database = client.db (andmebaas)
   const registreerumised = database.collection("regitreerumised")
   const tulemus = await registreerumised.insertOne(uusMatkaja)
   console.log("Lisati uus matkaja:" + tulemus.insertedId)


  res.render("pages/reg-kinnitus", {matk: matk})
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

function tagastaOsalejad(req, res) {
  let matkaIndeks = req.params.matk
  let vastusMassiiv = []
  for (i in matkajad) {
    const osaleja = matkajad [i]
    if (osaleja.id == matkaIndeks)
    vastusMassiiv.push(osaleja)
  }
}

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index', {matkad: matkad}))
  .get('/uudised',(req,res) => res.render ('pages/uudised', {uudised: uudised}))
  .get('/kontakt', (req, res) => res.render('pages/kontakt'))
  .get('/registreerumine/:matk', naitaRegistreerimist) 
  .get('/uudiseSisu/:uudis', naitaUudist)
  .get('/kinnitus', registreeriOsaleja) // req.query.matkaId
  .get('/api/matk', tagastaMatkad)
  .get('/api/matkaja/:matk', tagastaOsalejad)
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

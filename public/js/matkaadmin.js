let matkad = []
async function loeMatkad() {
    let response = await fetch('/api/matk')
    matkad = await response.json()
    naitaMatkadeMenyyd(matkad)
    naitaOsalejaid(0)
}

function naitaMatkadeMenyyd(matkad) {
    let vastus = ''
    for (let i in matkad) {
       vastus += `
       <button class="btn btn-link" onclick="naitaOsalejaid(${matkad[i].id})">
          ${matkad[i].nimetus}
       </button>
       ` 
    }

    const matkadMenyyElement = document.getElementById("matkad-menyy")
    matkadMenyyElement.innerHTML = vastus
}

async function naitaOsalejaid(matkaIndeks) {
    console.log("matk: " + matkaIndeks)
    let response = await fetch('/api/matkaja/' + matkaIndeks)
    const osalejad = await response.json() 
    console.log(osalejad)
    // Kasuta matkad[matkaIndeks] objekti matka info näitamiseks
    //Kasuta fetch päringu tulemust konkreetse matka tulemuste näitamiseks
    
    let matk = matkad[matkaIndeks]

    let vastus = ''
    vastus += `
    <div class="pb-2">
    <div class="matkanimetus">${matk.nimetus}</div>
    <div class="row kirjelduseblokk">
    <div class="col-6 "><img src="${matk.pildiUrl}" width="100%" height="100%"></img></div>
    <div class="col-6"><p>${matk.kirjeldus}</p></div>
</div>
</div>
<div class="matkanimetus">Osalejaid:  ${matk.osalejad}</div>
</p>

</div>

<div class="row registreerijad">
<div class="col-4 p-2"><strong>Nimi</strong></div>
<div class="col-4 p-2"><strong>Email</strong></div>
<div class="col-2 p-2"><strong>Märkus</strong></div>
<div class="col-2 "><button type="button" class=" btn-success"><i class="fa fa-plus-circle"></i></button><button type="button" class=" btn-danger"><i class="fa fa-trash-o"></i></button></div>
</div>   

`
for(i in osalejad){

vastus += `


<div class="row osaleja">

   <div class="col-4">${osalejad[i].nimi}</div>
   <div class="col-4"> ${osalejad[i].email}</div>
   <div class="col-4">${osalejad[i].markus}</div>
</div>

`

}


const matkajadElement = document.getElementById("matka-andmed")
matkajadElement.innerHTML = vastus
}


loeMatkad()
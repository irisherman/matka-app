let matkad = []
async function loeMatkad() {
    let response = await fetch('/api/matk')
    let matkad = await response.json()
    naitaMatkadeMenyyd(matkad)
    naitaOSalejaid (0)
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
    const menyyElement = document.getElementById("matkad-menyy")
    menyyElement.innerHTML = vastus
}

async function naitaOsalejaid(matkaIndeks) {
    console.log("matk: " + matkaIndeks)
    let response = await fetch('/api/matkaja/' + matkaIndeks)
    const osalejad = await response.json()
    console.log(osalejad)

    let matk = matkad[matkaIndeks]

    let vastus = ''
    vastus += `
    <div class="pb-2">
        ${matk.kirjeldus}
    </div>
    <dic class="row">
            <div class="col-4">Nimi</div>
            <div class="col-8">Email</div>
    </div>
    `
    for ( i in osalejad ){
        const osalja = osalejad [i]
        vastus += `
        <div class="row">
            <div class="col-4">${osalejad.nimi}</div>
            <div class="col-8">${osalejad.email}</div>
            <div class="col-12">${osalejad.markus}</div>
        `
    }
    const matkajadElement = document.getElementById("matka-andmed")
    matkajadElement.innerHTML = vastus
}

loeMatkad()

import fs from 'fs'

const file = './data.json'

function readDb(){
    return JSON.parse(fs.readFileSync(file))
}

function writeDb(data){
    fs.writeFileSync(file, JSON.stringify(data, null, 2))
}

export default readDb
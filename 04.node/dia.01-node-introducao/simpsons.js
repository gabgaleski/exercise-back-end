const { read } = require('fs');

const fs = require('fs').promises;

const readFile = async () => {
  const simpsons = JSON.parse( await fs.readFile('./simpsons.json', 'utf-8'));
  return simpsons;
}


const getCharacterById = async (id) => {
  const result = await readFile();
  
  const findCharacter = result.find((character) => Number(character.id) === Number(id));

  if(!findCharacter) return console.log('Id não encontrado');

  return console.log(`Personagem encontrado: ${findCharacter.name}`);
}


const removeCharacter = async (id1, id2) => {
    const result = await readFile();
    const newCharacter = result.filter((character) => Number(character.id) !== Number(id1) && Number(character.id) !== Number(id2));

    return JSON.parse( await fs.writeFile('./simpsons.json', JSON.stringify(newCharacter)));
}

const createNewSimpsons = async (id1, id2) => {
  const result = await readFile();
  const newFSimpsons = result.filter((character) => Number(character.id) >= Number(id1) && Number(character.id) <= Number(id2));
  JSON.parse (await fs.writeFile('./simpsonFamily.json', JSON.stringify(newFSimpsons)));
}

const addPerson = async (id, name) => {
    const result = JSON.parse( await fs.readFile('./simpsonFamily.json', 'utf-8'));
    const newPerson = { id, name };
    result.push(newPerson);
    JSON.parse (await fs.writeFile('./simpsonFamily.json', JSON.stringify(result)));
    return console.log('Personagem adicionado com sucesso!');
}

const replaceNelson = async (id, name) => {
    const result = JSON.parse( await fs.readFile('./simpsonFamily.json', 'utf-8'));
    const removeNelson = result.filter((character) => character.id !== 5);
    const newPerson = { id, name };
    removeNelson.push(newPerson);
    JSON.parse (await fs.writeFile('./simpsonFamily.json', JSON.stringify(removeNelson)));
}

const main = async () => {
    const result = await readFile();
    getCharacterById(1);
     return result.map(({ id, name }) => console.log(`${id} - ${name}`));
 }


 replaceNelson(5, 'Lisa Simpson');

//  addPerson(5, 'Nelson Muntz');

//  createNewSimpsons(1, 4);

//  removeCharacter(6, 10);
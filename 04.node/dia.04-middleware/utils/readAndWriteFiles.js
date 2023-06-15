const fs = require('fs/promises');


const readFile = async () => {
    try {
      const data = await fs.readFile('src/data.json', 'utf8');
  
      return JSON.parse(data);
    } catch (error) {
      return null;
    }
  };

const getId = async () => {
    const data = await readFile();
    return data[0];
};

const writeFile = async (content) => {
    const data = await readFile();
    const newData = content;
    data.push(newData);
    data[0] += 1;
    return await fs.writeFile('src/data.json', JSON.stringify(data));
}

module.exports = {
   readFile, 
   getId,
   writeFile
};
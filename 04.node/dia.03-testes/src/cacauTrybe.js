const fs = require('fs').promises;
const { write } = require('fs');
const { join } = require('path');

const readCacauTrybeFile = async () => {
 const path = '/files/cacauTrybeFile.json';
 try {
   const contentFile = await fs.readFile(join(__dirname, path), 'utf-8');
   return JSON.parse(contentFile);
 } catch (error) {
   return null;
 }
};

const writeCacauTrybeFile = async (content) => {
  const path = '/files/cacauTrybeFile.json';
  try {
    await fs.writeFile(join(__dirname, path), JSON.stringify(content));
  } catch (error) {
    return null;
  }
};

const getAllChocolates = async () => {
 const cacauTrybe = await readCacauTrybeFile();
 return cacauTrybe.chocolates;
};

const getChocolateById = async (id) => {
  const cacauTrybe = await readCacauTrybeFile();
  return cacauTrybe.chocolates
    .find((chocolate) => chocolate.id === id);
};

const getChocolatesByBrand = async (brandId) => {
  const cacauTrybe = await readCacauTrybeFile();
  return cacauTrybe.chocolates
    .filter((chocolate) => chocolate.brandId === brandId);
};

const createChocolate = async (name, brandId) => {
  const cacauTrybe = await readCacauTrybeFile();
  const newChocolate = {id: cacauTrybe.chocolates.length + 1, name, brandId};
  cacauTrybe.chocolates.push(newChocolate);
  await writeCacauTrybeFile(cacauTrybe);
  return newChocolate;
};
module.exports = {
  getAllChocolates,
  getChocolateById,
  getChocolatesByBrand,
  createChocolate,
};
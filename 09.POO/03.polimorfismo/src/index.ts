import Clube from "./Clube";
import QuadraFutebol from "./QuadraFutebol";

const newClub = new Clube;

const newQuadra = new QuadraFutebol;

newClub.adicionarQuadra(newQuadra);

const day = new Date('2023-10-10');

const save = newQuadra.reservar(day)

console.log(save)



import IAgenda from "./interfaces/IAgenda";

abstract class Quadra {
  abstract reservar<T>(param: Date):IAgenda <T>
}


export default Quadra;
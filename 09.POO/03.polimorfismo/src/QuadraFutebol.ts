import Quadra from "./Quadra";
import IAgenda from "./interfaces/IAgenda";
import IFutebol from "./interfaces/IFutebol";
import normas from "./normas/normasDeUso";

export default class QuadraFutebol extends Quadra {
  public futebolDate: IFutebol = normas.futebol;

  public reservar<IFutebol>(param: Date): IAgenda<IFutebol> {
    const protocolo = (Math.random() + 1).toString(30).substring(3);
    return {
        protocolo,
        data: param,
        regras: this.futebolDate as IFutebol
    }
  };
}

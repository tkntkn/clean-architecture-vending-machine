import { Nominal, ToNominal } from "../util/type";

export type Drink = Nominal<string, "Drink">;
const ToDrink = ToNominal<string, "Drink">;

import { Nominal, ToNominal } from "../util/type";

export type Juice = Nominal<string, "Juice">;
const ToJuice = ToNominal<string, "Juice">;


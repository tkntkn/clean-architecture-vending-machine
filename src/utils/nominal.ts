declare const NominalSymbol: unique symbol;

export type Nominal<T, name extends string> = T & { [NominalSymbol]: name };

export const ToNominal = <T, name extends string>(value: T) => value as Nominal<T, name>;

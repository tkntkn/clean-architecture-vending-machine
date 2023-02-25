import readline from "readline";
import { getInsertedAmount, insert, refund } from "../application/useCase";

export function runCui() {
  const readlineInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  function interact() {
    const amount = getInsertedAmount();
    readlineInterface.question(`Current Amount: ${amount}\n> `, (input) => {
      const [command, ...args] = input.split(/\s+/);
      if (command === "insert") {
        const moneyLike = args[0];
        const result = insert(moneyLike);
        if (result) {
          console.log("Inserted.");
        } else {
          console.log("Invalid money:", moneyLike);
        }
      } else if (command === "refund") {
        const refundMoneys = refund();
        console.log("Refund:", refundMoneys);
      } else {
        console.log("Unknown command.");
      }
      interact();
    });
  }

  interact();
}

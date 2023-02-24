import readline from "readline";

export const runCui = (handleInput: (input: string) => void) => {
  const readlineInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  function interact() {
    readlineInterface.question("command > ", (input) => {
      const [command, ...args] = input.split(/\s+/);
      if (command === "insert") {
        const moneyLike = args[0];
        handleInput(moneyLike);
      } else {
        console.log("unknown command");
      }
      interact();
    });
  }

  interact();
};

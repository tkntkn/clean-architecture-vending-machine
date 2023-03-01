import { useState } from "react";
import { getUserByEmail } from "../adapter/getUserByEmail";
import { requestRegister } from "../adapter/requestRegister";
import { getRegisteringStateFeedback, register, RegisteringState } from "../business/useCase/register";
import { useBusinessState } from "../common/state";

export function App() {
  const [registeringState, setRegisteringState] = useState<RegisteringState>("none");
  const businessRegisteringState = useBusinessState([registeringState, setRegisteringState]);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const handleRegisterClick = () => {
    const user = { email, name };
    return register(user, { registeringState: businessRegisteringState }, { requestRegister, getUserByEmail });
  };

  const feedback = getRegisteringStateFeedback(registeringState);

  return (
    <main>
      {feedback && <p>{feedback}</p>}
      <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
      <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
      <button onClick={handleRegisterClick}>Register</button>
    </main>
  );
}

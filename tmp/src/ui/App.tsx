import { useState } from "react";
import { getUserByEmail } from "../adapter/getUserByEmail";
import { requestRegister } from "../adapter/requestRegister";
import { getRegistrationStateFeedback, register, RegistrationState } from "../business/useCase/register";
import { useBusinessState } from "../common/state";

export function App() {
  const [registrationState, setRegistrationState] = useState<RegistrationState>("none");
  const businessRegistrationState = useBusinessState([registrationState, setRegistrationState]);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const handleRegisterClick = () => {
    const user = { email, name };
    return register(user, { registrationState: businessRegistrationState }, { requestRegister, getUserByEmail });
  };

  const feedback = getRegistrationStateFeedback(registrationState);

  return (
    <main>
      {feedback && <p>{feedback}</p>}
      <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
      <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
      <button onClick={handleRegisterClick}>Register</button>
    </main>
  );
}

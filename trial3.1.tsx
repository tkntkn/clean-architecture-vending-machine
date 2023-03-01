import { useState } from "react";

// domain
type Message = { id: number; text: string };
const getNextId = (messages: Message[]) => Math.max(1, ...messages.map((m) => m.id + 1));
const defaultMessageText = "Hello World.";

// useCase
type AddMessageState = {
  messages: Message[];
  setMessages: (messages: Message[]) => void;
};

type AddMessageAdapter = {
  saveMessages: (messages: Message[]) => Promise<boolean>;
};

const addMessage = async (text: string, { messages, setMessages }: AddMessageState, { saveMessages }: AddMessageAdapter) => {
  const id = getNextId(messages);
  const newMessages = [...messages, { id, text }];
  setMessages(newMessages);
  const success = await saveMessages(newMessages);
  if (!success) {
    setMessages(messages);
  }
};

// Adapter
const saveMessages = async (messages: Message[]) => Math.random() > messages.length / 10;

// renderer
function PureOriented() {
  const [text, setText] = useState(defaultMessageText);

  const [messages, setMessages] = useState<Message[]>([]);

  const handleAddClick = () => {
    addMessage(text, { messages, setMessages }, { saveMessages });
  };

  return (
    <main>
      <ol>
        {messages.map((message) => (
          <li key={message.id}>
            {message.id}: {message.text}
          </li>
        ))}
      </ol>
      <input type="text" value={text} onChange={(event) => setText(event.target.value)} />
      <button onClick={handleAddClick}>Add</button>
    </main>
  );
}

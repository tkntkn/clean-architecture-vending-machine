import { useState } from "react";

// domain
type Message = { id: number; text: string };
const getNextId = (messages: Message[]) => Math.max(1, ...messages.map((m) => m.id + 1));
const defaultMessageText = "Hello World.";

// useCase
const addMessage = async (getMessages: () => Message[], setMessages: (messages: Message[]) => void, saveMessages: (messages: Message[]) => Promise<boolean>, text: string) => {
  const messages = getMessages();
  const id = getNextId(messages);
  const newMessages = [...messages, { id, text }];
  setMessages(newMessages);
  const success = await saveMessages(newMessages);
  if (!success) {
    setMessages(messages);
  }
};

// renderer
function PureOriented() {
  const [text, setText] = useState(defaultMessageText);
  const [messages, setMessages] = useState<Message[]>([]);

  const handleAddClick = () => {
    addMessage(
      () => messages,
      setMessages,
      async (messages: Message[]) => Math.random() > 0.1,
      text
    );
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

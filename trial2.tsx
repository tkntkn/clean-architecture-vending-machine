import { useState } from "react";

// domain
type Message = { id: number; text: string };
const getNextId = (messages: Message[]) => Math.max(1, ...messages.map((m) => m.id + 1));
const defaultMessageText = "Hello World.";

// useCase
const addMessage = (getMessages: () => Message[], setMessages: (messages: Message[]) => void, setDirty: (id: number, dirty: boolean) => void, text: string) => {
  const messages = getMessages();
  const id = getNextId(messages);
  setMessages([...messages, { id, text }]);
  setDirty(id, text !== defaultMessageText);
};

// renderer
function PureOriented() {
  const [text, setText] = useState(defaultMessageText);
  const [messages, setMessages] = useState<Message[]>([]);

  const [isDirty, setIsDirty] = useState<{ [id in number]?: boolean }>({});

  const handleAddClick = () => {
    addMessage(
      () => messages,
      setMessages,
      (id, dirty) => setIsDirty(Object.assign({}, isDirty, { [id]: dirty })),
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

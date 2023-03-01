import { useState } from "react";

// domain
type Message = { id: number; text: string };
const getNextId = (messages: Message[]) => Math.max(1, ...messages.map((m) => m.id + 1));
const defaultMessageText = "Hello World.";

// useCase
const addMessage = (messages: Message[], text: string) => {
  const id = getNextId(messages);
  return [
    [...messages, { id, text }],
    [id, text !== defaultMessageText],
  ] as [Message[], [number, boolean]];
};

// renderer
function PureOriented() {
  const [text, setText] = useState(defaultMessageText);
  const [messages, setMessages] = useState<Message[]>([]);

  const [isDirty, setIsDirty] = useState<{ [id in number]?: boolean }>({});

  const handleAddClick = () => {
    const [newMessages, [newId, dirty]] = addMessage(messages, text);
    setIsDirty(Object.assign({}, isDirty, { [newId]: dirty }));
    setMessages(newMessages);
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

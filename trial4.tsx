import { useState } from "react";

// di
type Container<T> = { inject<K extends keyof T>(key: K): T[K]; provide<K extends keyof T>(key: K, value: T[K]): void };
const container: Container<{
  getMessages: () => Message[];
  setMessages: (message: Message[]) => void;
  saveMessages: (message: Message[]) => Promise<boolean>;
}> = {} as any;

// domain
type Message = { id: number; text: string };
const getNextId = (messages: Message[]) => Math.max(1, ...messages.map((m) => m.id + 1));
const defaultMessageText = "Hello World.";

// useCase
const addMessage = async (text: string) => {
  const getMessages = container.inject("getMessages");
  const setMessages = container.inject("setMessages");
  const saveMessages = container.inject("saveMessages");
  const messages = getMessages();
  const id = getNextId(messages);
  const newMessages = [...messages, { id, text }];
  setMessages(newMessages);
  const success = await saveMessages(newMessages);
  if (!success) {
    setMessages(messages);
  }
};

// store
container.provide("saveMessages", async (messages: Message[]) => Math.random() > messages.length / 10);

// state
let messages: Message[] = [];
container.provide("getMessages", () => messages);
container.provide("setMessages", (newMessages: Message[]) => (messages = newMessages));

// renderer
function PureOriented() {
  const [text, setText] = useState(defaultMessageText);
  const handleAddClick = () => {
    addMessage(text);
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

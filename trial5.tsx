import { useMemo, useReducer, useState } from "react";

function useForceUpdate() {
  return useReducer((bool) => !bool, true)[1];
}

function useStateClass<K extends new (onUpdate: () => void) => any>(StateClass: K): InstanceType<K> {
  const forceUpdate = useForceUpdate();
  return useMemo(() => new StateClass(forceUpdate), []);
}

// domain
type Message = { id: number; text: string };
const getNextId = (messages: Message[]) => Math.max(1, ...messages.map((m) => m.id + 1));
const defaultMessageText = "Hello World.";

// useCase
interface AddMessageState {
  getMessages: () => Message[];
  setMessages: (messages: Message[]) => void;
}

interface AddMessageAdapter {
  saveMessages: (messages: Message[]) => Promise<boolean>;
}

class AddMessage {
  constructor(private state: AddMessageState, private adapter: AddMessageAdapter) {}

  async execute(text: string) {
    const messages = this.state.getMessages();
    const id = getNextId(messages);
    const newMessages = [...messages, { id, text }];
    this.state.setMessages(newMessages);
    const success = await this.adapter.saveMessages(newMessages);
    if (!success) {
      this.state.setMessages(messages);
    }
  }
}

// state
class MessageState implements AddMessageState {
  constructor(private onUpdate: () => void, private messages: Message[] = []) {}

  getMessages = () => {
    return this.messages;
  };

  setMessages = (messages: Message[]) => {
    this.messages = messages;
    this.onUpdate();
  };
}

// Adapter
class MessageAdapter implements AddMessageAdapter {
  saveMessages = async (messages: Message[]) => {
    return Math.random() > messages.length / 10;
  };
}

// renderer
function PureOriented() {
  const [text, setText] = useState(defaultMessageText);
  const messageState = useStateClass(MessageState);
  const messageAdapter = useMemo(() => new MessageAdapter(), []);
  const addMessage = useMemo(() => new AddMessage(messageState, messageAdapter), []);

  const handleAddClick = () => addMessage.execute(text);

  return (
    <main>
      <ol>
        {messageState.getMessages().map((message) => (
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

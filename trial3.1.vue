<script lang="ts">
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
</script>

<script setup lang="ts">
import { ref } from "vue";
const text = ref(defaultMessageText);

const messages = ref<Message[]>([]);

const handleAddClick = () => {
  addMessage(text.value, { messages: messages.value, setMessages: (newMessages) => messages.value = newMessages  }, { saveMessages });
};
</script>

<template>
  <main>
    <ol>
      
      <template v-for="message of messages" :key="message.id">
        <li>
          {{message.id}}: {{message.text}}
        </li>
      </template>
    </ol>
    <input type="text" v-model="text" />
    <button @click="handleAddClick">Add</button>
  </main>
</template>
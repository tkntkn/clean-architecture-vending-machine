<script lang="ts">
import { Ref } from "vue";

// Domain
type User = { email: string; name: string };
type ValidateNewUserAdapter = {
  getUserByEmail: (email: string) => Promise<User | undefined>;
};
async function validateNewUser(user: User, { getUserByEmail }: ValidateNewUserAdapter) {
  return user.email.includes("@") && user.name.length > 0 && (await getUserByEmail(user.email)) == undefined;
}

// UseCase
type RegisterState = {
  feedbackMessages: Ref<string[]>;
};

type RegisterAdapter = {
  requestRegister: (user: User) => Promise<boolean>;
  getUserByEmail: (email: string) => Promise<User | undefined>;
};

const register = async (user: User, { feedbackMessages }: RegisterState, { requestRegister, getUserByEmail }: RegisterAdapter) => {
  feedbackMessages.value = ["Validating..."];
  const valid = await validateNewUser(user, { getUserByEmail });
  if (!valid) {
    feedbackMessages.value = ["Something invalid."];
  } else {
    feedbackMessages.value = ["Registering..."];
    const success = await requestRegister(user);
    if (!success) {
      feedbackMessages.value = ["Something wrong."];
    }
  }
};

// Adapter
const requestRegister = async (user: User) => Math.random() > user.name.length / 10;
const getUserByEmail = async (email: string) => (Math.random() > 0.1 && { email, name: "exist" }) || undefined;
</script>

<script setup lang="ts">
import { ref } from "vue";
const feedbackMessages = ref<string[]>([]);
const email = ref<string>("");
const name = ref<string>("");

function handleRegisterClick() {
  const user = { email: email.value, name: name.value };
  return register(user, { feedbackMessages }, { getUserByEmail, requestRegister });
}
</script>

<template>
  <main>
    <ol>
      <template v-for="message in feedbackMessages" :key="message">
        <li>{{ message }}</li>
      </template>
    </ol>
    <input type="email" v-model="email" />
    <input type="text" v-model="name" />
    <button @click="handleRegisterClick">Register</button>
  </main>
</template>

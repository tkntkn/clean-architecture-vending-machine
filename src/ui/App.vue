<script setup lang="ts">
import { computed, ref } from "vue";
import { getUserByEmail } from "../adapter/getUserByEmail";
import { requestRegister } from "../adapter/requestRegister";
import { getRegisteringStateFeedback, register, RegisteringState } from "../business/useCase/register";
import { toBusinessState } from "../common/state";

const registeringState = ref<RegisteringState>("none");
const email = ref<string>("");
const name = ref<string>("");

function handleRegisterClick() {
  const user = { email: email.value, name: name.value };
  return register(user, { registeringState: toBusinessState(registeringState) }, { requestRegister, getUserByEmail });
}

const feedback = computed(() => getRegisteringStateFeedback(registeringState.value));
</script>
<template>
  <main>
    <p v-if="feedback">{{ feedback }}</p>
    <input type="email" v-model="email" />
    <input type="text" v-model="name" />
    <button @click="handleRegisterClick">Register</button>
  </main>
</template>

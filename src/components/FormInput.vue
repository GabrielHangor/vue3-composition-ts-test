<template>
  <div class="field">
    <label class="label" :name="name">{{ name }}</label>
    <div class="control">
      <input
        :type="type"
        class="input"
        :class="{ 'is-success': !error, 'is-danger': error }"
        :value="modelValue"
        @input="handleInput"
      />
    </div>
    <p class="is-danger help">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps({
  name: { type: String, required: true },
  type: { type: String, default: 'text' },
  modelValue: { type: String, required: true },
  error: { type: String },
});

const emit = defineEmits<{ (event: 'update:modelValue', e: string): void }>();

const handleInput = (e: Event) => {
  emit('update:modelValue', (e.target as HTMLInputElement).value);
};
</script>

<style></style>

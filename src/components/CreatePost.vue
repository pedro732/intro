<template>
    <div>
      <h2>Crea un nuevo post</h2>
      <form @submit.prevent="submitForm">
        <div>
          <label for="title">Titulo:</label>
          <input id="title" v-model="title" required>
        </div>
        <div>
          <label for="content">Contenido:</label>
          <textarea id="content" v-model="content" required></textarea>
        </div>
        <button type="submit">Crear post</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        title: '',
        content: ''
      };
    },
    methods: {
      submitForm() {
        this.$emit('new-post', {
          title: this.title,
          content: this.content
        });
        this.title = '';
        this.content = '';
      }
    }
  };
  </script>
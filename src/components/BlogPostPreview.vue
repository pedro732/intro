<template>
    <div>
      <h2>{{ post.title }}</h2>
      <p>{{ post.content.substring(0, 100) }}...</p>
      <button @click="editPost">Editar</button>
      <button @click="deletePost">Borrar</button>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      post: {
        type: Object,
        required: true
      }
    },
    methods: {
      editPost() {
        this.$emit('edit', this.post);
      },
      deletePost() {
        this.$emit('delete', this.post);
      }
    }
  };
  </script>
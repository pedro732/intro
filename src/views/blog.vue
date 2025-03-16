<template>
    <barranavegacion/>
    <div>
      <CreatePost @new-post="addPost" />
  
      <div v-for="post in posts" :key="post.id">
        <BlogPostPreview :post="post" @edit="editPost" @delete="deletePost" />
      </div>
  
      <BlogPost v-if="selectedPost" :post="selectedPost" />
    </div>
  </template>
  
  <script>
  import barranavegacion from '../components/barranavegacion.vue';
  import CreatePost from '../components/CreatePost.vue';
  import BlogPostPreview from '../components/BlogPostPreview.vue';
  import BlogPost from '../components/BlogPost.vue';
  
  export default {
    name:'BlogView',
    components: {
      CreatePost,
      BlogPostPreview,
      BlogPost,
      barranavegacion,
    },
    data() {
      return {
        posts: [],
        selectedPost: null
      };
    },
    methods: {
      addPost(post) {
        this.posts.push(post);
      },
      editPost(post) {
        this.selectedPost = post;
      },
      deletePost(post) {
        this.posts = this.posts.filter(p => p.id !== post.id);
      }
    }
  };
  </script>
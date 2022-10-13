<script>
export default {
  name: 'HeroBanner',
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: false,
      default: ''
    }
  }
}
</script>
<template>
  <div class="hero-banner">
    <div class="hero-banner__images" />
    <h1 class="hero-banner__title">
      {{ title }}
    </h1>
    <p class="hero-banner__desc">
      {{ description }}
    </p>
  </div>
</template>

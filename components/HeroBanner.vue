<script>
export default {
  name: 'HeroBanner',
  props: {
    imagePath: {
      type: String,
      request: true,
      default: ''
    },
    title: {
      type: String,
      request: true,
      default: ''
    },
    description: {
      type: String,
      request: false,
      default: ''
    }
  }
}
</script>
<template>
  <div class="hero-banner">
    <img :src="imagePath" :alt="title" class="hero-banner__img">
    <img :src="require('@/assets/images/V_redraw-without-bg-1_9.png')" alt="background img" class="hero-banner__bkg-img">
    <h1 class="hero-banner__title">
      {{ title }}
    </h1>
    <p class="hero-banner__desc">
      {{ description }}
    </p>
    <div class="rectangle-4" />
  </div>
</template>

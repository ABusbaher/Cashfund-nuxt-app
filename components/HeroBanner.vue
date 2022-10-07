<script>
export default {
  name: 'HeroBanner',
  props: {
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
    <div class="hero-banner__main-img"></div>
    <div class="hero-banner__bkg-img"></div>
    <h1 class="hero-banner__title">
      {{ title }}
    </h1>
    <p class="hero-banner__desc">
      {{ description }}
    </p>
    <div class="rectangle-4" />
  </div>
</template>

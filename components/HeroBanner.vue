<script>
export default {
  name: 'HeroBanner',
  props: {
    imagePath: {
      type: String,
      request: true
    },
    title: {
      type: String,
      request: true
    },
    description: {
      type: String,
      request: false
    }
  }
}
</script>
<template>
  <div class="banner-container">
    <div class="hero-banner">
<!--      <img :src="imagePath" :alt="title" class="hero-banner__img">-->
<!--      <img :src="require('@/assets/images/V_redraw-without-bg-1_9.png')" alt="background img" class="hero-banner__bkg-img">-->
      <div class="hero-banner__img"></div>
      <div class="hero-banner__bkg-img"></div>
      <h1 class="hero-banner__title">
        {{ title }}
      </h1>
      <p class="hero-banner__desc">
        {{ description }}
      </p>
      <div class="hero-banner__rectangle-4"></div>
    </div>
    <div class="rectangle-6" ></div>
  </div>
</template>

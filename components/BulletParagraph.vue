<script>
export default {
  name: 'BulletParagraph',
  props: {
    number: {
      type: String,
      request: true,
      default: '01'
    },
    title: {
      type: String,
      request: true,
      default: ''
    },
    description: {
      type: String,
      request: true,
      default: ''
    },
    bkgColor: {
      type: String,
      request: false,
      default: 'white'
    }
  }
}
</script>

<template>
  <div class="bullet-paragraph" :style="{ 'background-color': bkgColor }">
    <div class="bullet-paragraph__title">
      <span class="bullet-paragraph__title__number">{{ number }}</span>
      <h3>{{ title }}</h3>
    </div>
    <p>{{ description }}</p>
  </div>
</template>

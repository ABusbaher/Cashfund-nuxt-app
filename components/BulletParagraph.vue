<script>
export default {
  name: 'BulletParagraph',
  props: {
    number: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    bkgColor: {
      type: String,
      required: false,
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

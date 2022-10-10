<script>
import TheButton from '@/components/TheButton.vue'

export default {
  name: 'ContentParagraph',
  components: {
    TheButton
  },
  props: {
    subtitle: {
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
    },
    link: {
      type: String,
      request: true,
      default: '/'
    },
    buttonText: {
      type: String,
      request: true,
      default: ''
    }
  }
}
</script>
<template>
  <div class="paragraph-container">
    <div class="paragraph-content">
      <h4>{{ subtitle.toUpperCase() }}</h4>
      <h2>{{ title }}</h2>
      <div class="paragraph-content__desc">
        <hr>
        <p>{{ description }}</p>
      </div>
      <nuxt-link :to="link">
        <TheButton :text="buttonText" />
      </nuxt-link>
    </div>
    <slot name="main" />
  </div>
</template>

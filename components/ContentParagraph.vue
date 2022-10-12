<script>
import RedirectButton from '@/components/RedirectButton.vue'

export default {
  name: 'ContentParagraph',
  components: {
    RedirectButton
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
    buttonLink: {
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
      <span class="paragraph-content__subtitle">
        {{ subtitle }}
      </span>
      <h2>{{ title }}</h2>
      <p class="paragraph-content__desc">
        {{ description }}
      </p>
      <RedirectButton :text="buttonText" :link="buttonLink" />
    </div>
    <slot name="main" />
  </div>
</template>

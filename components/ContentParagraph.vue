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
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: false,
      default: ''
    },
    buttonLink: {
      type: String,
      required: true
    },
    buttonText: {
      type: String,
      required: true
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
    <slot name="aside" />
  </div>
</template>

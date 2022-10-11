<script>
import TheHeader from '@/components/TheHeader.vue'
import TheFooter from '@/components/TheFooter.vue'

export default {
  components: {
    TheHeader,
    TheFooter
  }
}
</script>

<template>
  <div class="main-container">
    <TheHeader />
    <Nuxt />
    <TheFooter />
  </div>
</template>

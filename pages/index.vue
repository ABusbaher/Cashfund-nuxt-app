<script>
import HeroBanner from '@/components/HeroBanner.vue'
export default {
  name: 'IndexPage',
  components: {
    HeroBanner
  }
}
</script>
<template>
  <div>
    <HeroBanner
      title="A special purpose investment company"
      description="You invest in our deep domain expertise"
      :image-path="require('@/assets/images/pexels-pixabay-372470_1.png')"
    />
  </div>
</template>

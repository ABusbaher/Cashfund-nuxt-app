<script>
export default {
  name: 'TheHeader',
  data () {
    return {
      screenWidth: process.client ? window.innerWidth : 0,
      showLinks: false,
      links: [
        {
          title: 'Home',
          href: '/'
        },
        {
          title: 'About',
          href: '/about'
        },
        {
          title: 'Contact',
          href: '/contact'
        }
      ]
    }
  },
  mounted () {
    if (this.screenWidth > 1024) {
      this.showLinks = true;
    }
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
    })
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize);
  },
  methods: {
    hideLinksForMobile () {
      if (this.screenWidth < 1025) {
          return this.showLinks = false;
      }
      return this.showLinks = true;
    },
    onResize() {
      this.screenWidth = window.innerWidth;
    }
  },
  watch: {
    screenWidth(newValue) {
      if (newValue > 1024) {
        return this.showLinks = true;
      }
      return this.showLinks = false;
    }
  }
}
</script>

<template>
  <div class="nav">
    <div class="nav__menu">
      <NuxtLink class="nav__menu__logo" to="/">
        <img class="nav__menu__logo__img" src="@/assets/images/icons/logo.svg" alt="logo">
      </NuxtLink>
      <div class="nav__menu__icon" @click="showLinks = !showLinks">
        <img class="nav__menu__icon__img" src="@/assets/images/menu.png" alt="menu">
      </div>
    </div>
    <ul v-show="showLinks" class="nav__menu-links">
      <li v-for="link in links" :key="link.href" class="nav__menu-links__link" @click="hideLinksForMobile()">
        <nuxt-link :to="link.href">
          {{ link.title }}
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

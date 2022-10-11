<script>
export default {
  name: 'TheHeader',
  data () {
    return {
      // screenWidthProp: process.client ? window.innerWidth : 0,
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
    if (process.client) {
      if (window.innerWidth > 540) {
        this.showLinks = true
      }
    }
  },
  methods: {
    hideLinksForMobile () {
      if (process.client) {
        if (window.innerWidth < 541) {
          this.showLinks = false
        }
      }
    }
  }
  // computed: {
  //   screenWidth() {
  //     if (process.client) {
  //       return window.innerWidth;
  //     }
  //     return 0;
  //   }
  // },
  // watch: {
  //   screenWidthProp(newValue, oldValue) {
  //     if (newValue > 540) {
  //       this.showLinks = true;
  //       console.log(this.screenWidthProp);
  //     }
  //     this.showLinks = false;
  //     console.log(oldValue);
  //   }
  // }
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

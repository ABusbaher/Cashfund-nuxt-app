<script>
export default {
  name: 'TheHeader',
  mounted() {
    if (screen.width > 540) {
      this.showLinks = true;
    }
  },
  data () {
    return {
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
      <li v-for="link in links" :key="link.href" class="nav__menu-links__link">
        <nuxt-link :to="link.href">
          {{ link.title }}
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

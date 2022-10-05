<script>
import LogoNameSVG from "@/components/LogoNameSVG.vue"

export default {
  name: 'TheHeader',
  components: {
    LogoNameSVG,
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
        <img class="nav__menu__logo__img" src="@/assets/images/Vector.png" alt="logo">
        <LogoNameSVG/>
      </NuxtLink>
      <div class="nav__menu__icon" @click="showLinks = !showLinks">
        <img class="nav__menu__icon__img" src="@/assets/images/menu.png" alt="menu">
      </div>
    </div>
      <ul class="nav__menu-links" v-show="showLinks">
        <li class="nav__menu-links__link" v-for="link in links" :key="link.href">
          <nuxt-link :to="link.href">
            {{ link.title }}
          </nuxt-link>
        </li>
      </ul>

  </div>
</template>

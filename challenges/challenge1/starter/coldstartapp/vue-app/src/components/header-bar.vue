<script>
import HeaderBarBrand from '@/components/header-bar-brand.vue';
import AuthLogin from '@/components/auth-login.vue';
import AuthLogout from '@/components/auth-logout.vue';
import getUserInfo from '../assets/js/userInfo';

export default {
  name: 'HeaderBar',
  components: {
    HeaderBarBrand,
    AuthLogin,
    AuthLogout,
  },
  data() {
    return {
      user: undefined,
    };
  },
  async created() {
    this.user = await getUserInfo();
  },
  methods: {
  },
};
</script>

<template>
  <header>
    <nav class="navbar is-white" role="navigation" aria-label="main navigation">
      <HeaderBarBrand></HeaderBarBrand>
      <div class="navbar-menu">
        <div class="navbar-start">
          <router-link class="navbar-item nav-home" to="/">Home</router-link>
        </div>
        <div class="navbar-end">
          <template v-if="!user">
            <div class="navbar-item">
              <b>Login with</b>
            </div>
            <div class="navbar-item">
              <AuthLogin provider="github" />
            </div>
          </template>
          <template v-if="user">
            <div class="navbar-item">
              {{ user.userDetails }}
            </div>
            <div class="navbar-item">
              <AuthLogout  />
            </div>
          </template>
        </div>
        </div>
    </nav>
  </header>
</template>

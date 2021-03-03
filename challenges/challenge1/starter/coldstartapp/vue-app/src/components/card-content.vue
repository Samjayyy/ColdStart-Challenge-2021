<script>
import { mapActions } from 'vuex';
import ButtonFooter from '@/components/button-footer.vue';
import getUserInfo from '@/assets/js/userInfo';

export default {
  components: {
    ButtonFooter,
  },
  name: 'CardContent',
  props: {
    id: {
      type: Number,
      default: () => -1,
    },
    name: {
      type: String,
      default: () => '',
    },
    description: {
      type: String,
      default: () => '',
    },
    imageurl: {
      type: String,
      default: () => '',
    },
  },
  data() {
    return {
      user: undefined,
      message: '',
    };
  },
  async created() {
    this.user = await getUserInfo();
  },
  methods: {
    ...mapActions('orders', ['orderProductAction']),
    async order() {
      this.resetMessage();
      try {
        await this.orderProductAction(this.id);
        this.message = 'Your order is being processed.';
      } catch (error) {
        this.message = 'Something went wrong.';
      }
    },
    async resetMessage() {
      this.message = undefined;
    },
  },
};
</script>

<template>
  <div class="card-content">
    <header class="card-header">
      <p class="card-header-title">{{ name }}</p>
    </header>

    <div class="content">
      <div class="catalog-image">
        <img v-bind:src="imageurl" />
      </div>
      <p class="description">{{ description }}</p>
    </div>
    <div class="card-footer" v-if="!!user">
      <ButtonFooter v-if="!message" @clicked="order" label="Order"></ButtonFooter>
      <div class="card-footer-item" v-if="!!message">
        {{message}}
        <button v-on:click="resetMessage">Close</button>
      </div>
    </div>
  </div>
</template>

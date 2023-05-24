<template>
  <div class="main-layout flex bg-indigo-50">
    <router-view v-slot="{ Component }">
      <transition name="page" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script>
export default {
  name: 'MainLayout',

  components: {},

  computed: {},

  mounted () {},

  methods: {}
}
</script>
<template>
  <div class="flex my-20">
    <div class="w-full">
      <h1 class="mb-4 font-semibold text-3xl text-gray-900">
        404 Page not found!
      </h1>
      <div class="links">
        <router-link :to="{ name: 'home' }" class="hover:underline text-gray-700">
          Go to Home
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFound'
}
</script>
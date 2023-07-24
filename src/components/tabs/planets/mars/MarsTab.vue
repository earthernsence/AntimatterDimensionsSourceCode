<script>
import ClassicSolarDimensionsTab from "@/components/tabs/planets/mars/ClassicSolarDimensionsTab";
import ModernSolarDimensionsTab from "@/components/tabs/planets/mars/ModernSolarDimensionsTab";

export default {
  name: "MarsTab",
  components: {
    ClassicSolarDimensionsTab,
    ModernSolarDimensionsTab
  },
  computed: {
    activeComponent() {
      return this.$viewModel.newUI
        ? "ModernSolarDimensionsTab"
        : "ClassicSolarDimensionsTab";
    }
  }
};
</script>

<template>
  <component :is="activeComponent" />
</template>

<style scoped>

</style>
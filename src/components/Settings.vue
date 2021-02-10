<template>
  <v-container>
    <v-card>
      <v-card-title>設定</v-card-title>
      <LinkBonusLevels class="ma-4" />
      <v-card-actions />
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import LinkBonusLevels from "@/components/LinkBonusLevels.vue";

@Component({
  components: { LinkBonusLevels },
})
export default class Settings extends Vue {}
</script>
<style lang="scss" module></style>

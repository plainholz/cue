<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">CUE! のリンクボーナス</div>
      <template v-slot:extension>
        <v-tabs v-model="activeTab" align-with-title>
          <v-tabs-slider color="yellow"></v-tabs-slider>

          <v-tab v-for="tab in tabs" :key="tab.header">
            {{ tab.header }}
          </v-tab>
        </v-tabs>
      </template>
    </v-app-bar>

    <v-main>
      <router-view class="mt-4" />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

class Tab {
  header: string;
  path: string;
  constructor(header: string, path: string) {
    this.header = header;
    this.path = path;
  }
}

@Component({
  components: {},
})
export default class App extends Vue {
  tabs = [
    new Tab("検索", "/link-bonus-search"),
    new Tab("発動状況", "/active-link-bonus"),
    new Tab("設定", "/settings"),
  ];
  get activeTab(): number {
    const tabIndex = this.tabs.findIndex(
      (tab) => tab.path === this.$route.path
    );
    return tabIndex < 0 ? 0 : tabIndex;
  }
  set activeTab(index: number) {
    const path = this.tabs[index].path;
    if (this.$route.path !== path) {
      this.$router.push(path);
    }
  }
}
</script>

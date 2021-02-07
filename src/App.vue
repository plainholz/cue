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
import LinkBonusSelect from "@/components/LinkBonusSelect.vue";
import LinkBonusSearch from "@/components/LinkBonusSearch.vue";
import Settings from "@/components/Settings.vue";

class Tab {
  header: string;
  component: object;
  path: string;
  constructor(header: string, component: object, path: string) {
    this.header = header;
    this.component = component;
    this.path = path;
  }
}

@Component({
  components: { LinkBonusSelect, LinkBonusSearch, Settings },
})
export default class App extends Vue {
  tabs = [
    new Tab("検索", LinkBonusSearch, "/link-bonus-search"),
    new Tab("発動状況", LinkBonusSelect, "/active-link-bonus"),
    new Tab("設定", Settings, "/settings"),
  ];
  get activeTab() {
    const tabIndex = this.tabs.findIndex(tab => tab.path === this.$route.path);
    return tabIndex < 0 ? 0 : tabIndex;
  }
  set activeTab(index) {
    const path = this.tabs[index].path;
    if (this.$route.path !== path) {
      this.$router.push(path);
    }
  }
}
</script>

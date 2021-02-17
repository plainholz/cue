<template>
  <v-card class="pa-4">
    <v-card-title>リンクボーナスレベル</v-card-title>
    <div class="mx-4 mb-4">
      <v-text-field label="リンクボーナス名検索" v-model="searchText" />
    </div>
    <div
      v-for="linkBonusLevel in filterdLinkBonusLevels"
      :key="linkBonusLevel.name"
      class="pb-4"
    >
      <div :class="$style.name">{{ linkBonusLevel.name }}</div>
      <v-slider
        v-model="linkBonusLevel.level"
        :min="0"
        :max="10"
        :tick-labels="tickLabels"
        ticks="always"
        step="1"
        tick-size="2"
        @change="changeLevel(linkBonusLevel.key, linkBonusLevel.name, $event)"
      >
        <template v-slot:prepend>
          <span :class="$style.level">{{ displayLevel(linkBonusLevel) }}</span>
        </template>
      </v-slider>
    </div>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { LinkBonusValues } from "@/models/linkbonus";
import { State } from "@/store/index";

class LinkBonusLevel {
  key: string;
  name: string;
  level: number;
  constructor(key: string, name: string, level?: number) {
    this.key = key;
    this.name = name;
    this.level = level === undefined ? 1 : level;
  }
}

@Component({
  components: {},
})
export default class LinkBonusLevels extends Vue {
  linkBonusLevels: { [key: string]: LinkBonusLevel } = {};
  tickLabels: string[] = [];
  searchText = "";
  created(): void {
    const linkBonusLevels = (this.$store.state as State).linkBonusLevels;
    for (const key in LinkBonusValues) {
      const linkBonus = LinkBonusValues[key];
      this.linkBonusLevels[key] = new LinkBonusLevel(
        key,
        linkBonus.name,
        linkBonusLevels[key]
      );
    }
    for (let i = 0; i <= 10; i++) {
      this.tickLabels[i] = `${i}`;
    }
  }
  displayLevel(linkBonusLevel: LinkBonusLevel): string {
    if (linkBonusLevel.level === 0) {
      return "未解放";
    }
    if (linkBonusLevel.level === 10) {
      return "MAX";
    }
    return `Lv.${linkBonusLevel.level}`;
  }
  changeLevel(key: string, name: string, value: number): void {
    this.$store.commit("setLinkBonusLevel", {
      key: key,
      value: value,
    });
    const linkBonusLevel = new LinkBonusLevel(key, name, value);
    this.$set(this.linkBonusLevels, key, linkBonusLevel);
  }
  get filterdLinkBonusLevels(): { [key: string]: LinkBonusLevel } {
    if (this.searchText) {
      const linkBonusLevels: { [key: string]: LinkBonusLevel } = {};
      for (const key in this.linkBonusLevels) {
        const linkBonus = this.linkBonusLevels[key];
        if (linkBonus.name.includes(this.searchText)) {
          linkBonusLevels[key] = linkBonus;
        }
      }
      return linkBonusLevels;
    } else {
      return this.linkBonusLevels;
    }
  }
}
</script>
<style lang="scss" module>
.name {
  font-size: 18px;
}
.level {
  min-width: 50px;
  font-size: 14px;
  color: #888;
  padding-top: 12px;
}
</style>

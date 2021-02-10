<template>
  <v-container>
    <v-card>
      <v-card-title>検索条件</v-card-title>
      <div :class="$style.flex">
        <v-card class="ma-4 pa-4" max-width="340">
          <div>種類 (人数)</div>
          <v-btn-toggle
            v-model="numberOfPeople"
            mandatory
            @change="updateNumberOfPeople"
          >
            <v-btn :value="4">レッスン用<br :class="$style.br" />(4人)</v-btn>
            <v-btn :value="5">お仕事用<br :class="$style.br" />(5人)</v-btn>
          </v-btn-toggle>
          <v-checkbox
            label="LvMAXを対象外にする"
            v-model="ignoreLevelMax"
            v-if="numberOfPeople === 4"
            @change="updateIgnoreLevelMax"
          />
        </v-card>
        <v-card class="ma-4 pa-4" max-width="340">
          <div>発動リンクボーナスの数</div>
          <v-btn-toggle
            v-model="numberOfActive"
            multiple
            mandatory
            @change="updateNumberOfActive"
          >
            <v-btn :value="2">2</v-btn>
            <v-btn :value="3">3</v-btn>
            <v-btn :value="4">4</v-btn>
            <v-btn :value="5">5</v-btn>
            <v-btn :value="6">6</v-btn>
          </v-btn-toggle>
        </v-card>
      </div>
      <v-card class="ma-4 pa-4" max-width="600">
        <div>対象メンバー</div>
        <MemberSelect
          :selected="selectedMember"
          :members="members"
          @select="updateSelected"
        />
      </v-card>
      <v-card-actions>
        <v-btn @click="search" class="ma-2">検索</v-btn>
      </v-card-actions>
    </v-card>
    <v-card class="mt-8">
      <v-data-table
        :items="searchResult"
        :headers="resultHeaders"
        sort-by="numberOfActive"
        :sort-desc="true"
        :loading="searchLoding"
        loading-text="検索中"
      >
        <template v-slot:[`item.linkBonus`]="{ item }">
          <div :class="$style.resultLinkBonus">
            <div v-for="linkBonus in item.linkBonus" :key="linkBonus">
              {{ linkBonus }}
            </div>
          </div>
        </template>
        <template v-slot:[`item.members`]="{ item }">
          <div :class="$style.resultMembers">
            <div v-for="member in item.members" :key="member.name">
              {{ member.name }}
            </div>
          </div>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { LinkBonus, LinkBonusValues } from "@/models/linkbonus";
import { Member, Members } from "@/models/member";
import MemberSelect from "@/components/MemberSelect.vue";
import { State } from "@/store/index";

class SearchResult {
  numberOfActive: number;
  linkBonus: string[];
  members: Member[];
  memberValue: number;
  constructor(linkBonusArray: LinkBonus[], memberValue: number) {
    this.numberOfActive = linkBonusArray.length;
    this.linkBonus = linkBonusArray.map((linkBonus) => linkBonus.name);
    this.members = Members.filter((member) => member.value & memberValue);
    this.memberValue = memberValue;
  }
}

@Component({
  components: { MemberSelect },
})
export default class LinkBonusSearch extends Vue {
  resultHeaders = [
    { text: "発動数", value: "numberOfActive", align: "center", width: 100 },
    { text: "リンクボーナス", value: "linkBonus", sortable: false },
    { text: "メンバー", value: "members", sortable: false },
  ];
  numberOfPeople = 5;
  numberOfActive: number[] = [];
  selectedMember = 0;
  members: Member[] = [];
  searchResult: SearchResult[] = [];
  searchLoding = false;
  ignoreLevelMax = false;
  linkBonusLevels: { [name: string]: number } = {};
  created(): void {
    const state = this.$store.state as State;
    this.numberOfPeople = state.numberOfPeople;
    this.numberOfActive = state.numberOfActive;
    this.ignoreLevelMax = state.ignoreLevelMax;
    this.selectedMember = state.selectedMember;
    this.members = Members;
    this.linkBonusLevels = (this.$store.state as State).linkBonusLevels;
  }

  async search(): Promise<void> {
    this.searchResult = [];
    this.searchLoding = true;

    const linkBonusLevels =
      this.numberOfPeople === 4 && this.ignoreLevelMax
        ? this.linkBonusLevels
        : undefined;

    const result = await this.searchAll(
      this.numberOfPeople,
      this.numberOfActive,
      linkBonusLevels
    );
    if (this.selectedMember) {
      this.searchResult = result.filter((searchResult) => {
        return (
          (searchResult.memberValue & this.selectedMember) ===
          this.selectedMember
        );
      });
    } else {
      this.searchResult = result;
    }
    this.searchLoding = false;
  }

  async searchAll(
    numberOfPeople: number,
    numberOfActive: number[],
    linkBonusLevels?: { [name: string]: number }
  ): Promise<SearchResult[]> {
    return new Promise((resolve) => {
      const result: SearchResult[] = [];
      const values = this.combination(0, 0, 0, numberOfPeople);
      values.forEach((value) => {
        const activeLink: LinkBonus[] = [];
        for (const key in LinkBonusValues) {
          const link = +key;
          if (
            (link & value) === link &&
            (!linkBonusLevels ||
              !linkBonusLevels[key] ||
              linkBonusLevels[key] < 10)
          ) {
            activeLink.push(LinkBonusValues[key]);
          }
        }
        if (numberOfActive.includes(activeLink.length)) {
          result.push(new SearchResult(activeLink, value));
        }
      });
      resolve(result);
    });
  }

  combination(
    value: number,
    index: number,
    length: number,
    maxlength: number
  ): number[] {
    if (index + maxlength - length > 16) {
      return [];
    }
    if (length === maxlength) {
      return [value];
    }
    return this.combination(
      value + 2 ** index,
      index + 1,
      length + 1,
      maxlength
    ).concat(this.combination(value, index + 1, length, maxlength));
  }

  updateNumberOfActive(value: number[]): void {
    this.$store.commit("setNumberOfActive", value);
  }
  updateNumberOfPeople(value: number): void {
    this.$store.commit("setNumberOfPeople", value);
  }
  updateIgnoreLevelMax(value: boolean): void {
    this.$store.commit("setIgnoreLevelMax", value);
  }
  updateSelected(selected: number): void {
    this.selectedMember = selected;
    this.$store.commit("setSelectedMember", selected);
  }
}
</script>
<style lang="scss" module>
.member {
  text-align: center;
}
.flex {
  display: flex;
  flex-wrap: wrap;
}
.br {
  display: none;
}
.resultLinkBonus {
  margin: 10px 0;
}
.resultMembers {
  margin: 10px 0;
}
@media screen and (max-width: 340px) {
  .br {
    display: inline;
  }
}
</style>

<template>
  <v-container>
    <v-card>
      <v-card-title>対象メンバー</v-card-title>
      <div class="ml-4" :class="$style.members">
        <MemberSelect
          :selected="selectedMember"
          :members="members"
          @select="updateSelected"
        />
      </div>
      <v-card-actions>
        <v-btn color="accent" @click="reset" class="ma-4">リセット</v-btn>
      </v-card-actions>
    </v-card>
    <v-card v-if="activeLinkBonus.length > 0" class="mt-4">
      <v-list>
        <v-list-item v-for="linkBonus in activeLinkBonus" :key="linkBonus.name">
          <v-list-item-content>
            <v-list-item-title v-text="linkBonus.name" />
            <div v-for="member in linkBonus.members" :key="member.name">
              {{ member.name }}
            </div>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { LinkBonus, LinkBonusValues } from "@/models/linkbonus";
import { Member, Members } from "@/models/member";
import MemberSelect from "@/components/MemberSelect.vue";

@Component({
  components: { MemberSelect },
})
export default class LinkBonusSelect extends Vue {
  selectedMember = 0;
  members: Member[] = [];

  created(): void {
    this.members = Members;
  }

  get activeLinkBonus(): LinkBonus[] {
    const result = [];
    for (const key in LinkBonusValues) {
      const value = +key;
      if ((value & this.selectedMember) === value) {
        result.push(LinkBonusValues[value]);
      }
    }

    return result;
  }

  reset(): void {
    this.selectedMember = 0;
  }

  updateSelected(selected: number): void {
    this.selectedMember = selected;
  }
}
</script>
<style lang="scss" module>
.members {
  max-width: 600px;
}
</style>

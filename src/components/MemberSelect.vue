<template>
  <div class="pt-4">
    <div :class="$style.members">
      <div v-for="member in members" :key="member.name" :class="$style.member">
        <v-btn
          :class="{ primary: isActive(member) }"
          @click="toggle(member)"
          block
          >{{ member.name }}</v-btn
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from "vue-property-decorator";
import { Member } from "@/models/member";

@Component({
  components: {},
})
export default class MemberSelect extends Vue {
  @Prop()
  members!: Member[];

  @Prop()
  selected!: number;

  @Emit("select")
  public select(value: number): void {} // eslint-disable-line

  toggle(member: Member): void {
    this.select(this.selected ^ member.value);
  }

  isActive(member: Member): boolean {
    return !!(this.selected & member.value);
  }
}
</script>

<style lang="scss" module>
.members {
  display: flex;
  flex-wrap: wrap;
}
.member {
  width: 120px;
  margin-right: 16px;
  padding-bottom: 16px;
}
</style>

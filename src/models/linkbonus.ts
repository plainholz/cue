import { Member, Members } from "@/models/member";

export class LinkBonus {
  members: Member[];
  constructor(
    public membersValue: number,
    public name: string,
    public count: number
  ) {
    this.members = Members.filter((member) => member.value & membersValue);
  }
}

export const LinkBonusValues: { [key: number]: LinkBonus } = {
  9: new LinkBonus(9, "がんばりやさん", 2),
  15: new LinkBonus(15, "魔法少女隊", 4),
  34: new LinkBonus(34, "ボンビーガール", 2),
  65: new LinkBonus(65, "振り回されがちな人たち", 2),
  96: new LinkBonus(96, "憧れのかたち", 2),
  240: new LinkBonus(240, "妖精のうたげ", 4),
  260: new LinkBonus(260, "和菓子美人", 2),
  529: new LinkBonus(529, "お弁当女子", 3),
  1026: new LinkBonus(1026, "ラーメン同盟", 2),
  1040: new LinkBonus(1040, "美味いものセンサー", 2),
  1056: new LinkBonus(1056, "屋上の住人", 2),
  2056: new LinkBonus(2056, "運動っていいよね！", 2),
  2176: new LinkBonus(2176, "おしゃれさん", 2),
  2304: new LinkBonus(2304, "おせっかいお姉さん", 2),
  3840: new LinkBonus(3840, "いただきます！", 4),
  4120: new LinkBonus(4120, "風呂好き同盟", 3),
  4128: new LinkBonus(4128, "メイド喫茶の方たち", 2),
  4353: new LinkBonus(4353, "真面目さん", 3),
  6272: new LinkBonus(6272, "買いものだいすき！", 3),
  8194: new LinkBonus(8194, "自分に素直なだけっ", 2),
  8704: new LinkBonus(8704, "クールビューティー", 2),
  8712: new LinkBonus(8712, "高身長女子", 3),
  12288: new LinkBonus(12288, "悪魔声優コンビ", 2),
  16400: new LinkBonus(16400, "食べるの大好き", 2),
  16402: new LinkBonus(16402, "愛すべきバカ", 3),
  16464: new LinkBonus(16464, "怒られがちな人たち", 3),
  16897: new LinkBonus(16897, "動物は癒やし！", 3),
  18688: new LinkBonus(18688, "うわばみ女子", 3),
  32770: new LinkBonus(32770, "ゲーマー女子", 2),
  32836: new LinkBonus(32836, "我が道征く女子", 3),
  32896: new LinkBonus(32896, "実は国際派？", 2),
  32960: new LinkBonus(32960, "ノブレス・オブリージュ", 3),
  33796: new LinkBonus(33796, "朝は苦手……", 3),
  61440: new LinkBonus(61440, "モノクロ鎮魂歌", 4),
};

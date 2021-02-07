export class Member {
  value: number;
  constructor(public name: string, public index: number) {
    this.value = 2 ** index;
  }
}

const memberList = [
  "六石陽菜",
  "鷹取舞花",
  "鹿野志穂",
  "月居ほのか",
  "天童悠希",
  "赤川千紗",
  "恵庭あいり",
  "九条柚葉",
  "夜峰美晴",
  "神室絢",
  "宮路まほろ",
  "日名倉莉子",
  "丸山利恵",
  "宇津木聡里",
  "明神凛音",
  "遠見鳴",
];

export const Members = memberList.map((name, index) => new Member(name, index));

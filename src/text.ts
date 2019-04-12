// tslint:disable-next-line:max-line-length
export const s =  "黄石 maintain 恐龙🦖 movement 小母鸡🐥 🦖dinosaur 🐥pullet 篮球 弗吉尼亚 鸡肉挺嫩滑 德州理工 堪萨斯 拿来煮汤 北卡罗来纳 Duke wisdom 火箭🚀";

// tslint:disable-next-line:variable-name
let _lastIndex = -1;

export function getText(): string {
  const ss = s.split(" ");
  const index = (_lastIndex += 1) % ss.length;
  return ss[index];
}

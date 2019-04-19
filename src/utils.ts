/**
 * 获取随机概率
 * @param t 0~1 t越大概率越高
 */
export function random(t = .5): boolean {
  return Math.random() < t;
}

/**
 * 延迟指定的额时间
 * @param t 延迟毫秒数
 */
export function deley(t: number = 1000): Promise<void> {
  return new Promise((resolve: () => void) => {
    setTimeout(resolve, t);
  });
}

/**
 * 从给定的数组组随机返回一个成员
 * @param list
 */
export function pick<T>(list: T[]): T {
  if (!list || !list.length) { return; }
  const len = list.length;
  const index = Math.floor(Math.random() * len);
  return list[index];
}

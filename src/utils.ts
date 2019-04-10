/**
 * 获取随机概率
 * @param t 0~1 t越大概率越高
 */
export function random(t = .5): boolean {
  return Math.random() < t;
}
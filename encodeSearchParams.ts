/**
 * 拼接对象为请求字符串
 * @param {Object} obj - 待拼接的对象
 * @returns {string} - 拼接成的请求字符串
 */
export default function encodeSearchParams<T>(obj: T) {
  let params: string[] = []

  Object.keys(obj).forEach(key => {
    let value: string | number | boolean | undefined = obj[key]
    // 如果值为undefined我们将其置空
    if (typeof value === 'undefined') {
      value = ''
    }
    value = value.toString()
    // 对于需要编码的文本（比如说中文）我们要进行编码
    params.push(key + '=' + encodeURIComponent(value))
  })

  return params.join('&')
}
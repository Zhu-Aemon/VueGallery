function formatTime(seconds) {
  if (seconds === 0) {
    return '0:00'
  }
  // 忽略小数点后的数字并计算分钟数
  const minutes = Math.floor(seconds / 60)

  // 计算剩余的秒数
  const remainingSeconds = Math.floor(seconds % 60)

  // 格式化输出为 "分:秒" 的形式，如果秒数是个位数，前面补 0
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
}


export function formatDate(timestamp) {
  // console.log(timestamp)
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// console.log(formatDate(1344528000000))

export default formatTime

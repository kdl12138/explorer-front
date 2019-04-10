import bigNumber from "bignumber.js";
let formatNumber = (number) => {
  return (''+number).replace(/(\d)(?=(\d{3})+$)/g, "$1,")
};

let formatAgo = (time) => {
  let now = new Date().getTime()
  let dis = parseInt(now/1000) - time
  let s = dis%60
  let min = parseInt(dis%3600/60)
  let hour = parseInt(dis%(24 * 3600)/3600)
  let d = parseInt(dis/(24 * 3600))
  var str = ''
  if (d) {
    str = d + (d === 1 ? ' day ' : ' days ')
    str = str + (hour ? hour + (hour === 1 ? ' hour ' : ' hours ') : '')
  } else if (hour) {
    str = hour + (hour === 1 ? ' hour ' : ' hours ')
    str = str + (min ? min + (min === 1 ? ' min ' : ' mins ') : '')
  } else if (min) {
    str = min + (min === 1 ? ' min ' : ' mins ')
    str = str + (s ? (s + 's') : '')
  } else {
    str = s ? (s + 's') : ''
  }
  return str
}

let fixNum = (number, precision) => {
  if (!number) return 0
  return (+number).toFixed(precision)
}

let diliver = (num, precision) => {
  if (!num) return 0
  var val = new bigNumber(num).dividedBy(bigNumber(10).exponentiatedBy(precision))
  return val.toFixed(18).replace(/\.0+$/, "").replace(/(\.\d+[1-9])0+$/, "$1")
}

let upper = (str) => {
  if (!str) return 
  return str.toUpperCase()
}

export {
  formatNumber,
  formatAgo,
  fixNum,
  diliver,
  upper
}
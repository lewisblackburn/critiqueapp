export const formatMoney = (num: Number) => {
  return "£" + num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
}

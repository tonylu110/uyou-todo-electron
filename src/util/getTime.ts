import moment from "moment"

const getTime = (time: number): string => {
  const nowTime = moment().format("YYYY-MM-DD")
  const useTime = moment(time).format("YYYY-MM-DD")
  if (nowTime === useTime) {
    return moment(time).format("hh:mm A")
  } else {
    return moment(time).format("YYYY-MM-DD hh:mm A")
  }
}

export default getTime
import IOkStyle from "../interface/IOkStyle";

const getOkStyle = (ok: boolean): IOkStyle => {
  if (ok) {
    return {
      textDecoration: 'line-through',
      color: '#cebfae'
    }
  } else {
    return {
      textDecoration: '',
      color: ''
    }
  }
}

export default getOkStyle
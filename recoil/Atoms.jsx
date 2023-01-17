import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()

export const cartState = atom({
  key: 'cartState',
  default: [],
  effects_UNSTABLE: [persistAtom],
})

export const userState = atom({
  key: 'userState',
  default: {
    creditCards: [
        {brand: "visa", pins: "4384030012345678", date: '05/23', firstName: "Franck", name: 'Muhla', id: 1},
        {brand: "mastercard", pins: "1212121212124235", date: '10/24', firstName: "John", name: 'Doe', id: 2}
    ],
    activeCard: 2
  },
  effects_UNSTABLE: [persistAtom]
})

export const navbarState = atom({
  key: 'navbarState',
  default: {arrow: false, label: "Avenue", cart: true},
})

export const filterState = atom({
  key: 'filterState',
  default: {price: null, search: null, category: null}
})

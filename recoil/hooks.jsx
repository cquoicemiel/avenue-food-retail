import { useRecoilState } from 'recoil';

import {cartState, filterState, navbarState, userState} from './Atoms';

export const useAddProduct = () => {
  const [cart, setCart] = useRecoilState(cartState);
  
  return (product) => {
    const index = cart.findIndex(item => item.id === product.id);

    if (index === -1) {
      return setCart([...cart, { ...product, qty: 1 }]);
    }

    const newCart = cart.map((item, i) => {
      if(i === index) {
        return {
          ...item,
          qty: item.qty + 1,
        }
      }

      return item;
    })
    
    setCart(newCart)
  }
}

export const useRemoveProduct = () => {
  const [cart, setCart] = useRecoilState(cartState);
  
  return (product) => {

    if(product.qty > 1){
      const newCart = cart.map((item) => {
        if(item.id === product.id) {
          return {
            ...item,
            qty: item.qty - 1,
          }
        }

        return item;
      })

       setCart(newCart)

    }else {
      const newCart = cart.filter(item => item.id !== product.id)
      setCart(newCart)
    }
  }
}

export const useDeleteProduct = (product) => {

  const [cart, setCart] = useRecoilState(cartState);
  return (product) => {


      const newCart = cart.filter(item => item.id !== product.id)
        setCart(newCart)
      }
}

export const useUpdateActiveCard = () => {

  const [user, setUser] = useRecoilState(userState)

  return (id)  => {
    const updatedValues = {activeCard: id}
    setUser(data => ({
      ...data,
      ...updatedValues
    }))
  }
}

export const useUpdateNavbar = () => {

  const [navbar, setNavbar] = useRecoilState(navbarState)

  return (arrow, label, cart)  => {
    setNavbar({arrow: arrow, label: label, cart: cart})
  }
}


export const useClearCart = () => {
  const [cart, setCart] = useRecoilState(cartState);
  return () => {
    setCart([])
  }
}

export const useSetSearch = () => {
  const [filters, setFilters] = useRecoilState(filterState)
  return (search) => {
    setFilters(data => ({
      ...data,
      ...{search: search}
    }))
  }
}

export const useToggleSetCategory = () => {
  const [filters, setFilters] = useRecoilState(filterState)

  return (category) => {
    if(filters.categories.includes(category)){
      const updatedValues = {categories: filters.categories.filter(element => element !== category)}
      setFilters((data) => ({
        ...data,
        ...updatedValues
      }))
    }else{
      const updatedValues = {categories: filters.categories.concat(category)}
      setFilters((data) => ({
        ...data,
        ...updatedValues
      }))
    }
  }

  }

export const useToggleSetLabel = () => {
  const [filters, setFilters] = useRecoilState(filterState)

  return (label) => {
    if(filters.labels.includes(label)){
      const updatedValues = {labels: filters.labels.filter(element => element !== label)}
      setFilters((data) => ({
        ...data,
        ...updatedValues
      }))
    }else{
      const updatedValues = {labels: filters.labels.concat(label)}
      setFilters((data) => ({
        ...data,
        ...updatedValues
      }))
    }
  }

}



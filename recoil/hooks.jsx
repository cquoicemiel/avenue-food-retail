import { useRecoilState } from 'recoil';

import {cartState, navbarState, userState} from './Atoms';

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


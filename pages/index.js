import { Home } from '../components'
import {useEffect} from "react";

export default function Index() {

  useEffect(() => {
    document.body.style.overflowY = "hidden"
    return () => {
      document.body.style.overflowY = "auto"
    }
  })


  return (
    <Home/>
  )
}

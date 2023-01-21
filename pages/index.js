import { Home } from '../components'
import {useEffect} from "react";
import {useRouter} from "next/router";
import localFont from "@next/font/local";

const font = localFont({ src: '../assets/fonts/DxSitrus-Expanded.otf' })

export default function Index() {



  const router = useRouter()
  useEffect(() => {
    router.push('/shop')
  })

  useEffect(() => {
    document.body.style.overflowY = "hidden"
    return () => {
      document.body.style.overflowY = "auto"
    }
  })


  // return (
  //   <Home/>
  // )
  return(
      <div className={'bg-white fixed inset-0 z-30 flex justify-center items-center'}>
        <span className={`font-bold text-4xl w-1/3  text-center ${font.className}`}>Avenue</span>
      </div>
  )
}

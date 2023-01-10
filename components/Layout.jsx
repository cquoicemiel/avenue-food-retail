import {Navbar, Footer} from './'
import {useRecoilValue} from "recoil";
import {navbarState} from "../recoil/Atoms";

function Layout({children}) {

    const navbar = useRecoilValue(navbarState)

    return (
        <>
            <div className={'sm:hidden'}>
                {navbar ? <Navbar/> : null}
                <div className={`min-h-screen pt-16`}>{children}</div>
                <Footer/>
            </div>
            <span className='invisible sm:visible fixed flex h-screen w-screen justify-center items-center text-center font-black text-3xl px-12'>{"Le site est exclusivement disponible sur mobile pour le moment."}</span>
        </>
    )
}

export default Layout
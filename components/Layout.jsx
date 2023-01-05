import {Navbar, Footer} from './'

function Layout({children}) {

    return (
        <>
            <div className={'sm:hidden'}>
                <Navbar/>
                <div className={`min-h-screen pt-16`}>{children}</div>
                <Footer/>
            </div>
            <span className='invisible sm:visible fixed flex h-screen w-screen justify-center items-center text-center font-black text-3xl px-12'>{"Le site est exclusivement disponible sur mobile pour le moment."}</span>
        </>
    )
}

export default Layout
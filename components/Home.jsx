import Image from "next/image";
import Link from "next/link";

export default function Home() {


    return (
        <div className='fixed inset-0 bg-white w-screen h-full py-4 px-8'>
            <span className='text-red-600 text-3xl font-bold rotate-12 absolute pointer-events-none w-full inset-0 -top-12 h-full flex justify-center items-center'>
                <span className='p-2 bg-red-100 rounded-lg'>🚧 SITE EN DEV 🚧</span>
            </span>
            <Image className={'h-1/2 object-contain'} alt={"Illustration légumes"} src={require('../assets/images/home.webp')}/>
            <div className='flex flex-col items-center justify-evenly h-1/2'>
                <h1 className={'text-3xl font-black text-center'}>{"Tous vos produits d'épicerie, devant votre porte"}</h1>
                <desc className={'text-gray-500 text-center'}>Commandez des fruits et légumes frais ainsi que des produits animaliers, provenant de producteurs locaux</desc>
                <Link href={'/shop'} className={'text-white py-6 bg-green-600 rounded-full w-1/2 font-bold flex justify-center items-center'}>Découvrir</Link>
            </div>

        </div>
    )
}

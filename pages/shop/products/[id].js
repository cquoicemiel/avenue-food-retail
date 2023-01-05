import {getAllProducts, getProductData} from '../../../libs'
import {Article} from '../../../components'
import Image from "next/image";
import Link from "next/link";


export async function getStaticPaths(){
    const paths = getAllProducts()
    return {
        paths,
        fallback: false,
    }
}

export async function getStaticProps({params}){
    const productData = getProductData(params.id)
    return{
        props: {
            productData,
        }
    }

}


export default function Product({productData}){

    const Navbar = () => {
        return(
            // <div className='bg-white top-0 inset-x-0 fixed w-screen h-16 flex items-center justify-around shadow-sm'>
            //     <Link href={"/shop"} className='bg-gray-100 rounded-3xl h-7 sm:h-8 md:h-9 w-7 sm:w-8 md:w-9'>
            //         <Image alt={"Retourner aux produits"} className={"rotate-180"} src={require('../../../assets/images/blackarrow.webp')}/>
            //     </Link>
            //     <span className='font-semibold'>Angers, 49000</span>
            //     <span className='bg-gray-100 rounded-3xl h-7 sm:h-8 md:h-9 w-7 sm:w-8 md:w-9 p-1'>
            //         <Image alt={"Ajouter aux favoris"} className={""} src={require('../../../assets/images/heart.webp')}/>
            //     </span>
            // </div>
            <div className='h-16 flex fixed left-0 top-0 w-1/3 bg-white items-center justify-center'>
                <Link href={"/shop"} className='bg-gray-100 rounded-3xl h-8 w-8 p-1'>
                    <Image alt={"Retourner aux produits"} className={"rotate-180"} src={require('../../../assets/images/blackarrow.webp')}/>
                </Link>
            </div>
        )
    }
    return (
        <div style={{height: 'calc(100vh - 4rem)'}} className={'flex flex-col pt-4 pb-8 px-7'}>
            <Navbar/>
            <Article product={productData}/>
        </div>
    )
}




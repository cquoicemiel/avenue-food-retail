import {getAllProducts, getProductData} from '../../../libs'
import {Article} from '../../../components'
import Image from "next/image";
import Link from "next/link";
import {useState} from "react";


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

    const [effect, setEffect] = useState(false)
    return (
        <div style={{height: 'calc(100vh - 4rem)'}} className={'flex flex-col pt-4 pb-8 px-7'}>
            <Article product={productData}/>
        </div>
    )
}




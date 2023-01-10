import {getAllProducts, getProductData} from '../../../libs'
import {Article} from '../../../components'

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

    return (
        <Article product={productData}/>
    )
}




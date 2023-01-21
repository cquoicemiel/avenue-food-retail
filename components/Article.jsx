import Image from "next/image";
import {useAddProduct, useUpdateNavbar} from '../recoil/hooks';
import {useEffect, useState} from "react";

export default function Article({product}) {

    const addProduct = useAddProduct();
    const [effect, setEffect] = useState(false)
    const updateNavbar = useUpdateNavbar()

    useEffect(() => {
        updateNavbar(true, "Avenue", true)
        return(() => {
            updateNavbar(false, "Avenue", true)
        })
    }, [])
    
    return (

        <div className='flex flex-col gap-7 w-full h-full pt-4 pb-8 px-7'>
            <Image style={{maxHeight: '19rem'}} className="h-1/2 object-scale-down w-full" width={500} height={500} alt={product.name} src={require(`../assets/images/products/${product.name}.webp`)}/>
            <span className='flex flex-col mt-10'>
                <span className='text-gray-400 capitalize text-sm'>{product.scale}</span>
                <span className='flex justify-between'>
                    <span className='font-bold text-xl capitalize'>
                        {product.name}
                    </span>
                    <span className='border flex'>
                        {/*<Image/>*/}
                        {/*<Image/>*/}
                        {/*<Image/>*/}
                    </span>
                </span>
                <span className='font-black text-green-600'>{`€${product.price.toFixed(2)}`}</span>
            </span>
            <span className='text flex gap-4 flex-col'>
                <span>
                    Lorem ipsum dolor sit amet. Et quam tenetur qui
                </span>
                <span>
                    Qui mollitia mollitia aut reiciendis accusamus qui ipsum
                </span>
            </span>
            <button onClick={() => {
                addProduct(product)
                if(effect){
                    setEffect(false)
                    setTimeout(() => setEffect(true), 10)
                }else{
                    setEffect(true)
                }
            }} onAnimationEnd={() => setEffect(false)}  className={`${effect && "animate-button"} bg-green-600 text-white w-full rounded-full py-5 text-md font-semibold`}>Ajouter au panier</button>
        </div>
    )
}

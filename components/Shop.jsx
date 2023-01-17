import {useState} from "react";
import Image from "next/image";
import Link from "next/link";
import {useRecoilValue} from "recoil";
import {filterState} from "../recoil/Atoms";
import {products} from "../libs/products";
import {useSetSearch} from "../recoil/hooks";

export default function Shop() {

    const [toggleFilter, setToggleFilter] = useState(false)
    const filters = useRecoilValue(filterState)
    const setSearch = useSetSearch()
    const filteredProducts = products.filter((product) => (filters.search === null || product.name.includes(filters.search)))

    const categories = [
        'fruits', 'légumes', 'céréales', 'fromage', 'viande', 'bio'
    ]

    const [category, setCategory] = useState('')

    function Product({product}) {

        const [effect, setEffect] = useState(false)

        return(
            <Link href={`shop/products/${product.id}`}>
                <span onClick={() => {
                    setEffect(true)
                }} onAnimationEnd={() => setEffect(false)} className={`${effect && 'animate-smPop'} shadow-sm flex w-full h-64 rounded-xl flex-col pb-3 transition-shadow`}>
                    <Image alt={product.name} className='h-3/5 flex rounded-t-xl object-scale-down' src={require(`../assets/images/${product.name}.webp`)}/>
                    <span className='h-2/5 flex flex-col p-2.5'>
                        <span className='size text-sm text-gray-400 capitalize'>{product.scale}</span>
                        <span className='name capitalize font-semibold text-lg'>{product.name}</span>
                        <span className='flex w-full justify-between items-center'>
                            <span className='price text-green-600 font-extrabold'>{`€${product.price.toFixed(2)}`}</span>
                            <span className='rounded-full bg-gray-100'>
                                <svg className='h-7 w-7' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 12H16M12 8L12 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                            </span>
                        </span>
                    </span>
                </span>
            </Link>
        )
    }


    return (
        <div className='flex flex-col p-7 gap-7'>
            <span className='header font-semibold tracking-normal text-2xl'>
                Bon pour votre santé.<br/>Bénéfique aux producteurs locaux.
            </span>

            <span className='search flex rounded-xl bg-gray-100 items-center justify-around px-2 py-1'>
                <svg className='opacity-60 w-5 h-5' version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                     viewBox="0 0 489.713 489.713" xmlSpace="preserve">
                     <path d="M483.4,454.444l-121.3-121.4c28.7-35.2,46-80,46-128.9c0-112.5-91.5-204.1-204.1-204.1S0,91.644,0,204.144
                        s91.5,204,204.1,204c48.8,0,93.7-17.3,128.9-46l121.3,121.3c8.3,8.3,20.9,8.3,29.2,0S491.8,462.744,483.4,454.444z M40.7,204.144
                        c0-90.1,73.2-163.3,163.3-163.3s163.4,73.3,163.4,163.4s-73.3,163.4-163.4,163.4S40.7,294.244,40.7,204.144z"/>
                </svg>
                <input type={'search'} placeholder={'Chercher un produit...'} onChange={(e) => setSearch(e.target.value)} className='bg-transparent placeholder-gray-400 py-2.5 text-md outline-none'/>
                <svg className='opacity-60  w-5 h-5' viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><g><path d="M0 3.7L11 3.7 11 2.3 0 2.3 0 3.7zM13 0C12.4477153 0 12 .44771525 12 1L12 5C12 5.55228475 12.4477153 6 13 6 13.5522847 6 14 5.55228475 14 5L14 1C14 .44771525 13.5522847 0 13 0zM7 8.3L7 7C7 6.44771525 6.55228475 6 6 6 5.44771525 6 5 6.44771525 5 7L5 11C5 11.5522847 5.44771525 12 6 12 6.55228475 12 7 11.5522847 7 11L7 9.7 14 9.7 14 8.3 7 8.3zM0 9.7L4 9.7 4 8.3 0 8.3 0 9.7z" transform="translate(1 2)"/></g></svg>
            </span>

            <span className='flex flex-col gap-4'>
                <span className='font-semibold text-xl'>Catégories</span>
                <span className='hiddenScroll flex gap-5 overflow-x-scroll x'>
                    {categories.map(data => (
                                <span key={data} onClick={() => {
                                    category === data ? setCategory('') : setCategory(data)
                                }} className='flex flex-col items-center cursor-pointer'>
                                <span
                                    className={`${category === data ? 'bg-green-600' : 'bg-white'} w-16 h-16 p-4 flex transition-all rounded-2xl`}>
                                    <Image className={`transition-all ${category === data && 'invert'}`}
                                           alt={`${data} category`} src={require('../assets/images/apple.webp')}/>
                                </span>
                                <span className='capitalize text-md'>{data}</span>
                            </span>
                            )

                    )}
                </span>
            </span>

            <span className='hiddenScroll products grid grid-cols-2 gap-4 pt-4 overflow-y-scroll'>
                    {filteredProducts.map(product => (
                                <Product product={product} key={product.id}/>
                            )

                        )}
            </span>
        </div>
    )
}

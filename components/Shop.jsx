import {useEffect, useState} from "react";
import Image from "next/image";
import Link from "next/link";
import {useRecoilValue} from "recoil";
import {filterState} from "../recoil/Atoms";
import {products} from "../libs/products";
import {useToggleSetCategory, useToggleSetLabel, useSetSearch} from "../recoil/hooks";

export default function Shop() {





    function isIncluding(first, second){
        return (first.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(second.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')))
    }
    const [toggleFilter, setToggleFilter] = useState(false)


    useEffect(() => {
        if (toggleFilter){
            document.body.style.overflowY = "hidden"
        }
        return () => {
            document.body.style.overflowY = "auto"
        }
    }, [toggleFilter])

    const setCategory = useToggleSetCategory()
    const setLabel = useToggleSetLabel()


    const filters = useRecoilValue(filterState)
    const setSearch = useSetSearch()
    const filteredProducts = products.filter((product) => {

        return (filters.search === null || (isIncluding(product.name, filters.search) || isIncluding(filters.search, product.name)) || (isIncluding(product.category, filters.search) || isIncluding(filters.search, product.category))) &&
            (filters.categories.length === 0 || filters.categories.includes(product.category)) &&
            (filters.labels.length === 0 || filters.labels.every(label => product.labels.includes(label))) &&
            (filters.price === null || filters.price.min < product.price && product.price < filters.price.max);
        }
    )



    const categories = [
        'fruits', 'légumes', 'produits laitiers', 'viandes', 'boulangerie', 'alcools'
    ]

    const labels = [
        {
            name: "Agriculture Biologique",
            short: "BIO"
        },
        {
            name: "Label Rouge",
            short: "LR"
        },
        {
            name: "Indication Géographique Protégée",
            short: "IGP"
        },
        {
            name: "Viandes de France",
            short: "VDF"
        },
        {
            name: "Appellation d'Origine Protégée",
            short: "AOP"
        },
        {
            name: "Bleu Blanc Cœur",
            short: "BBC"
        },

    ]

    function Product({product}) {

        const [effect, setEffect] = useState(false)

        return(
            <Link href={`shop/products/${product.id}`}>
                <span onClick={() => {
                    setEffect(true)
                }} onAnimationEnd={() => setEffect(false)} className={`${effect && 'animate-smPop'} shadow-sm flex w-full h-64 rounded-xl flex-col pb-3 transition-shadow`}>
                    <Image alt={product.name} className='h-3/5 flex rounded-t-xl object-scale-down' src={require(`../assets/images/products/${product.name}.webp`)}/>
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




            <div className={`fixed justify-center flex-col inset-y-0 pt-24 w-full ${toggleFilter? "right-0" : "-right-full"} transition-all flex box-border px-6 bg-white max-w-screen-md z-50`}>
                <span className={`${toggleFilter ? "opacity-100" : "opacity-0 pointer-events-none"}  bg-white transition-opacity fixed inset-0 w-screen h-16 flex items-center shadow-sm`}>
                    <span className='w-1/3'></span>
                    <span className='h-16 flex fixed z-20 left-0 top-0 w-1/3 bg-white items-center justify-center'>
                        <svg className='w-1/3 h-6 w-6 flex justify-center relative' onClick={() => setToggleFilter(false)} fill="#000000" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" width="48px" height="48px"><path d="M 4.9902344 3.9902344 A 1.0001 1.0001 0 0 0 4.2929688 5.7070312 L 10.585938 12 L 4.2929688 18.292969 A 1.0001 1.0001 0 1 0 5.7070312 19.707031 L 12 13.414062 L 18.292969 19.707031 A 1.0001 1.0001 0 1 0 19.707031 18.292969 L 13.414062 12 L 19.707031 5.7070312 A 1.0001 1.0001 0 0 0 18.980469 3.9902344 A 1.0001 1.0001 0 0 0 18.292969 4.2929688 L 12 10.585938 L 5.7070312 4.2929688 A 1.0001 1.0001 0 0 0 4.9902344 3.9902344 z"/></svg>
                    </span>
                    <span className={`font-bold text-2xl w-1/3  text-center`}>Filtres</span>
                    <span className={`w-1/3`}></span>
                </span>
                <span className='flex flex-col items-center justify-start w-full h-full gap-12 overflow-y-scroll hiddenScroll'>
                    <div className='flex flex-col w-full gap-4'>
                        <span className='font-semibold text-xl'>Catégories</span>
                        <div className={`grid grid-rows-2 grid-flow-col gap-3 w-full overflow-x-scroll hiddenScroll`}>
                        {categories.map(category => {
                            return(
                                <span onClick={() => {setCategory(category)}} key={category} className={`p-2 h-32 w-32 ${filters.categories.includes(category) ? 'bg-green-500' : 'bg-gray-100'} flex flex-col justify-center items-center p-1 rounded-lg transition-colors`}>
                                    <Image alt={`${category}s`} src={require(`../assets/images/categories/${category.toLowerCase()}.webp`)} className='h-3/4 w-full object-scale-down p-2'/>
                                    <span className={`transition-colors h-1/3 capitalize font-semibold text-sm text-center flex items-center ${filters.categories.includes(category) ? 'text-white' : 'text-black'} `}>{category}</span>
                                </span>
                            )

                        })}
                    </div>
                    </div>

                    <div className='flex flex-col w-full gap-4'>
                        <span className='font-semibold text-xl'>Labels</span>
                        <div className={`grid grid-rows-1 grid-flow-col gap-3 w-full overflow-x-scroll hiddenScroll`}>
                        {labels.map(label => {
                            return(
                                <span onClick={() => {setLabel(label.short)}} key={label.short} className={`p-2 h-32 w-36 ${filters.labels.includes(label.short) ? 'bg-green-500' : 'bg-gray-100'} flex flex-col justify-center items-center p-1 rounded-lg transition-colors`}>
                                    <Image alt={`${label}`} src={require(`../assets/images/labels/${label.short.toLowerCase()}.webp`)} className='h-3/4 w-full object-scale-down p-2'/>
                                    <span className={`transition-colors h-1/3 capitalize font-semibold text-xs text-center flex items-center ${filters.labels.includes(label.short) ? 'text-white' : 'text-black'} `}>{label.name}</span>
                                </span>
                            )

                        })}
                    </div>
                    </div>

                    {/*labels*/}
                    <div className={``}>

                    </div>
                    {/*limites de prix*/}
                    <div className={``}>

                    </div>

                </span>
            </div>





            <span className='header font-semibold tracking-normal text-2xl'>
                Bon pour votre santé.<br/>Bénéfique aux producteurs locaux.
            </span>

            <span className='search flex rounded-xl bg-gray-100 items-center justify-around px-2 py-1 w-11/12 max-w-xs self-center'>
                {filters.search ?
                    <svg className='h-5 w-5' onClick={() => {
                        setSearch(null)
                        //ON grab le input de recherche pour le vider (visuellement)
                        document.getElementById('search').value = '';
                    }} fill="#000000" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" width="48px" height="48px"><path d="M 4.9902344 3.9902344 A 1.0001 1.0001 0 0 0 4.2929688 5.7070312 L 10.585938 12 L 4.2929688 18.292969 A 1.0001 1.0001 0 1 0 5.7070312 19.707031 L 12 13.414062 L 18.292969 19.707031 A 1.0001 1.0001 0 1 0 19.707031 18.292969 L 13.414062 12 L 19.707031 5.7070312 A 1.0001 1.0001 0 0 0 18.980469 3.9902344 A 1.0001 1.0001 0 0 0 18.292969 4.2929688 L 12 10.585938 L 5.7070312 4.2929688 A 1.0001 1.0001 0 0 0 4.9902344 3.9902344 z"/></svg>
                :
                    <svg className='opacity-60 w-5 h-5' version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
                         xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                         viewBox="0 0 489.713 489.713" xmlSpace="preserve">
                        <path d="M483.4,454.444l-121.3-121.4c28.7-35.2,46-80,46-128.9c0-112.5-91.5-204.1-204.1-204.1S0,91.644,0,204.144
                        s91.5,204,204.1,204c48.8,0,93.7-17.3,128.9-46l121.3,121.3c8.3,8.3,20.9,8.3,29.2,0S491.8,462.744,483.4,454.444z M40.7,204.144
                        c0-90.1,73.2-163.3,163.3-163.3s163.4,73.3,163.4,163.4s-73.3,163.4-163.4,163.4S40.7,294.244,40.7,204.144z"/>
                    </svg>}
                <input id={'search'} type={'search'} value={(filters.search || undefined)} placeholder={'Chercher un produit...'} onChange={(e) => setSearch(e.target.value)} className='bg-transparent placeholder-gray-400 py-2.5 text-md outline-none'/>
                <svg onClick={() => setToggleFilter(!toggleFilter)} className='opacity-60  w-5 h-5' viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><g><path d="M0 3.7L11 3.7 11 2.3 0 2.3 0 3.7zM13 0C12.4477153 0 12 .44771525 12 1L12 5C12 5.55228475 12.4477153 6 13 6 13.5522847 6 14 5.55228475 14 5L14 1C14 .44771525 13.5522847 0 13 0zM7 8.3L7 7C7 6.44771525 6.55228475 6 6 6 5.44771525 6 5 6.44771525 5 7L5 11C5 11.5522847 5.44771525 12 6 12 6.55228475 12 7 11.5522847 7 11L7 9.7 14 9.7 14 8.3 7 8.3zM0 9.7L4 9.7 4 8.3 0 8.3 0 9.7z" transform="translate(1 2)"/></g></svg>
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

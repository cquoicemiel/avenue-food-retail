import {useRecoilValue} from "recoil";
import { cartStatus } from '../recoil/Selectors';
import { cartState as _cartState, userState  } from '../recoil/Atoms';
import Image from "next/image";
import {useClearCart, useSetNavbar, useUpdateActiveCard} from "../recoil/hooks";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";





export default function Checkout() {

    const [effect, setEffect] = useState(false)
    const updateActiveCard = useUpdateActiveCard()
    const cart = useRecoilValue(cartStatus);
    const cartState = useRecoilValue(_cartState);
    const user = useRecoilValue(userState)
    const shipping = 3.50
    const discount = 0
    const clearCart = useClearCart()
    const router = useRouter()
    // const setNavbar = useSetNavbar()
    // useEffect(() => {
    //     setNavbar(false)
    //     return(() => {
    //         setNavbar(true)
    //     })
    // })


    const CreditCard = ({card}) => {



        function VisaWave() {
            return (
                <svg
                    viewBox="0 0 1200 540"
                    width={1200}
                    height={540}
                    xmlns="http://www.w3.org/2000/svg"
                    className={"absolute h-full w-full object-cover inset-0 -z-20 rounded-xl"}
                >
                    <path
                        d="M595 0l-34.2 30c-34.1 30-102.5 90-67.6 150C528 240 666 300 733.5 360s64.5 120 63 150l-1.5 30H0v-30-150-180V0z"
                        fill="#00388c"
                        strokeLinecap="round"
                    />
                    <path
                        d="M476 0l-27.3 30c-27.4 30-82 90-54 150s138.6 120 192.6 180 51.4 120 50 150l-1.3 30H0v-30-150-180V0z"
                        fill="#001e4c"
                        strokeLinecap="round"
                    />
                </svg>
            )
        }

        function MastercardWave() {
            return (
                <svg
                    viewBox="0 0 1200 540"
                    width={1200}
                    height={540}
                    xmlns="http://www.w3.org/2000/svg"
                    className={"absolute h-full w-full object-cover inset-0 -z-20 rounded-xl"}
                >
                    <defs>
                        <filter id="a" x="-10%" y="-10%" width="120%" height="120%">
                            <feFlood floodOpacity={0} result="BackgroundImageFix" />
                            <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                            <feGaussianBlur stdDeviation={195} result="effect1_foregroundBlur" />
                        </filter>
                    </defs>
                    <path fill="#F4D4A4" d="M0 0H1200V540H0z" />
                    <g filter="url(#a)">
                        <circle cx={262} cy={450} fill="#EA9DA6" r={434} />
                        <circle cx={702} cy={530} fill="#F4D4A4" r={434} />
                        <circle cx={478} cy={257} fill="#EA9DA6" r={434} />
                        <circle cx={872} cy={293} fill="#EA9DA6" r={434} />
                        <circle cx={605} cy={40} fill="#F4D4A4" r={434} />
                        <circle cx={242} cy={122} fill="#EA9DA6" r={434} />
                    </g>
                </svg>
            )
        }

        return(
            <span onClick={() => updateActiveCard(card.id)} className='flex'>
                <span className='absolute inset-0 w-screen h-16 flex items-center shadow-sm'>
                    <span className='ml-4 font-bold text-2xl'>Commande</span>
                </span>
                <span className='w-full flex flex-col h-36 shadow-sm rounded-xl p-5 relative basis-5/6'>
                    <span className={'w-full h-full flex justify-end'}>
                        <span className='flex gap-3 font-semibold text-xl tracking-wide'>
                            <input value={'xxxx'} type={"password"} disabled className='tracking-widest bg-transparent h-1/2 text-end w-11'/>
                            <span>{card.pins.slice(-4)}</span>
                        </span>
                    </span>
                    <span className={'w-full h-full flex justify-between items-end'}>
                        <Image className={`w-14 ${card.brand === "visa" && "invert"} object-scale-down opacity-95`} alt={'Logo Carte Bancaire'} src={require(`../assets/images/${card.brand}.webp`)}/>
                        <span className='flex flex-col items-end'>
                            <span className='text-gray-600'>Expire fin</span>
                            <span className='font-semibold'>{card.date}</span>
                        </span>
                    </span>
                    {card.brand === "mastercard" ? <MastercardWave/> : <VisaWave/>}
                </span>
                <span className='flex justify-center items-center basis-1/6'>
                    <span className={`transition-colors h-5 w-5 ${user.activeCard === card.id? "bg-green-400" : "bg-white"} rounded-full border-2 ${user.activeCard === card.id ? "border-green-400" : "border-black"}`}>
                    </span>
                </span>
        </span>
        )
    }



    return (
        <span className='flex flex-col w-full h-full py-8 px-6 gap-12'>
            <span className={`flex flex-col justify-evenly w-full gap-5 p-5 shadow-sm rounded-xl`}>
                <span className={`flex flex-col gap-4 justify-evenly border-b border-black border-opacity-30 py-3`}>
                    <span className={`flex w-full justify-between`}>
                        <span className='basis-4/5 font-semibold text-lg text-gray-400'>Commande:</span>
                        <span className='text-center basis-1/5 text-gray-400 text-lg font-semibold'>€ {cart.totalPrice.toFixed(2)}</span>
                    </span>
                    <span className={`flex w-full justify-between`}>
                        <span className='basis-4/5 font-semibold text-gray-400 text-lg'>Livraison</span>
                        <span className='text-center basis-1/5 text-gray-400 font-semibold text-lg'>€ {shipping.toFixed(2)}</span>
                    </span>
                    <span className={`flex w-full justify-between`}>
                        <span className='basis-4/5 font-semibold text-gray-400 text-lg'>Réduction</span>
                        <span className={`text-center basis-1/5 ${discount === 0 ? 'text-gray-300' : 'text-red-600'} font-semibold text-lg`}>-€ {discount.toFixed(2)}</span>
                    </span>
                </span>
                <span className={`flex w-full justify-between`}>
                    <span className={`text-xl font-bold`}>Total</span>
                    <span className={`text-green-600 font-black text-xl`}>€ {(cart.totalPrice + shipping - discount).toFixed(2)}</span>
                </span>
            </span>


            <span className='flex flex-col gap-3'>
                <span className={`text-gray-500 font-semibold text-xl`}>Méthode de paiement</span>
                <span className={`flex flex-col gap-4 w-full`}>
                    {user.creditCards.map(card => (
                        <CreditCard key={card.id} card={card}/>
                    ))}
                    {user.creditCards.length === 0 && (
                        <span>{"Vous n'avez aucune carte bancaire enregistrée"}</span>
                    )}
                </span>
            </span>
            <button onClick={() => {
                setEffect(true)
                router.push('/shop')
                clearCart()
            }} onAnimationEnd={() => setEffect(false)} className={`${effect && "animate-button"} bg-green-600 text-white w-full rounded-xl py-5 text-lg font-semibold`}>Confirmer la commande</button>
        </span>
    )
}

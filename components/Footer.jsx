import Image from "next/image";


export default function Footer(props){

    return(
        <div className='w-screen h-28 border-t border-black flex items-center justify-center gap-4'>
            <Image className={'h-10 w-10'} alt={'Logo discord'} src={require('../assets/images/discord.webp')}/>
            <span className='font-bold text-2xl'>蜜柚#9558</span>
        </div>
    )
}

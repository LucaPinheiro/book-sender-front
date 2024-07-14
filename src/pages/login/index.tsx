import { CircleNotch, Eye, EyeSlash,  } from '@phosphor-icons/react';
import LogoSantander from '../../../public/logoSantander.png';
import { useState } from 'react';

export function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    function HandleLogin() {
        setLoading(true);
        setTimeout(() => {
            alert('Login efetuado com sucesso!');
            window.location.href = '/email-sender';
            setLoading(false);
        }, 1000);
    }

    return (
        <main className="h-screen w-full flex items-center justify-center">
            <section className='flex w-full justify-center h-1/2'>
                <div className="w-1/3 shadow-xl bg-red-500 rounded-l-lg flex items-center justify-center max-lg:hidden">
                    <img
                        src={LogoSantander}
                        alt="Logo do Santander"
                        className="w-64"
                    />
                </div>
                <div className="w-1/3 shadow-xl rounded-r-lg p-8 flex flex-col justify-center max-lg:w-1/2 max-sm:w-full">
                    <h1 className="text-3xl font-bold text-center">Login</h1>
                    <form className="flex flex-col gap-4 mt-4">
                        <input className="w-full border-b-2 border-l-2 rounded-bl-md p-2 outline-none border-black" type="email" placeholder="Informe seu email" />
                        
                        <div className='flex w-full border-b-2 border-l-2 rounded-bl-md p-2 border-black'>
                            <input className='outline-none w-full' type={showPassword ? 'text' : 'password'} placeholder="Informe sua senha" />
                            {showPassword ? (
                                <EyeSlash className='cursor-pointer' size={24} onClick={() => setShowPassword(false)} />
                            ) : (
                                <Eye className='cursor-pointer' size={24} onClick={() => setShowPassword(true)} />
                            )}
                        </div>

                        <button
                            type='button'
                            className="light-effect-button"
                            disabled={loading}
                            onClick={()=>HandleLogin()}
                        >
                            {loading ? 
                                <div className='flex justify-center'>
                                    <CircleNotch className='animate-spin' size={32} />
                                </div>
                            :
                                <h1>Entrar</h1>
                            }
                        </button>
                    </form>
                </div>
            </section>
        </main>
    )
}
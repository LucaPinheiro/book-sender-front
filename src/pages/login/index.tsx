import { CircleNotch, Eye, EyeSlash } from '@phosphor-icons/react';
import LogoSantander from '../../../public/logoSantander.png';
import { useEffect, useState } from 'react';
import { UserRepository } from '../../api/repositories/user_repository';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const userRepo = new UserRepository();
    
    async function checkToken() {
        const token = await localStorage.getItem('accessToken');
        console.log(token);
        if(token !== null && token !== undefined) {
            window.location.href = '/email-sender';
        }
    }

    async function HandleLogin() {
        setLoading(true);
        try {
            const response = await userRepo.login(email, password)
            if(response.status === 200) {
                toast.success('logado com sucesso', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                })
                await localStorage.setItem('accessToken', response.data.token);
                setTimeout(() => {
                    window.location.href = '/email-sender';
                    setLoading(false);
                }, 2000);
            } else {
                setLoading(false);
                return toast.error(response.data.message, {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
        } catch (error: any){
            setLoading(false);
            return toast.error(error.data.message, {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }

    useEffect(() => {
        checkToken();
    }, [])

    return (
        <main className="h-screen w-full flex items-center justify-center">
            <ToastContainer position="top-center" autoClose={2000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
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
                        <input onChange={(e) => setEmail(e.target.value)} className="w-full border-b-2 border-l-2 rounded-bl-md p-2 outline-none border-black" type="email" placeholder="Informe seu email" />
                        
                        <div className='flex w-full border-b-2 border-l-2 rounded-bl-md p-2 border-black'>
                            <input onChange={(e) => setPassword(e.target.value)} className='outline-none w-full' type={showPassword ? 'text' : 'password'} placeholder="Informe sua senha" />
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
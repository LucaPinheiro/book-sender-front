import LogoSantander from "../../../public/logoSantander.png";

export function Header({nome, saudacao} : {nome: string, saudacao: string}) {
  async function Logout() {
    await localStorage.removeItem('accessToken');
    window.location.href = '/';
  }
  return (
    <header className="p-8">
      <nav className="flex gap-8 max-sm:flex-col">
        <div className="w-full bg-gray-400 flex items-center p-8">
          <h1 className="text-white font-bold text-6xl max-md:text-4xl">Book Sender</h1>
        </div>
        <div className="w-96 h-32 p-4 bg-gray-400 backgroundLogo max-sm:w-full">
          <img className="ml-4 h-full" src={LogoSantander} alt="logo do santander" />
        </div>
      </nav>
      <div className="flex justify-end">
        <div className="flex items-center gap-4">
          <div className="p-4">
            <h1 className="text-lg">{saudacao}, <label className="text-red-500 font-semibold">{nome}</label>!</h1>
          </div>
          <button onClick={()=>Logout()} type="button" className="bg-red-500 px-4 py-2 rounded-md font-bold text-white duration-200 hover:bg-red-400">Sair</button>
        </div>
      </div>
    </header>
  )
}
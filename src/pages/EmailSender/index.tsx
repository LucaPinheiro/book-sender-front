import { format, subDays } from "date-fns";
import { Header } from "../../components/header";
import { RadioContainer } from "../../components/RadioContainer";
import { useEffect, useState } from "react";
import { UserRepository } from "../../api/repositories/user_repository";
import { EmailRepository } from "../../api/repositories/email_repository";
import { CircleNotch, Trash } from "@phosphor-icons/react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export function EmailSender() {
    const [arquivo, setArquivo] = useState<FileList | null>(null);
    const [selectBook, setSelectBook] = useState('');
    const [saudacao, setSaudacao] = useState('');
    const [diaAnterior, setDiaAnterior] = useState('');
    const [loadingCreateEmail, setLoadingCreateEmail] = useState(false);
    const [loadingEmailSearch, setLoadingEmailSearch] = useState(false);
    
    const [nome, setNome] = useState('');
    const [teamList, setTeamList] = useState<string[]>([]);
    const [teamAll, setTeamAll] = useState<string[]>([]);

    const [newEmail, setNewEmail] = useState('');
    const [newTeam, setNewTeam] = useState('');
    const [newRole, setNewRole] = useState('');

    const [allEmailsSearch, setAllEmailsSearch] = useState<string[]>([]);

    const userRepo = new UserRepository();
    const emailRepo = new EmailRepository();

    function checkToken() {
        const token = localStorage.getItem('accessToken');
        if(token === null) {
            window.location.href = '/';
        }
    }

    async function emailsByTeam(team:string) {
      const response = await emailRepo.getEmailsByTeam(team)
      if(team === 'TODOS') {
        setTeamAll(response.data)
      } else {
        setTeamList(response.data)
      }
    }

    async function createEmail() {
      try {
        setLoadingCreateEmail(true)
        const response = await emailRepo.createEmail(newEmail, newTeam, newRole)
        if(response.status === 201) {
          toast.success(response.data.message, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
          })
        } else {
          toast.error(response.data.message, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
          })
        }
      }catch(error: any) {
        if(error.status === 409) {
          toast.error('Email já cadastrado', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
          })
        } else {
          toast.error('Erro ao adicionar email', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
          })
        }
      }
      setTimeout(() => {
        setNewEmail('')
        setNewTeam('')
        setNewRole('')
        setLoadingCreateEmail(false)
      }, 2000);
    }

    async function allEmails() {
      setLoadingEmailSearch(true)
      const response = await emailRepo.getAllEmail()
      setAllEmailsSearch(response.data)
      setTimeout(() => {
        setLoadingEmailSearch(false)
      }, 1000);
    }

    async function deleteEmail(email: string) {
      try {
        const response = await emailRepo.deleteEmail(email)
        if(response.status === 200) {
          toast.success(response.data.message, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
          })
          allEmails()
        } else {
          toast.error(response.data.message, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
          })
        }
      }catch(error: any) {
        toast.error('Erro ao deletar email', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        })
      }
    }
    
    async function EnviarBook() {
      try {
        if(selectBook === '') {
          toast.error('Selecione um book', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
          })
          return;
        }
        if(arquivo === null) {
          toast.error('Selecione um arquivo', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
          })
          return;
        }
        const text = `Prezados ${saudacao}!\nSegue o relatório de ${selectBook == '' ? '{ selecione um book }' : selectBook == 'Conversao' ? 'Conversão' : selectBook.split(/(?=[A-Z])/).map((string: string) => string.charAt(0).toUpperCase() + string.slice(1)).join(' ')}, com dados atualizado até ${diaAnterior}.`;
        await emailRepo.sendEmail(selectBook, `Relatório ${selectBook.split(/(?=[A-Z])/).map((string: string) => string.charAt(0).toUpperCase() + string.slice(1)).join(' ')} - ${new Date()}`, text, arquivo )

        toast.success('Book enviado com sucesso', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        })
      } catch (error:any) {
        toast.error('Erro ao enviar book', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        })
      }
      console.log(arquivo)
    }

  useEffect(() => {
    const obterSaudacao = () => {
      const hora = new Date().getHours();

      if (hora >= 0 && hora < 12) {
        setSaudacao('Bom dia');
      } else if (hora >= 12 && hora < 18) {
        setSaudacao('Boa tarde');
      } else {
        setSaudacao('Boa noite');
      }
    }

    const obterDiaAnterior = () => {
      const ontem = subDays(new Date(), 1)
      const dataFormatada = format(ontem, 'dd/MM')
      setDiaAnterior(dataFormatada);
    }

    obterDiaAnterior();
    obterSaudacao();
    checkToken();

    userRepo.getUser().then((response) => {
      // console.log(response.data);
      setNome(`${response.data.name.split(' ')[0]} ${response.data.name.split(' ')[1] != undefined ? response.data.name.split(' ')[1] : ''}`);
    })
  }, [])

  useEffect(() => {
    if(selectBook !== '') {
      switch(selectBook) {
        case 'MarketShare':
          emailsByTeam('TODOS')
          emailsByTeam('MARKET-SHARE');
          break;
        case 'SegurosAuto':
          emailsByTeam('TODOS')
          emailsByTeam('SEGUROS-AUTO');
          break;
        case 'Conversao':
          emailsByTeam('TODOS')
          emailsByTeam('CONVERSAO');
          break;
        default:
          break;
      }
    }
  }, [selectBook])

  return (
    <>
      <Header saudacao={saudacao} nome={nome} />

      <ToastContainer position="top-center" autoClose={2000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
      <main className="flex justify-center items-start px-8 gap-8 max-xl:flex-col-reverse mb-4">
        {/* SECTION 1 */}
        <section className="w-full">
          <div className="flex flex-wrap w-full items-center justify-evenly">
            <RadioContainer 
              label="Market Share"
              value="MarketShare"
              selectedValue={selectBook}
              onChange={setSelectBook}
            />
            
            <RadioContainer 
              label="Seguros Auto"
              value="SegurosAuto"
              selectedValue={selectBook}
              onChange={setSelectBook}
            />

            <RadioContainer 
              label="Conversão"
              value="Conversao"
              selectedValue={selectBook}
              onChange={setSelectBook}
            />
          </div>

          <textarea 
            className="resize-none border-b-2 border-l-2 border-red-500 outline-none w-full mt-8 p-2" 
            readOnly
            value={`Prezados ${saudacao}!\nSegue o relatório de ${selectBook == '' ? '{ selecione um book }' : selectBook == 'Conversao' ? 'Conversão' : selectBook.split(/(?=[A-Z])/).map((string: string) => string.charAt(0).toUpperCase() + string.slice(1)).join(' ')}, com dados atualizados até ${diaAnterior}.`}
          />

          <article>
            <div className="my-4">
              <label className="bg-red-500 p-2 text-white rounded-md cursor-pointer font-semibold duration-200 hover:bg-red-400" htmlFor="selecaoArquivos">Enviar arquivo</label>
              <label className="ml-4">{arquivo ? arquivo[0].name : 'Nenhum Arquivo'}</label>
              <input onChange={(e) => {e.target.files?.length === 0 ? setArquivo(null) : setArquivo(e.target.files)}} className="hidden" id="selecaoArquivos" type="file" accept="application/pdf" />
            </div>

            {/* LISTA */}
            <div className="border-2 h-72 overflow-x-hidden overflow-y-scroll">
              <h2 className="font-bold text-lg text-center underline">Chefe Financeira</h2>
              <div className="ml-4 flex flex-wrap gap-4 justify-center">
                {teamAll && teamAll.map((data: any, index) => (
                  data.role === '1' && <label key={index}>{data.email}</label>
                ))}
              </div>

              <h2 className="font-bold text-lg text-center underline mt-4">Diretor</h2>
              <div className="ml-4 flex flex-wrap gap-4 justify-center">
                {teamAll && teamAll.map((data: any, index) => (
                  data.role === '2' && <label key={index}>{data.email}</label>
                ))}
              </div>

              <h2 className="font-bold text-lg text-center underline mt-4">Head de Finanças</h2>
              <div className="ml-4 flex flex-wrap gap-4 justify-center">
                {teamAll && teamAll.map((data: any, index) => (
                  data.role === '3' && <label key={index}>{data.email}</label>
                ))}
              </div>
              
              <h2 className="font-bold text-lg text-center underline mt-4">Gestor</h2>
              <div className="ml-4 flex flex-wrap gap-4 justify-center">
                {teamAll && teamAll.map((data: any, index) => (
                  data.role === '4' && <label key={index}>{data.email}</label>
                ))}
              </div>

              {teamList.length === 0 ? '' :<h2 className="font-bold text-lg text-center underline mt-4">Time</h2>}
              <div className="ml-4 flex flex-wrap gap-4 justify-center">
                {teamList && teamList.map((email, index) => (
                  <label key={index}>{email}</label>
                ))}
              </div>
            </div>
          </article>

          <div className="flex justify-center items-center mt-8">
            <button onClick={()=>EnviarBook()} className="light-effect-button">Enviar Books</button>
          </div>
        </section>
        
        {/* SECTION 2 */}
        <section className="w-96 flex flex-col gap-8 max-xl:w-full">
          {/* ADICIONAR EMAIL E BUSCAR EMAIL */}
          <main className="max-xl:flex max-md:flex-col max-md:gap-4">
            <article className="border-l-2 border-red-500 p-2 pb-4 mb-8 max-xl:w-1/2 max-md:w-full">
              <h3 className="text-center text-2xl font-semibold mb-6">Adicionar E-mail</h3>
              
              <div className="flex flex-col gap-4">
                <input onChange={(e)=>setNewEmail(e.target.value)} className="w-full border-b-2 border-l-2 border-black rounded-bl-md pl-1 outline-none duration-[350ms] focus:border-red-500" type="email" placeholder="Informe o E-mail..." />
                
                <select onChange={(e)=>setNewTeam(e.target.value)} className="p-1 rounded-md border-2 border-black duration-300 hover:border-red-500 focus:border-red-500">
                  <option value="">Selecione um book</option>
                  <option value="MARKET-SHARE">Market Share</option>
                  <option value="SEGUROS-AUTO">Seguros Auto</option>
                  <option value="CONVERSAO">Conversão</option>
                </select>

                <select onChange={(e)=>setNewRole(e.target.value)} className="p-1 rounded-md border-2 border-black duration-300 hover:border-red-500 focus:border-red-500">
                  <option value="">Selecione um cargo</option>
                  <option value="1">Chefe Financeira</option>
                  <option value="2">Diretor</option>
                  <option value="3">Head de Finanças</option>
                  <option value="4">Gestor</option>
                  <option value="5">Time</option>
                </select>

                <button type="button" className="light-effect-button" onClick={()=>createEmail()}>
                  {loadingCreateEmail ? 
                  <div className='flex justify-center'>
                    <CircleNotch className='animate-spin' size={24} />
                  </div>
                  :  
                  <h1>Adicionar</h1>
                  }
                </button>
              </div>
            </article>

            <article className="border-l-2 border-red-500 p-2 max-xl:w-1/2 max-md:w-full">
              <h3 className="text-center text-2xl font-semibold mb-4">Todos os E-mails</h3>

              <div className="flex flex-col gap-4">
                <button type="button" className="light-effect-button" onClick={()=>allEmails()}>
                  {loadingEmailSearch ? 
                  <div className='flex justify-center'>
                    <CircleNotch className='animate-spin' size={24} />
                  </div>
                  :  
                  <h1>Buscar</h1>
                  }
                </button>
                {/* LISTA DE BUSCA EMAIL */}
                <div className="w-full h-32 border-2 rounded-lg p-2 overflow-x-hidden overflow-y-scroll box-border">
                  {allEmailsSearch && allEmailsSearch.map((data: any, index) => (
                    <div key={index} className="flex border rounded-l-lg border-red-500 h-12 justify-start mb-4">
                      <div className="rounded-l-lg w-5 bg-red-500"/>
                      <div className="flex items-center justify-between w-full mx-4">
                        <h1>{data.email}</h1>
                        <button type="button" onClick={()=>deleteEmail(data.email)}>
                          <Trash />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </article>

          </main>
        
        </section>
      </main>
    </>
  )
}
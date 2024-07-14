import { format, subDays } from "date-fns";
import { Header } from "../../components/header";
import { RadioContainer } from "../../components/RadioContainer";
import { useEffect, useState } from "react";

export function EmailSender() {
    const [arquivo, setArquivo] = useState<FileList | null>(null);
    const [selectBook, setSelectBook] = useState('');
    const [saudacao, setSaudacao] = useState('');
    const [diaAnterior, setDiaAnterior] = useState('');

    function checkToken() {
        const token = localStorage.getItem('accessToken');
        if(token === null) {
            window.location.href = '/';
        }
    }

    function EnviarBook() {
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
  }, [])

  return (
    <>
      <Header />

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
            className="border-b-2 border-l-2 border-red-500 outline-none w-full mt-8 p-2" 
            value={`Prezados ${saudacao}!\nSegue o relatório de ${selectBook == '' ? '{ selecione um book }' : selectBook == 'Conversao' ? 'Conversão' : selectBook.split(/(?=[A-Z])/).map((string: string) => string.charAt(0).toUpperCase() + string.slice(1)).join(' ')} com dados de até ${diaAnterior}`}
          />

          <article>
            <div className="my-4">
              <label className="bg-red-500 p-2 text-white rounded-md cursor-pointer font-semibold duration-200 hover:bg-red-400" htmlFor="selecaoArquivos">Enviar arquivo</label>
              <label className="ml-4">{arquivo ? arquivo[0].name : 'Nenhum Arquivo'}</label>
              <input onChange={(e) => setArquivo(e.target.files)} className="hidden" id="selecaoArquivos" type="file" accept="application/pdf" />
            </div>

            {/* LISTA */}
            <div className="border-2 h-72 overflow-x-hidden overflow-y-scroll">
              <h2 className="font-bold text-lg text-center underline">Chefe Financeira</h2>
              <div className="ml-4 flex flex-wrap gap-4">
                <label>chefe1@gmail.com</label>
                <label>chefe2@gmail.com</label>
                <label>chefe3@gmail.com</label>
              </div>
              <h2 className="font-bold text-lg text-center underline">Diretor</h2>
              <div className="ml-4 flex flex-wrap gap-4">
                <label>diretor@gmail.com</label>
              </div>
              <h2 className="font-bold text-lg text-center underline">Head de Finanças</h2>
              <div className="ml-4 flex flex-wrap gap-4">
                <label>head1@gmail.com</label>
                <label>head2@gmail.com</label>
                <label>head3@gmail.com</label>
                <label>head4@gmail.com</label>
                <label>head5@gmail.com</label>
                <label>head6@gmail.com</label>
              </div>
              <h2 className="font-bold text-lg text-center underline">Gestor</h2>
              <div className="ml-4 flex flex-wrap gap-4">
                <label>gestor1@gmail.com</label>
                <label>gestor2@gmail.com</label>
              </div>
              <h2 className="font-bold text-lg text-center underline">Time</h2>
              <div className="ml-4 flex flex-wrap gap-4">
                <label>time1@gmail.com</label>
                <label>time2@gmail.com</label>
                <label>time3@gmail.com</label>
                <label>time4@gmail.com</label>
                <label>time5@gmail.com</label>
                <label>time6@gmail.com</label>
                <label>time7@gmail.com</label>
                <label>time8@gmail.com</label>
                <label>time9@gmail.com</label>
                <label>time10@gmail.com</label>
                <label>time11@gmail.com</label>
                <label>time12@gmail.com</label>
                <label>time13@gmail.com</label>
                <label>time14@gmail.com</label>
                <label>time15@gmail.com</label>
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
            <article className="border-l-2 border-red-500 p-2 pb-4 max-xl:w-1/2 max-md:w-full">
              <h3 className="text-center text-2xl font-semibold mb-6">Adicionar Email</h3>
              
              <div className="flex flex-col gap-4">
                <input className="w-full border-b-2 border-l-2 border-black rounded-bl-md pl-1 outline-none duration-[350ms] focus:border-red-500" type="email" placeholder="Informe o Email..." />
                
                <select className="p-1 rounded-md border-2 border-black duration-300 hover:border-red-500 focus:border-red-500">
                  <option value="">Selecione um book</option>
                  <option value="marketShare">Market Share</option>
                  <option value="segurosAuto">Seguros Auto</option>
                  <option value="conversao">Conversão</option>
                </select>

                <select className="p-1 rounded-md border-2 border-black duration-300 hover:border-red-500 focus:border-red-500">
                  <option value="">Selecione um cargo</option>
                  <option value="chefeFinancas">Chefe Financeira</option>
                  <option value="diretor">Diretor</option>
                  <option value="headFinancas">Head de Finanças</option>
                  <option value="gestor">Gestor</option>
                  <option value="time">Time</option>
                </select>

                <button className="light-effect-button">Adicionar</button>
              </div>
            </article>

            <article className="border-l-2 border-red-500 p-2 max-xl:w-1/2 max-md:w-full">
              <h3 className="text-center text-2xl font-semibold mb-6">Busca Email</h3>

              <div className="flex flex-col gap-4">
                <input className="w-full border-b-2 border-l-2 border-black rounded-bl-md pl-1 outline-none duration-[350ms] focus:border-red-500" type="text" placeholder="Informe o Email, Cargo ou Time..." />
                <div className="flex items-center justify-around">
                  
                  <div className="flex items-center gap-1">
                    <input name="filter" type="radio" />
                    <label>Todos</label>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <input name="filter" type="radio" />
                    <label>Cargo</label>
                  </div>

                  <div className="flex items-center gap-1">
                    <input name="filter" type="radio" />
                    <label>Time</label>
                  </div>
                </div>
                
                <button className="light-effect-button">Buscar</button>
              </div>
            </article>
          </main>

          {/* LISTA DE BUSCA EMAIL */}
            {[1].length === 0 ? ""
            :
          <article className="border-l-2 border-red-500 p-2 pb-4 max-xl:w-full">
            <div className="w-full h-32 border-2 rounded-lg p-2 overflow-x-hidden overflow-y-scroll box-border">
              {/* card */}
              <div className="flex border rounded-l-lg border-red-500 h-12 justify-start mb-4">
                <div className="rounded-l-lg w-5 bg-red-500"/>
                <div className="flex items-center ml-4">
                  <h1>luca@gmail.com</h1>
                </div>
              </div>
              {/* card */}
              <div className="flex border rounded-l-lg border-red-500 h-12 justify-start mb-4">
                <div className="rounded-l-lg w-5 bg-red-500"/>
                <div className="flex items-center ml-4">
                  <h1>diretor@gmail.com</h1>
                </div>
              </div>
              {/* card */}
              <div className="flex border rounded-l-lg border-red-500 h-12 justify-start mb-4">
                <div className="rounded-l-lg w-5 bg-red-500"/>
                <div className="flex items-center ml-4">
                  <h1>gerente@gmail.com</h1>
                </div>
              </div>
            </div>
          </article>
          }
        </section>
      </main>
    </>
  )
}
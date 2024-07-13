import { useEffect, useState } from "react";

import { RadioContainer } from "./components/RadioContainer";
import { Header } from "./components/header";
import { format, subDays } from "date-fns";

export function App() {
  const [selectBook, setSelectBook] = useState('');
  const [saudacao, setSaudacao] = useState('');
  const [diaAnterior, setDiaAnterior] = useState('');

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
  }, [])

  return (
    <>
      <Header />

      <main className="flex justify-center items-start px-8 gap-8 max-xl:flex-col-reverse">
        <section className="w-full">
          <div className="flex w-full items-center justify-evenly">
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

          <textarea className="border-2 w-full mt-12 p-2" value={`Prezados ${saudacao}!\nSegue o relatório de ${selectBook == '' ? '{ selecione um book }' : selectBook == 'Conversao' ? 'Conversão' : selectBook.split(/(?=[A-Z])/).map((string) => string.charAt(0).toUpperCase() + string.slice(1)).join(' ')} com dados de até ${diaAnterior}`}/>
        </section>
        
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
                <input className="w-full border-b-2 border-l-2 border-black rounded-bl-md pl-1 outline-none duration-[350ms] focus:border-red-500" type="email" placeholder="Informe o Email..." />
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
            <div className="w-full h-32 border-2 p-2 overflow-x-hidden overflow-y-scroll box-border">
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
      
      {/* <h1 className="text-6xl font-bold text-center underline text-red-600">
        LUCA GAYYYY!
      </h1> */}
    </>
  )
}
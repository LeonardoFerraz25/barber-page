import { Popover } from '@headlessui/react';
import { List } from 'phosphor-react';

export function Hamburger() {
  return(
    <Popover className="mobile:fixed absolute top-5 right-5 flex flex-col items-end sm:invisible ">
    <Popover.Button className="text-zinc-400 hover:text-zinc-100 transition-all duration-500 ease-linear">
      <List size={32} />
    </Popover.Button>

    <Popover.Panel className="absolute z-10">
      <div className="bg-zinc-900 h-[10rem] p-4 absolute top-16 right-0 flex flex-col items-center justify-center shadow-lg w-[calc(100vw-2rem)] transition-all duration-500 ease-linear">
        <a className="nav-link" href="">Home</a>
        <a className="nav-link" href="">Sobre</a>
        <a className="nav-link" href="">Serviços</a>
        <a className="nav-link" href="">Horarios</a>
        <a className="nav-link" href="">Contatos</a>
      </div>
    </Popover.Panel>
  </Popover>
  )
}
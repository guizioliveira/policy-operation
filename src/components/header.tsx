import { Github } from 'lucide-react'

export function Header() {
  return (
    <div className="w-full border-b-gray-200 border-b px-4 md:px-0">
      <div className="container mx-auto h-20 flex justify-between items-center">
        <div className="flex gap-1 items-end">
          <h1 className="text-brand-300 font-exo font-bold italic text-2xl md:text-4xl leading-tight">
            Sicredi
          </h1>
          <span className="text-brand-400 font-exo italic text-sm md:text-base">
            Operações de apólices
          </span>
        </div>

        <a
          href="https://github.com/guizioliveira"
          target="_blank"
          className="border-brand-400 bg-brand-500 flex items-center p-2 rounded-full hover:bg-brand-600 transition-colors duration-400"
          rel="noreferrer"
        >
          <Github size={24} color="white" />
        </a>
      </div>
    </div>
  )
}

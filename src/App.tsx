/*
 *   Copyright (c) 2025 
 *   All rights reserved.
 */
import './index.css'
import { useMemo, useRef, useState } from 'react'
import emailjs from '@emailjs/browser'

export default function App(){
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState<string | null>(null)

  const formRef = useRef<HTMLFormElement | null>(null)
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [topic, setTopic] = useState('')

  const emailConfig = useMemo(() => ({
    serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID as string | undefined,
    templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string | undefined,
    publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined,
  }), [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitMessage(null)

    if(!emailConfig.serviceId || !emailConfig.templateId || !emailConfig.publicKey){
      setSubmitMessage('Konfigurimi i email-it mungon. Ju lutemi vendosni VITE_EMAILJS_* në .env.')
      return
    }

    try{
      setIsSubmitting(true)
      await emailjs.send(
        emailConfig.serviceId,
        emailConfig.templateId,
        {
          full_name: fullName,
          phone_number: phone,
          email_address: email,
          discussion_topic: topic,
        },
        { publicKey: emailConfig.publicKey }
      )
      setSubmitMessage('Faleminderit! Kërkesa u dërgua me sukses.')
      setFullName(''); setPhone(''); setEmail(''); setTopic('')
      formRef.current?.reset()
    }catch(err){
      console.error(err)
      setSubmitMessage('Na vjen keq, dërgimi dështoi. Provo përsëri më vonë.')
    }finally{
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="fixed z-50 inset-x-0 top-0 bg-white/85 backdrop-blur border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 font-extrabold text-[#0a1e4b]">
            <span className="inline-grid place-items-center w-10 h-10 rounded-md bg-[#0a1e4b] text-white">31</span>
            <span className="text-sm font-semibold tracking-wide">Fatmir Osmani</span>
          </div>
          <nav className="hidden md:flex gap-6 text-[#0a1e4b] font-semibold">
            <a href="#home" className="hover:opacity-70">Ballina</a>
            <a href="#kafe" className="hover:opacity-70">Hajde Ta Qes Ni Kafe!</a>
            <a href="#priorities" className="hover:opacity-70">Prioritetet</a>
          </nav>
          <button aria-label="Menu" className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-md border border-slate-300 text-[#0a1e4b]" onClick={() => setIsMobileMenuOpen(v => !v)}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              {isMobileMenuOpen ? (
                <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
              ) : (
                <path fillRule="evenodd" d="M3.75 5.25a.75.75 0 0 1 .75-.75h15a.75.75 0 0 1 0 1.5h-15a.75.75 0 0 1-.75-.75Zm0 6a.75.75 0 0 1 .75-.75h15a.75.75 0 0 1 0 1.5h-15a.75.75 0 0 1-.75-.75Zm0 6a.75.75 0 0 1 .75-.75h15a.75.75 0 0 1 0 1.5h-15a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
              )}
            </svg>
          </button>
        </div>
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white/95 backdrop-blur-sm">
            <nav className="max-w-6xl mx-auto px-5 py-3 grid gap-3 text-[#0a1e4b] font-semibold">
              <a href="#home" className="py-1" onClick={() => setIsMobileMenuOpen(false)}>Ballina</a>
              <a href="#kafe" className="py-1" onClick={() => setIsMobileMenuOpen(false)}>Hajde Ta Qes Ni Kafe!</a>
              <a href="#priorities" className="py-1" onClick={() => setIsMobileMenuOpen(false)}>Prioritetet</a>
            </nav>
          </div>
        )}
      </header>

      <section id="home" className="relative min-h-[92vh] grid place-items-center text-white pt-16 scroll-mt-24 md:scroll-mt-28" style={{backgroundImage:"url('/hero.JPG')", backgroundSize:'contain', backgroundRepeat:'no-repeat', backgroundPosition:'center 60px', backgroundColor:'#ffffff'}}>
        <div className="absolute inset-0"></div>
        <div className="absolute md:top-24 top-16 -right-[6vw] w-[48vw] md:w-[42vw] max-w-[620px] aspect-square opacity-20" style={{clipPath:'polygon(0 0,100% 0,100% 72%,72% 100%,0 100%)', background:'linear-gradient(135deg,#e61f78,#39b6f0)'}} />
        <div className="absolute -left-[14vw] -bottom-[8vh] w-[70vw] md:w-[55vw] h-[24vh] md:h-[28vh] bg-[#081c44] opacity-20" style={{transform:'skewY(-31deg)'}} />
        <div className="relative max-w-6xl mx-auto px-5">
          {/* <h1 className="text-[clamp(56px,7.5vw,110px)] font-extrabold tracking-tight drop-shadow-[0_2px_0_rgba(0,0,0,0.05)]">Voto <span className="opacity-90 font-light">31</span></h1>
          <p className="max-w-2xl text-lg md:text-xl mt-1">Për një të nesërme më të mirë – për Vushtrrinë.</p> */}
          {/* <div className="mt-6 flex gap-3 flex-wrap">
            <a href="#kafe" className="inline-flex items-center rounded-full bg-[#e61f78] text-white font-bold px-6 py-3">Hajde Ta Qes Ni Kafe!</a>
            <a href="#priorities" className="inline-flex items-center rounded-full border border-white/80 px-6 py-3">Shiko programin</a>
          </div> */}
          {/* <div className="absolute right-4 top-1/2 -translate-y-1/2 bg-[#081c44]/90 border border-white/20 rounded-md px-3 py-2 text-6xl font-black">31</div> */}
        </div>
      </section>

      {/* Prioritetet */}
      <section id="priorities" className="py-20 bg-white scroll-mt-24 md:scroll-mt-28">
        <div className="max-w-6xl mx-auto px-5">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0a1e4b] mb-6">Prioritetet</h2>
          <div className="grid md:grid-cols-3 gap-5">
            <article className="border border-slate-200 rounded-xl p-5">
              <h3 className="font-bold text-lg mb-2">Arsimi dhe rinia</h3>
              <p className="text-slate-700">Shkolla të sigurta, laboratorë modernë dhe programe për sipërmarrje rinore.</p>
            </article>
            <article className="border border-slate-200 rounded-xl p-5">
              <h3 className="font-bold text-lg mb-2">Infrastruktura e zgjuar</h3>
              <p className="text-slate-700">Rikonstruksion i rrugëve dhe hapësirave të gjelbra.</p>
            </article>
            <article className="border border-slate-200 rounded-xl p-5">
              <h3 className="font-bold text-lg mb-2">Ekonomia lokale</h3>
              <p className="text-slate-700">Lehtësira për bizneset e vogla dhe mbështetje për fermerët.</p>
            </article>
          </div>
        </div>
      </section>

      <section id="kafe" className="py-20 bg-white scroll-mt-24 md:scroll-mt-28">
        <div className="max-w-5xl mx-auto px-5">
          <h2 className="text-3xl font-extrabold text-[#0a1e4b] mb-4">Hajde Ta Qes Ni Kafe!</h2>
          <p className="mb-6">Bashkohu për një bisedë rreth ideve dhe sfidave në lagjen tënde.</p>
          <form ref={formRef} onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
            <input value={fullName} onChange={e=>setFullName(e.target.value)} required name="full_name" className="border border-slate-300 rounded-lg px-4 py-3" placeholder="Emri dhe mbiemri" />
            <input value={phone} onChange={e=>setPhone(e.target.value)} required name="phone_number" className="border border-slate-300 rounded-lg px-4 py-3" placeholder="Telefoni" />
            <input value={email} onChange={e=>setEmail(e.target.value)} type="email" name="email_address" className="border border-slate-300 rounded-lg px-4 py-3 md:col-span-2" placeholder="Email (opsionale)" />
            <textarea value={topic} onChange={e=>setTopic(e.target.value)} required name="discussion_topic" className="border border-slate-300 rounded-lg px-4 py-3 md:col-span-2" rows={3} placeholder="Tema e bisedës"></textarea>
            <button type="submit" disabled={isSubmitting} className="md:col-span-2 mt-2 rounded-full bg-brandPink bg-[#e61f78] text-white font-bold px-6 py-3 w-full md:w-auto border border-pink-200 shadow-sm disabled:opacity-60 disabled:cursor-not-allowed">
              {isSubmitting ? 'Duke dërguar...' : 'Dërgo kërkesën'}
            </button>
            {submitMessage && (
              <div className="md:col-span-2 text-sm mt-1">
                {submitMessage}
              </div>
            )}
          </form>
        </div>
      </section>

      {/* Slogan banner placeholder (supply text later) */}
      <section id="slogan" className="py-12 bg-[#f7f8fb] scroll-mt-24 md:scroll-mt-28">
        <div className="max-w-6xl mx-auto px-5 text-center">
          <span className="inline-block text-sm tracking-widest font-bold text-[#e61f78]">#PDK191</span>
          <h2 className="mt-2 text-3xl md:text-4xl font-extrabold">Ma mirë për Vushtrrinë</h2>
        </div>
      </section>

      <footer className="mt-auto bg-[#0a1e4b] text-white">
        <div className="max-w-6xl mx-auto px-5 py-10 grid md:grid-cols-3 gap-6">
      <div>
            <div className="flex items-center gap-2 font-extrabold">
              <span className="inline-grid place-items-center w-10 h-10 rounded-md bg-white text-[#0a1e4b]">31</span>
              <span className="opacity-90">Së bashku për qytetin</span>
            </div>
            <p className="mt-3 text-white/80 text-sm max-w-sm">Fasha zyrtare e fushatës – bashkohu me nismën dhe ndaje idetë e tua.</p>
          </div>
          <nav className="text-white/90 text-sm grid gap-2">
            <a href="#home" className="hover:text-white">Ballina</a>
            <a href="#kafe" className="hover:text-white">Hajde Ta Qes Ni Kafe!</a>
            <a href="#priorities" className="hover:text-white">Prioritetet</a>
          </nav>
          <div className="text-sm">
            <div className="font-semibold mb-2">Kontakti</div>
            <a className="hover:underline" href="mailto:campaign@example.com">kswrp@outlook.com</a>
          </div>
      </div>
        <div className="bg-[#07183d] py-4 text-center text-white/80 text-sm">© <span id="year"></span> Fatmir Osmani • Të gjitha të drejtat e rezervuara</div>
      </footer>
      </div>
  )
}

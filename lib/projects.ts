export type Project = {
  slug: string
  name: string
  category: string
  url: string
  image: string
  summary: string
  overview: string
  direction: string
  features: string[]
  tech: string[]
  note?: string
}

export const projects: Project[] = [
  {
    slug: 'bookly', name: 'BOOKLY', category: 'Kitob do‘koni · Veb ilova', url: 'https://bookly-kutubxonasi.vercel.app/kun/index.html', image: '/projects/bookly.png',
    summary: 'O‘zbek tilidagi onlayn kitob do‘koni: hikoyalarni kashf etish va katalogni qulay ko‘zdan kechirish uchun.',
    overview: 'BOOKLY o‘zbek tilidagi onlayn kitob do‘koni tajribasini taqdim etadi. Bosh sahifa va katalog kitoblarni tabiiy tarzda topishga yordam beradi.',
    direction: 'Adabiy ruhdagi dizayn to‘q yashil rang, iliq qog‘oz tuslari va ifodali serif shriftlarni birlashtiradi.',
    features: ['Kitoblarni qidirish va katalog bo‘ylab yurish', 'Muallif va janr ko‘rsatilgan kitob sahifalari', 'Interfeysda ko‘rinadigan saralanganlar va savat boshqaruvi'], tech: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap 5.3'],
  },
  {
    slug: 'faceter', name: 'FACETER', category: 'Veb loyiha · Videokuzatuv', url: 'https://faceter-six.vercel.app/', image: '/projects/faceter.png',
    summary: 'Biznes va uy uchun videokuzatuv xizmati: kameralar, tariflar va demo imkoniyatlari taqdim etilgan veb-sayt.',
    overview: 'FACETER — videokuzatuv xizmatiga bag‘ishlangan rus tilidagi mahsulot sayti. Unda biznes xavfsizligi, demo-kamera va kamera tasvirlari asosiy o‘rinda.',
    direction: 'Yorqin ko‘k fon, tiniq tipografika va yirik mahsulot tasvirlari xavfsizlik xizmatini darhol anglashga yordam beradi.',
    features: ['Biznes va uy uchun alohida bo‘limlar', 'Kameralar va tariflar bo‘limi', 'Demo-kamerani ko‘rishga chaqiruv'], tech: ['HTML5', 'CSS3'],
  },
  {
    slug: 'chiptauz', name: 'CHIPTAUZ', category: 'Chiptalar · Veb ilova', url: 'https://chiptauz.vercel.app/kun/index.html', image: '/projects/chiptauz.png',
    summary: 'Poyezd, avtobus va aviaqatnovlarni ko‘rib chiqish uchun o‘zbek tilidagi chipta interfeysi.',
    overview: 'CHIPTAUZ (sahifa tasvirida Temiryo‘l deb ko‘rsatilgan) transport bo‘limlari va safar rejalash formasiga ega chipta xizmatini taqdim etadi.',
    direction: 'To‘q ko‘k va och ranglar uyg‘unligi hamda sayohat tasvirlari bron qilish interfeysiga sodda va amaliy kayfiyat beradi.',
    features: ['Poyezd, avtobus va aviachipta bo‘limlari', 'Jo‘nash, manzil va sana maydonlari', 'Sahifada ko‘rinadigan akkaunt va ro‘yxatdan o‘tish havolalari'], tech: ['HTML5', 'CSS3', 'JavaScript', 'MapLibre GL JS 5.2', 'Three.js'],
  },
  {
    slug: 'velox', name: 'VELOX', category: 'Avtomobil konsepti · Vizual tajriba', url: 'https://volex-six.vercel.app/', image: '/projects/velox.png',
    summary: 'Mustaqil avtomobil madaniyatiga bag‘ishlangan konsept: xayoliy avtomobillar va vizual hikoya orqali taqdim etilgan.',
    overview: 'VELOX — avtomobil ishlab chiqaruvchisi emas, balki avtomobil mavzusidagi veb-konsept. Sayt dramatik avtomobil sahnasi va konsept bo‘ylab navigatsiyadan boshlanadi.',
    direction: 'Kinematik qorong‘i tasvirlar, nozik qahrabo aksentlari va tahririyat uslubidagi yozuvlar o‘ziga xos muhit yaratadi.',
    features: ['Ta’sirchan boshlang‘ich kompozitsiya', 'To‘plam va model bo‘ylab navigatsiya', 'Avtomobil mavzusidagi vizual hikoya'], tech: ['Next.js', 'React', 'JavaScript', 'CSS'], note: 'Xayoliy avtomobillar qatnashgan ijodiy konsept. Haqiqiy texnik tavsif yoki sotuvda mavjudlik nazarda tutilmaydi.',
  },
  {
    slug: 'nexora', name: 'NEXORA', category: 'AI konsepti · Interaktiv platforma', url: 'https://nexora-sigma-smoky.vercel.app/', image: '/projects/nexora.png',
    summary: 'Interaktiv vizual tizim, mahsulot taqdimoti, demo simulyatsiyasi, tariflar va FAQ bo‘limiga ega AI-platforma konsepti.',
    overview: 'NEXORA AI platformasini konsept veb-sayt ko‘rinishida taqdim etadi. Jonli sahifada platforma navigatsiyasi va o‘ziga xos orbital vizual uslub mavjud.',
    direction: 'Qora sirtlar, texnik tipografika va yorqin binafsha markaz puxta ilmiy-fantastik kayfiyat yaratadi.',
    features: ['Platforma va imkoniyatlar taqdimoti', 'Mahalliy demo simulyatsiyasi', 'Namunaviy tariflar, FAQ va aloqa bo‘limlari'], tech: ['Next.js', 'React', 'JavaScript', 'CSS'], note: 'Demo mahalliy simulyatsiya bo‘lib, ishlayotgan AI modeli emas; narxlar namunaviy. Boshqa deployment alohida loyiha sifatida ko‘rsatilmagan.',
  },
  {
    slug: 'estora', name: 'ESTORA', category: 'Ko‘chmas mulk konsepti · Veb tajriba', url: 'https://estora-one-azure.vercel.app/', image: '/projects/estora.png',
    summary: 'Ko‘chmas mulk, joylar va xizmatlarni tahririyat uslubidagi interfeys orqali kashf etishga mo‘ljallangan konsept.',
    overview: 'ESTORA — ko‘chmas mulk mavzusidagi veb-sayt konsepti. Bosh sahifada interyer tasviri, obyektlarga yo‘naltirilgan navigatsiya va qidiruv chaqiriqlari mavjud.',
    direction: 'Iliq fil suyagi ranglari, sokin tipografika va arxitektura fotosuratlari premium va osoyishta taqdimot yaratadi.',
    features: ['Mulk obyektlarini izlash va filtrlash', 'Hududlar va xizmatlar taqdimoti', 'So‘rov yuborish interfeysi'], tech: ['Next.js', 'React', 'JavaScript', 'CSS'], note: 'Faqat namoyish uchun. E’lonlar, narxlar, statistika va aloqa ma’lumotlari haqiqiy hayotga oid tasdiqlangan ma’lumotlar emas.',
  },
]

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug)
}

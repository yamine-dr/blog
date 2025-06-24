export default function Section({ id = "", marginTop = 6, children }) {
  return (
    <section id={id} className={`mt-${marginTop} px-[10%] py-20 w-full flex flex-col justify-center gap-10 max-md:px-5 max-md:max-w-full`}>
      {children}
    </section>
  )
}

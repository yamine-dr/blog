export default function Section({ id = "", className, children }) {
  return (
    <section id={id} className={`px-[10%] py-20 w-full flex flex-col justify-center gap-10 max-md:px-5 max-md:max-w-full ${className}`}>
      {children}
    </section>
  )
}

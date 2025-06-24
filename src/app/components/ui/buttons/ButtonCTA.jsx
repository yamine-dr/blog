export default function ButtonCTA({ onClick = () => {}, children }) {
  return (
    <button className="hover:scale-105 transition-all" onClick={onClick}>
      <a
        href="#contact"
        className="inline-block max-lg:mx-auto lg:my-auto px-9 max-md:px-5 py-2 max-w-[202px] sm:w-[202px] text-xl md:text-2xl text-center text-newgreen-100 bg-newgreen-500 hover:text-newgreen-500 hover:bg-newgreen-100 hover:scale-105 transition-all border rounded-xl"
      >
        {children}
      </a>
    </button>
  )
}
export default function ButtonSecondary({ to = "#", children }) {
  return (
    <button>
      <a
        href={to}
        className="inline-block my-auto px-9 max-md:px-5 py-2 max-w-[202px] sm:w-[202px] text-xl md:text-2xl text-center text-base-100 bg-base-content hover:text-base-content hover:bg-base-100 hover:scale-105 transition-all border rounded-xl"
      >
        {children}
      </a>
    </button>
  )
}
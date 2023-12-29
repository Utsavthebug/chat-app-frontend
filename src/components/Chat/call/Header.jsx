import { AddContactIcon, ArrowIcon, LockIcon } from "../../../svg"

const Header = () => {
  return (
    <header className=" absolute top-0 w-full z-40">
        {/* Header Container */}
        <div className="p-1 flex items-center justify-between">
            {/* Return Button */}
        <button className="btn">
        <span className="rotate-180">
            <ArrowIcon className={"fill-white"}/>
        </span>
        </button>
        <p className="flex items-center">
            <LockIcon className={"fill-white scale-75"}/>
            <span className="text-xs text-white">End-to-end Encrypted</span>
        </p>

        {/* Add contact to call */}
        <button className="btn">
        <AddContactIcon className={"fill-white"}/>
        </button>
        </div>
    </header>
  )
}

export default Header
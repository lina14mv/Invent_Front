const A = (props) => {
    return(
        <a href={props.href} className="border rounded-full px-8 py-2 text-black bg-green-400 text-xl font-bold hover:bg-green-500 focus:animate-spin delay-150">
            {props.children}
        </a>
    )
};

const Boton = (props) => {
    return(
        <button className={`font-bold delay-150 text-3xl hover:font-extrabold hover:cursor-pointer ${props.className}`} onClick={props.onClick}>
            {props.children}
        </button>
    )
};

const Input = (props) => {
    return(
        <input type={props.type} placeholder={props.placeholder} className={`w-80 border-b-2 border-green-600 ${props.className}`} />
    )
};

export {Boton, A, Input};
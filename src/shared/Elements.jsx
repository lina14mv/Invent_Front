const A = (props) => {
    return(
        <a href={props.href} className="border rounded-full px-4 py-2 text-black bg-green-400 text-sm font-bold hover:bg-green-500 focus:animate-spin delay-150 hover:outline-2 outline-green-600">
            {props.children}
        </a>
    )
};

const Boton = (props) => {
    return(
        <button type={props.type} className={`font-bold delay-150 text-2xl hover:font-extrabold hover:cursor-pointer ${props.className}`} onClick={props.onClick}>
            {props.children}
        </button>
    )
};

const Input = (props) => {
    return(
        <input type={props.type} name={props.name} value={props.value} onChange={props.onChange} placeholder={props.placeholder} className={`w-64 h-7 border-b-2 border-green-600 focus:border-3 ${props.className}`} />
    )
};

export {Boton, A, Input};
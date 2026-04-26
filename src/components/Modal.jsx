function Modal({onClick, content}) {
    return (
        <div 
            className="flex justify-center items-center flex-col fixed h-screen w-screen gap-3 
            bg-black/70 backdrop-blur-sm z-99"
            onClick={onClick}
        >
            {content}
        </div>
    )
}

export default Modal
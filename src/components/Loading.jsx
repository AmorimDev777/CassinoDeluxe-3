import ImgLoading from "../assets/ImgLoading.png"
function Loading() {
    return (
        <div className="flex justify-center items-center fixed top-0 left-0 h-screen w-full 
        backdrop-blur-lg"
        >
            <img src={ImgLoading} alt="" className="h-50 aspect-square object-contain 
            animate-[bounce_0.3s_linear_infinite]"
            />
        </div>
    )
}
export default Loading
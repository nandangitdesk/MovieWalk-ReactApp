import notfound from "/levels-error-404.png"

const NotFound = () => {
  return (
    <div className="h-screen w-screen flex bg-black justify-center items-center ">
        <img  src={notfound} alt="" />
    </div>
  )
}

export default NotFound
import React from 'react'
import ReactDOM  from 'react-dom'
const Backdrop=({showCart})=>{
    const showCartHandler=()=>{
        showCart()
    }
    return <div className='backdrop' onClick={showCartHandler} style={{backgroundColor:'rgb(0,0,0,0.75)',height:'100vh',width:'100%',position:'fixed'}}>
    </div>
}

const ModelOveray=({children})=>{
    return (<div style={{backgroundColor:'white',height:'30vh',position:'fixed',zIndex:'1',top:'50%',left:'50%',transform:'translate(-50%)'}}>
        {children}
    </div>)
}

const portalElement=document.getElementById('overlay')
const Modal = ({children,showCart}) => {
  return (
   <>
   {ReactDOM.createPortal(<Backdrop showCart={showCart}/>,portalElement)}
   {ReactDOM.createPortal(<ModelOveray>{children}</ModelOveray>,portalElement)}
   </>
  )
}

export default Modal
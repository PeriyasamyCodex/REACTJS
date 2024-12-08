import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

const Modal = forwardRef(function Modal({children,className='', ...props},ref) {

    const currRef = useRef();

    useImperativeHandle(ref, () => {
        return {
            open() {
                currRef.current.showModal();
            },
            close: () => {
                currRef.current.close();
            }
        }
    })



    return createPortal(
        <dialog ref={currRef} className={`modal ${className}`}  {...props}>
        {children}
        </dialog>
    , document.getElementById('modal'));
});

export default Modal;
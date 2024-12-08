import { forwardRef, useImperativeHandle, useRef } from "react";
import Button from "./Button";
import { createPortal } from "react-dom";

const Modal = forwardRef(function Modal({children, ...props}, ref) {
const currRef = useRef();
useImperativeHandle(ref,() => {
    return {
        open() {
            currRef.current.showModal();
        }
    }
});

    return createPortal(
        <dialog ref={currRef} {...props} >
                {children}
                <form method="dialog" className="mt-4 text-right">
        <Button>Okay</Button>
      </form>
            </dialog>
    , document.getElementById('modal-root'));
});

export default Modal;
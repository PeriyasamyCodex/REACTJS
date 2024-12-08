export function TabButton({children, isBtnSelected, handleBtnClick}) {
    return (

        <li><button className={isBtnSelected ? "active" : ""} onClick={handleBtnClick}>{children}</button></li>

    );
}
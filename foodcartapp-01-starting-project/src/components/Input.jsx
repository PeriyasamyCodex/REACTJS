export default function Input({label,...props}) {
    return (
        <p className="control">
        <label htmlFor={label}>{label}</label>
        <input name={props.id} {...props}/>
        </p>
    );
}
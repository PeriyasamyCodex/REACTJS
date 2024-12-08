export function CoreConcept(props) {
    return (
      <li>
    <img src={props.image} />
    <h2>{props.title}</h2>
    <p>{props.description}</p>
    </li>
    );
  
  }
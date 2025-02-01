import IntermediateComponent from "./IntermediateComponent";
import { useUser } from '../context/UserContext';
const ParentComponent = () => {
   const user = useUser();
    return (
        <>
        <h1>Parent Component of {user.name}</h1>
        {/* pass the user object as a prop to Intermediate Component*/ }
        <IntermediateComponent/>
        </>
    )
}
export default ParentComponent;
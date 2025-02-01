import ChildComponent from "./ChildComponent";
const IntermediateComponent = () => {
    return (
        <>
            <h1>Intermediate Component</h1>
            {/* pass the user prop further down to child component*/ }
            <ChildComponent/>
        </>
    )
}
export default IntermediateComponent;
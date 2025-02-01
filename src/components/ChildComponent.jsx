import { useUser } from '../context/UserContext';

const ChildComponent = () => {
    const user = useUser();
    return (
        <>
            <h1>Child Component</h1>
            <p>Name: {user.name}</p>
            <p>Age: {user.age}</p>
        </>
    )
}
export default ChildComponent;
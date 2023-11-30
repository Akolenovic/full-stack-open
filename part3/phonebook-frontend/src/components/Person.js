const Person = ({name, number, handleRemovePerson}) => (
    <div key={name}> 
    {name} {number} <button onClick={handleRemovePerson}>Delete</button>
    </div>
)


export default Person;
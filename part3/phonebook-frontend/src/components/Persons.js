import Person from "./Person";

const Persons = ({persons, query, handleRemovePerson }) => (
    <>
        {persons
        .filter(person => person.name.toLowerCase().includes(query))
        .map(({name, number, id}) =>
        <Person 
        name={name} 
        number={number} 
        handleRemovePerson={handleRemovePerson(id, name)}
        /> ) }
    </>
)

export default Persons;
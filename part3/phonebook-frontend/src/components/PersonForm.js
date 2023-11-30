const PersonForm = ({
    name, 
    number, 
    handleChangeName, 
    handleChangeNumber, 
    handleAddNewPerson
}) =>   ( 
    <form onSubmit={handleAddNewPerson}>
        <div>
            name: <input value={name} onChange={handleChangeName}/>
        </div>
        <div>
            number: <input value={number} onChange={handleChangeNumber}/>
            </div>
        <div>
            <button type="submit">add</button>
        </div>
  </form>
)

export default PersonForm;
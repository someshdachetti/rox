import './index.css'
export const SelectTransaction = (props) =>{
    const {setMonth} =props
    return (
        <>
        <div>
            <div className= 'select-container' >
                <select className='select' onChange={setMonth}>
                    <option value='Jan'>Jan</option>
                    <option value ='Feb'>Feb</option>
                    <option value='Mar' selected>Mar</option>
                    <option value ='Apr'>Apr</option>
                    <option value ='May'>May</option>
                    <option value='Jun'>Jun</option>
                    <option value ='Jul'>Jul</option>
                    <option value='Aug'>Aug</option>
                    <option value='Sep'>Sep</option>
                    <option value ='Oct'>Oct</option>
                    <option value='Nov'>Nov</option>
                    <option value ='Dec'>Dec</option>
                </select>
            </div>
        </div>
        </>
    )
}


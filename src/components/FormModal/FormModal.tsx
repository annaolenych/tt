import { useState } from "react"
import ReactModal from "react-modal"
import "./FormModal.css"
import { DateTime } from "luxon"
import { useForm } from "react-hook-form"
import { getTables, updateCustomer } from "../../util/api"
import { useDispatch } from "react-redux"
import { tableSlice } from "../../store/store"


ReactModal.setAppElement("#root")
export const FormModal = ({ customer }) => {
    const [isOpen, setIsOpen] = useState(false)
    const { register, reset, handleSubmit, formState: { errors } } = useForm();
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch()
    console.log(customer)
    return (
        <>

            <button onClick={() => {
                setIsOpen(true)
            }}>
                <span className="material-symbols-outlined">
                    edit
                </span>
            </button>
            <ReactModal isOpen={isOpen}>
                {JSON.stringify(customer)}




                <form onSubmit={handleSubmit(async (data: object) => {
                    try {
                        setIsLoading(true)
                        await updateCustomer(customer.id, data)
                        const customers = await getTables()
                        dispatch(tableSlice.actions.setTableData(customers))
                    } catch {

                    } finally {
                        setIsOpen(false)
                        // setIsLoading(false)
                    }

                })}>
                    <h2>Change table data</h2>
                    <div className="input-container">
                        <div>
                            <label htmlFor="nameInput">Name:</label>
                            <input
                                id="nameInput"
                                type="text"
                                {...register("name", { required: true, maxLength: 255, value: customer.name })} />
                            {errors.name && <span className='errors-message'>{errors.name.message.toString()}</span>}
                        </div>
                        <div>
                            <label htmlFor="emailInput">Email:</label>
                            <input
                                id="emailInput"
                                type="text"

                                {...register("email", { required: true, maxLength: 255, value: customer.email, pattern: { value: /^[^\s@]+@[^\s@]+.[^\s@]+$/, message: "Email is not valid" } })} />
                            {errors.email && <span className='errors-message'>{errors.email.message.toString()}</span>}
                        </div>
                        <div>
                            <label htmlFor="birthdayInput">Birthday data:</label>
                            <input
                                id="birthdayInput"
                                type="date"
                                {...register("birthday_date", { required: true, maxLength: 255, value:customer.birthday_date})} />
                            {errors.birthday_date && <span className='errors-message'>{errors.birthday_date.message.toString()}</span>}
                        </div>
                        <div>
                            <label htmlFor="phoneInput">Phone number:</label>
                            <input
                                id="phoneInput"
                                type="text"
                                {...register("phone_number", { required: true, maxLength: 255, value: customer.phone_number, pattern: { value: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im, message: "Phone number is not valid" } })} />
                            {errors.phone_number && <span className='errors-message'>{errors.phone_number.message.toString()}</span>}
                        </div>
                        <div>
                            <label htmlFor="addresInput">Address:</label>
                            <input
                                id="addresInput"
                                type="text"
                                {...register("address", { required: true, maxLength: 255, value: customer.address })} />
                            {errors.address && <span className='errors-message'>{errors.address.message.toString()}</span>}
                        </div>

                        <div className="button-container">
                            <button disabled={isLoading} type="button" onClick={() => {

                                reset()
                                setIsOpen(false)
                            }}>Cancel</button>
                            <button disabled={isLoading} >Save</button>

                        </div>
                    </div>
                </form>


            </ReactModal>
        </>
    )
}
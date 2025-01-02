import React, { useState }from "react"

const InputBox = ({name, type, id, value, placeholder, icon, pClass, values, characterLimit}) => {

    const[passwordVisible, setPasswordVisible] = useState(false);
    const[des, setDes] = useState(0);

    const handleBlogDesChange = (e) => {
        const desLength = e.target.value.length;
        setDes(desLength);
    }

    return(
        <div className="relative w-[100%] mb-4">

            {
                type == "select" 
                ?
                <select name={name} className={"input-box bg-black border option:bg-white border-dark-grey text-white " + ( pClass ? " placeholder:text-dark-grey placeholder:-translate-x-8 placeholder:-translate-y-2 " : " placeholder:text-white")} placeholder={placeholder}>
                    {
                        values.map((value, i) => {
                            if(value == "Prefer not to say"){
                                return(
                                    <option value={value} key={i} className="option" selected>Prefer not to say</option>
                                )
                            }
                            return(
                                <option value={value} key={i} className="option">{value}</option>
                            )
                        })
                    }
                </select>
                :
                type == "textarea"
                ?
                <>
                    <textarea name={name} maxLength={characterLimit} defaultValue={value} placeholder={placeholder} className={" rounded-xl w-full h-full px-2 py-2 resize-none text-white bg-black border border-dark-grey"+ ( pClass ? " placeholder:text-dark-grey" : " placeholder:text-white")} onChange={handleBlogDesChange}></textarea>
                    <p className="mt-1 text-dark-grey text-sm text-right">{des}/{characterLimit}</p>
                </>
                :
                <>
                    <input name={name} type={type == "password" ? passwordVisible ? "text" : "password" : type} placeholder={placeholder} defaultValue={value} id={id} className={"input-box bg-black border border-dark-grey " + ( pClass ? " placeholder:text-dark-grey placeholder:-translate-x-8 placeholder:-translate-y-2" : " placeholder:text-white")} />
                    <i className= {("fi "+ icon +" input-icon") + " text-white"}></i>

                    {
                        type == "password" ?
                        <i className={"fi fi-rr-eye" + (!passwordVisible? "-crossed": "") + " input-icon left-[auto] right-4 cursor-pointer"} onClick={() => setPasswordVisible(currentVal => !currentVal)}></i> : ""
                    }
                </>
            }
        </div>


    )
}

export default InputBox;
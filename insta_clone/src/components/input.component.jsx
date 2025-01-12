import React, {useRef, useState }from "react"

const InputBox = ({name, type, id, value, placeholder, icon, pClass, values = [], characterLimit}) => {
    const dropDownRef = useRef();
    const customValueRef = useRef();
    const [selectedOption, setSelectedOption] = useState(values.includes(value) ? value : "Custom");
    const [selectedValue, setSelectedValue] = useState(value);
    const [inputValue, setInputValue] = useState(values.includes(value) ? "" : value);
    const [checked , setChecked] = useState(false);

    const[passwordVisible, setPasswordVisible] = useState(false);
    const[des, setDes] = useState(0);

    const handleBlogDesChange = (e) => {
        const desLength = e.target.value.length;
        setDes(desLength);
    }

    const handleDropdown = () => {
        dropDownRef.current.classList.toggle("hidden");
    }

    const handleSelection = (v) => {

        if(v != "Custom"){
            setSelectedValue(v)
            setSelectedOption(v)
            dropdownMenu.classList.add('hidden');
        }
        else if(v == "Custom"){
            setSelectedValue(inputValue);
            setSelectedOption(v);
        }
    }

    document.addEventListener('click', (e) => {
        if (!dropdownButton.contains(e.target) && !dropdownMenu.contains(e.target)) {
            dropdownMenu.classList.add('hidden');
        }
    });

    return(
        <>
            {
                type == "select" 
                ?
                <div className="relative w-[100%] mb-4">
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
                </div>
                :
                type == "textarea"
                ?
                <div className={"relative w-[100%] mb-4 " + (pClass)} >
                    <textarea name={name} maxLength={characterLimit} defaultValue={value} placeholder={placeholder} className={" rounded-xl w-full h-full px-2 py-2 resize-none text-white bg-hover "+ ( pClass ? " placeholder:text-dark-grey" : " placeholder:text-white")} onChange={handleBlogDesChange}></textarea>
                    <p className="absolute right-4 bottom-4 text-dark-grey text-sm">{des}/{characterLimit}</p>
                </div>
                :
                type == "dropdown"
                ?
                <div className="relative w-[100%] mb-4">
                    <input name={name} value={selectedValue} className="-z-10" readOnly hidden></input>
                    <button id="dropdownButton" className={"inline-flex w-full h-full text-lg font-medium text-white rounded-xl border border-dark-grey py-5 px-2 hover:bg-hover" + (selectedOption == "Custom" ? inputValue.length ? "" : " border-red " : "")} onClick={handleDropdown}>
                        <p className="">{selectedValue}</p>
                        <svg className="w-5 h-5 text-dark-grey ml-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </button>
                    <div id="dropdownMenu" className="hidden absolute right-0 w-[60%] origin-top-right rounded-2xl bg-light-grey " ref={dropDownRef}>
                        <div className="py-3" role="menu" aria-orientation="vertical" aria-labelledby="dropdownButton" >
                            {
                                values.map((value, i) => {
                                    return(
                                        <div className={"px-4 py-[1.3rem] " + (value == "Custom" ? "h-[8rem]" : "h-[4rem]") + " hover:bg-lighter-grey flex"} key={i}  onClick={() => handleSelection(value)} >
                                            <p className="text-white">{value}</p>
                                            <input checked={value == selectedOption} id={i} type="checkbox" className="peer ml-auto h-6 w-6 cursor-pointer appearance-none rounded-full checked:bg-white border border-white checked:opacity-100" readOnly role="menuitem"/>
                                            <span className="text-black opacity-0 peer-checked:opacity-100 pointer-events-none">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 translate-y-1 -translate-x-[19px]" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" strokeWidth="1">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                                </svg>
                                            </span>
                                            <input type="text" defaultValue={inputValue} id="customInput" ref={customValueRef} className={(value == "Custom" ? "": "hidden ") + "border border-white "+ (selectedOption == "Custom" ? inputValue.length ? "" : " border-red " : "") + " absolute w-[86%] h-12 rounded-xl p-2 bg-black  text-white translate-y-10"} onChange={(e) => {setInputValue(e.target.value), setSelectedValue(e.target.value)}}/>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>  
                :
                type == "Toggle"
                ?
                <>
                    <input name={name} value={checked} className="-z-10" readOnly hidden></input>
                    <label className="inline-flex items-center cursor-pointer">
                        <input type="checkbox" value="" className="sr-only peer" onChange={() => {setChecked(!checked)}} />
                        <div className="relative w-11 h-6 bg-dark-grey rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-hover after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-white"></div>
                    </label>
                </>



                :
                <div className="relative w-[100%] mb-4">
                    <input name={name} type={type == "password" ? passwordVisible ? "text" : "password" : type} placeholder={placeholder} defaultValue={value} id={id} className={"input-box bg-black border border-dark-grey " + ( pClass ? " placeholder:text-dark-grey placeholder:-translate-x-8 placeholder:-translate-y-2" : " placeholder:text-white")} />
                    <i className= {("fi "+ icon +" input-icon") + " text-white"}></i>
                    {
                        type == "password" ?
                        <i className={"fi fi-rr-eye" + (!passwordVisible? "-crossed": "") + " input-icon left-[auto] right-4 cursor-pointer"} onClick={() => setPasswordVisible(currentVal => !currentVal)}></i> : ""
                    }
                </div>
            }
        </>
    )
}

export default InputBox;
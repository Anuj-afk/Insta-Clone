import React from "react";

const SmallPost = ({link}) => {

    return(
        <div className="flex ">
            {link.endsWith(".jpeg") ?                
                <img src={link} className=" aspect-square w-[300px] object-fill" /> 
                :
                <video className=" aspect-square w-[300px] object-fill">
                    <source src={link} type= "video/mp4" className="w-full h-full" />
                    Your browser does not support the video tag.
                </video>
            }
        </div>
    )
}

export default SmallPost;
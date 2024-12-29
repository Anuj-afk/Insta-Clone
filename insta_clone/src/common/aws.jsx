import axios from "axios";

export const uploadImage = async (img, fileType) => {
    let imgUrl = null;
    console.log(fileType);
    await axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/get-upload-url", {fileType: fileType})
    .then(async ({data: {uploadUrl}}) => {

        await axios({
            method: "PUT",
            url: uploadUrl,
            data: img,
            headers: {
                // "Content-Type": "multipart/form-data",
                "Content-Type": fileType,
            },
        })
        .then(() => {
            imgUrl = uploadUrl.split("?")[0];
        })
        .catch(err => {
            console.log(err);
        })
    })
    .catch(err => {
        console.log(err);
    })
    return imgUrl;
}
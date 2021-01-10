import React from "react"
import IconButton from "@material-ui/core/IconButton"
import AttachFileIcon from "@material-ui/icons/AttachFile"
const PickFile: React.FC<any> = () => {
    return (
        <div>
            <IconButton>
                <AttachFileIcon />
                {/* <input type="file" id="file" ref="fileUploader" style={{ display: "none" }} /> */}
            </IconButton>
        </div>
    );
}

export default PickFile 
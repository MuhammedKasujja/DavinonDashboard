import React from "react"
import RegisterDriverCar from "../Drivers/RegisterDriverCar"
import PageContainer from "../../components/PageContainer/index"
import PageToolbar from "../../components/PageToolbar/index"
import IconButton from "@material-ui/core/IconButton"
import AttachFileIcon from "@material-ui/icons/AddAPhoto"
import Typography from "@material-ui/core/Typography"
import Tooltip from "@material-ui/core/Tooltip"
import Box from "@material-ui/core/Box"

const RegisterTruck: React.FC<any> = () => {
  const [imageName, setImageName] = React.useState('')
  const [selectedImage, setSelectedImage] = React.useState<File>()
  // const [imageUrl, setImageUrl] = React.useState(null|)
  const inputFile = React.createRef<HTMLInputElement>()
  const handleOpenFile = () => {
    if (inputFile.current) {
      const node = inputFile.current
      node.click();
    }
  }
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // console.log("Getting files")
    if (event.currentTarget) {
      if (event.currentTarget.files && event.currentTarget.files[0]) {
        setImageName(event.currentTarget.files[0].name)
        console.log(event.currentTarget.files[0])
        let reader = new FileReader();
        let file = event.currentTarget.files[0];
        setSelectedImage(file)
        console.log({ 'FileName': file.name })
        reader.onloadend = () => {
          // setImageUrl(reader.result)
        };
        reader.readAsDataURL(file); 
      }
    }
  };
  const displayImage = imageName ? (<Typography>{imageName}</Typography>) : null;
  const hint = imageName ? "Change Photo" : "Attach Car Photo"
  return (
    <PageContainer>
      <PageContainer>
        <PageToolbar
          title={`Add Cars`}
          actions={
            <Box display="flex" flexDirection="row">
              {displayImage}
              <Tooltip title={hint}>
                <IconButton onClick={handleOpenFile}>
                  <AttachFileIcon />
                </IconButton>
              </Tooltip>
            </Box>
          }
        />
        <input type="file" accept="image/*" id="file" ref={inputFile} style={{ display: "none" }} onChange={onChange} />
        <RegisterDriverCar image={selectedImage} />
      </PageContainer>
    </PageContainer>
  )
}
export default RegisterTruck
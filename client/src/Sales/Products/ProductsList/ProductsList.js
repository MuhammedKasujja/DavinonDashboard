import React from "react"
import { HotelOutlined } from "@material-ui/icons"
import PageContainer from '../../../_common/PageContainer'

export default function ProductsList(){
    const [name, setName] = React.useState('Nakimbugwe Hasifah')
    return (
       <PageContainer>
           <HotelOutlined/>
           Muhammed I love You
           {name} 
           Muhammed I love You
       </PageContainer>
    )
}
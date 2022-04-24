import Container from "@material-ui/core/Container"
import Typography from "@material-ui/core/Typography"
import React from "react"

interface SectionHeaderProps {
    title: string
}

const SectionHeader = (props: SectionHeaderProps) => {
    const { title } = props
    return (
        <Container fixed >
            <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '50px' }} >
                {title}
            </Typography>
        </Container>
    )
}

export default SectionHeader
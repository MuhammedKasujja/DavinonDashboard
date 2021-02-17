import { makeStyles, Theme, createStyles, StyleRules } from '@material-ui/core/styles'
import Card from 'App/components/Card/Card'
import CardBody from 'App/components/Card/CardBody'
import CardHeader from 'App/components/Card/CardHeader'
import GridContainer from 'App/components/Grid/GridContainer'
import GridItem from 'App/components/Grid/GridItem'
import PageContainer from 'App/components/PageContainer'
import PageToolbar from 'App/components/PageToolbar'
import React from 'react'
import { Link } from 'react-router-dom'

const styles: StyleRules = {
    cardCategoryWhite: {
        color: "rgba(255,255,255,.62)",
        margin: "0",
        fontSize: "14px",
        marginTop: "0",
        marginBottom: "0"
    },
    cardTitleWhite: {
        color: "#FFFFFF",
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: "bold",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none"
    }
}
 
// const useStyles = makeStyles(styles);

const useStyles = makeStyles(() => createStyles(styles))

const SettingsPage: React.FC<any> = () => {
    const classes = useStyles();
    return (
        <PageContainer>
            <PageToolbar
                title={`Settings`}
            />
            <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                    <Card>
                        <CardHeader color="primary">
                            <h4 className={classes.cardTitleWhite}>Vehicle Brands</h4>
                            <p className={classes.cardCategoryWhite}>All Car brands</p>
                        </CardHeader>
                        <CardBody>
                        </CardBody>
                    </Card>
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                    <Card>
                        <CardHeader color="primary">
                            <h4 className={classes.cardTitleWhite}>Vehicle Models</h4>
                            <p className={classes.cardCategoryWhite}>Car models</p>
                        </CardHeader>
                        <CardBody></CardBody>
                    </Card>
                </GridItem>
            </GridContainer>
            <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                    <Card>
                        <CardHeader color="primary">
                            <h4 className={classes.cardTitleWhite}>Vehicle Types</h4>
                            <p className={classes.cardCategoryWhite}>all car types</p>
                        </CardHeader>
                        <CardBody>

                        </CardBody>
                    </Card>
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                    <Card>
                        <CardHeader color="primary">
                            <h4 className={classes.cardTitleWhite}>Tonnages</h4>
                            <p className={classes.cardCategoryWhite}>truck Tonnages</p>
                        </CardHeader>
                        <CardBody>

                        </CardBody>
                    </Card>
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                    <Card>
                        <CardHeader color="primary">
                            <h4 className={classes.cardTitleWhite}>Truck Bodies</h4>
                            <p className={classes.cardCategoryWhite}>Vehicle bodies</p>
                        </CardHeader>
                        <CardBody></CardBody>
                    </Card>
                </GridItem>
            </GridContainer>
            <GridContainer>
                <GridItem xs={12} sm={12} md={3}>
                    <Card>
                        <CardHeader color="primary">
                            <h4 className={classes.cardTitleWhite}>Adverts</h4>
                            <p className={classes.cardCategoryWhite}>all car types</p>
                        </CardHeader>
                        <CardBody>

                        </CardBody>
                    </Card>
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                    <Card>
                        <CardHeader color="primary">
                            <h4 className={classes.cardTitleWhite}>Promo Codes</h4>
                            <p className={classes.cardCategoryWhite}>all car types</p>
                        </CardHeader>
                        <CardBody>

                        </CardBody>
                    </Card>
                </GridItem>
                <GridItem xs={12} sm={12} md={3} onClick={(e) => {
                    console.log({ 'GridClicked': true })
                }}>
                    <Card>
                        <CardHeader color="primary">
                            <h4 className={classes.cardTitleWhite}>Rental Packages</h4>
                            <p className={classes.cardCategoryWhite}>truck Tonnages</p>
                        </CardHeader>
                        <CardBody>

                        </CardBody>
                    </Card>
                </GridItem>
                <GridItem xs={12} sm={12} md={3} >
                    <Link to={'/admin/settings/general'}>
                        <Card>
                            <CardHeader color="primary">
                                <h4 className={classes.cardTitleWhite}>Application Settings</h4>
                                <p className={classes.cardCategoryWhite}>Vehicle bodies</p>
                            </CardHeader>
                            <CardBody></CardBody>
                        </Card>
                    </Link>
                </GridItem>
            </GridContainer>
        </PageContainer>)
}

export default SettingsPage
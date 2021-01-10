import React from "react"
// import Table from '../../components/Table/Table'
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import RegisterCarBrand from "./RegisterCarBrand"
import { useDispatch, useSelector } from "react-redux"
import { fetchBrands } from "../../../_store/CarBrands/actions"
import PageContainer from "../../components/PageContainer/index"
import PageToolbar from "../../components/PageToolbar/index"
import { RootStore } from "_store/store";
import { Table } from "App/components/Table";
import { CarBrand, CarModel } from "_store/CarBrands/types";
import { Link } from "react-router-dom";
import { Column } from "react-table";

const BrandsTable: React.FC = () => {
    const dispatch = useDispatch()
    const brandsState = useSelector(
        (state: RootStore) => state.brands,
    )
    React.useEffect(() => {
        //componetDidMount
        dispatch(fetchBrands());
    }, [])

    const columns: Array<Column<CarBrand>> = React.useMemo(
        () => [
            {
                // id: 'selectionX',
                Header: "Brand",
                // The cell can use the individual row's getToggleRowSelectedProps method
                // to the render a checkbox
                Cell: ({ row }) => {
                    // console.log({ RowData: row.original })
                    // creating a custom cell
                    return (
                        <Link to={{
                            pathname: `/admin/trucks/edit/${row.original.make}`,
                            // state: {
                            //     driverId: props.driver.id
                            // }
                        }} onClick={() => {
                            console.log("Yeah yes yes...........", row.original.make)

                            //   props.dispatch(addLocalDriver(row.original))
                        }}>{row.original.make}
                        </Link>
                    )
                },
                accessor: 'make',
            },
            {
                Header: 'Models',
                Cell: ({ value }: { value: CarModel[] }) => {
                    // console.log({ RowData: row.original })
                    // creating a custom cell
                    return (
                        <>{value.length}</>
                    )
                },
                accessor: (i:CarBrand)=>i.models,
            },
        ],
        []
    )

    return (
        <PageContainer>
            <PageToolbar
                title={`Car Brands`}
            />
            <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                    <Table<CarBrand>
                        name='brandsTable'
                        columns={columns}
                        data={brandsState.brands}
                    />
                </GridItem>
                <GridItem xs={12} sm={12} md={8}>
                    <RegisterCarBrand brandsList={brandsState.brands} />
                </GridItem>
            </GridContainer>
        </PageContainer>
    );

}

export default BrandsTable

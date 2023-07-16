import React from 'react'
import { connect } from 'react-redux'
import TableBelt from "../components/table-belt";
import ContainerTailwind from "../../../components/layout-components/ContainerTailwind";
import HeroComponents from "../../../components/layout-components/CustomrPageHeaderAlt";
import {Link} from "react-router-dom";
import {Button} from "antd";
import TableCheckIn from "../components/table-check-in";
import TableArrival from "../components/table-arrival";
function BeltPages(){
    return (
        <React.Fragment>
            <HeroComponents
                loading={false}
                name={"Arrival"}
                positionName={'data list Arrival'}
                thumbnail={null}
                extra={<>
                    <Link to={`/user/update/instructor/`}>
                        <Button
                            size={'small'}
                            type={'primary'}
                            ghost

                        >Update</Button>
                    </Link>
                </>}
            />
            <ContainerTailwind className={'!mk-py-10'} style={{marginTop:60}}>
                <TableArrival
                    title={''}
                    params={{
                        page:1,
                        limit:10
                    }}
                    pagination={true}
                />
            </ContainerTailwind>
        </React.Fragment>
    )
}


export default connect(()=> {
    return {}
},{})(React.memo(BeltPages))
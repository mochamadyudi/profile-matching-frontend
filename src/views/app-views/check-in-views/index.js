import React from 'react'
import { connect } from 'react-redux'
import TableBelt from "../components/table-belt";
import ContainerTailwind from "../../../components/layout-components/ContainerTailwind";
import HeroComponents from "../../../components/layout-components/CustomrPageHeaderAlt";
import {Link} from "react-router-dom";
import {Button} from "antd";
import TableCheckIn from "../components/table-check-in";
function BeltPages(){
    return (
        <React.Fragment>
            <HeroComponents
                loading={false}
                name={"Check In"}
                positionName={'data list Check In'}
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
                <TableCheckIn
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
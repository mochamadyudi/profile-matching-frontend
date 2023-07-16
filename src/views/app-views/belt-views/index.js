import React from 'react'
import { connect } from 'react-redux'
import TableBelt from "../components/table-belt";
import ContainerTailwind from "../../../components/layout-components/ContainerTailwind";
import HeroComponents from "../../../components/layout-components/CustomrPageHeaderAlt";
import {NAV_TYPE_TOP} from "../../../constants/ThemeConstant";
import {Link} from "react-router-dom";
import {Button} from "antd";
function BeltPages(){
    return (
        <React.Fragment>
            <HeroComponents
                loading={false}
                name={"Belt"}
                positionName={'data list belt'}
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
                <TableBelt
                    title={'Belt'}
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
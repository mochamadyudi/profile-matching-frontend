import React, {useState} from 'react'
import PropTypes from 'prop-types'
import Flex from "components/shared-components/Flex";
import {Avatar, Image, Tag, Typography} from "antd";

import {PageHeaderAlt} from "components/layout-components/PageHeaderAlt";
import Utils from "../../utils";
import ContainerTailwind from "./ContainerTailwind";
import Container from "./container";

/**
 *
 * @param {Object} props
 * @param {(String|null)} props.thumbnail
 * @param {(Number|80)} props.size
 * @param {(String|String[])} props.positionName
 * @param {("tailwind"|"antd"|"primary")} props.containerType
 * @returns {JSX.Element}
 */
function HeroComponents(props) {
    let {thumbnail,containerType, name, positionName, loading,size, extra,lookup,description} = props
    const [colored,setColored] = useState(()=>{
        return "cyan" //Utils.randomColorStr();
    })
    function Content(){
        return <Flex className="py-2" mobileFlex={false} justifyContent="between" alignItems="center">
            <Flex className={!lookup?.thumbnail ? "py-4" : "py-2"} mobileFlex={false} justifyContent="start" alignItems="center">
                {
                    lookup?.thumbnail && (
                        <div className={['mk-w-[80px] mk-h-[80px] mk-rounded-full mk-overflow-hidden mk-flex mk-items-center mk-justify-center', thumbnail ? "":"mk-bg-cyan-500"].join(' ')}>
                            <Avatar
                                loading={loading}
                                style={{background:"transparent"}}
                                size={size ?? 50} src={!thumbnail ? null :
                                <Image
                                    preview={props?.isPreview ?? false}
                                    width={size ?? 50}
                                    height={size ?? 50}
                                    style={{
                                        objectFit: "cover"
                                    }}
                                    fallback={Utils.defaultImage}
                                    src={thumbnail}
                                />
                            }>
                                {
                                    !thumbnail ? Utils.getNameInitial(name ?? "-") : null
                                }

                            </Avatar>
                        </div>

                    )
                }
                <div className={lookup?.thumbnail ? 'mx-4': ''}>
                    <Typography.Title level={3} style={{lineHeight: 1,}}
                                      className={'m-0 mb-2'}>{name}</Typography.Title>

                    {
                        typeof(description) !== 'boolean' && description !== '' && description !== null && (
                            <div className={'mb-2'}>
                                <Typography.Text>{description}</Typography.Text>
                            </div>
                        )
                    }
                    {
                        lookup?.positionName && (
                            positionName && typeof(positionName) === 'string' ?
                                <Tag color={props?.positionColor ?? colored}>{positionName ?? '-'}</Tag>
                            : Array.isArray(positionName) && positionName.length > 0 ?
                                <Flex alignItems={'center'}>
                                    {
                                        positionName.map((item,index)=> {
                                            return typeof(item) === 'string' ? (
                                                <>
                                                    <Tag color={props?.positionColor ?? colored}>{item ?? '-'}</Tag>
                                                    {index < (positionName.length - 1) && (
                                                        <div style={{width:"7px",height:'7px',borderRadius:"4px",margin:'0 10px 0 -2px',background:"#939393",opacity:.5}}/>
                                                    )}
                                                </>
                                            ):""
                                        })
                                    }
                                </Flex>
                            :null
                        )
                    }

                </div>
            </Flex>
            { extra && extra}
        </Flex>
    }
    function ShowContainer(type){
        switch (type){
            case "antd":
            case "primary":
                return (
                    <Container>
                        <Content/>
                    </Container>
                )
            case "tailwind":
            default:
                return (
                    <ContainerTailwind>
                        <Content/>
                    </ContainerTailwind>
                )
        }
    }
    return (
        <PageHeaderAlt className="border-bottom" overlap>
            {ShowContainer(containerType)}
        </PageHeaderAlt>
    )
}

HeroComponents.propTypes = {
    // thumbnail: PropTypes.string,
    lookup: PropTypes.shape({
        thumbnail: PropTypes.bool.isRequired,
        positionName: PropTypes.bool.isRequired,
    }),
    containerType: PropTypes.oneOf(['tailwind','primary','antd']),
    description: PropTypes.oneOfType([PropTypes.bool,PropTypes.string]),
    name: PropTypes.string.isRequired,
    // positionName: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
    extra: PropTypes.node.isRequired
}
HeroComponents.defaultProps = {
    // thumbnail: null,
    containerType:"tailwind",
    lookup: {
        thumbnail: true,
        positionName: true
    },
    description: false,
    name: null,
    positionName: null,
    loading: null,
    extra:null
}

export default HeroComponents
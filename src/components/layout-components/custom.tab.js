import React, {useState,} from 'react'
import PropTypes from 'prop-types'
import {Tabs, Typography} from "antd";
import {useLocation} from "react-router-dom";
import {first} from "lodash";

const {TabPane} = Tabs

function CustomTab({tab,paramsKey,mode,defaultTab}){
    const locations = useLocation()

    const [tabsActive, setTabsActive] = useState(() => {
        let value = new URLSearchParams(locations.search).get(paramsKey ?? 'tab')
        if (value) {
            return value.toString()?.toLowerCase()
        }else
        if(defaultTab){
            return defaultTab
        }else{
            return first(tab).key ?? 'detail'
        }
    })

    function setUp(value) {
        if (window) {

            const urlSearch = new URLSearchParams(window.location.search)
            if(urlSearch.get(paramsKey ?? 'tab')){
                urlSearch.delete(paramsKey ?? 'tab')
                urlSearch.append(paramsKey ?? 'tab', value)
            }else{
                urlSearch.append(paramsKey ?? 'tab', value)
            }
            let query = []
            urlSearch.forEach((value, key) => {
                query.push(`${key}=${value}`)
            })

            let newUrl = [window.origin, locations.pathname].join("")
            window.history.pushState({article: 'read-all'}, 'Read All Article', [newUrl, query.join("&")].join("?"));

        }
    }

    function onTabs(value) {
        setTabsActive(value)

        setUp(value)
    }
    return (
        <Tabs mode={mode ?? "top"} defaultActiveKey={`${tabsActive}`} activeKey={`${tabsActive}`} style={{marginTop: 30}}
              onChange={onTabs}
              className={'container'}
        >
            {
                Array.isArray(tab) && tab.length > 0 &&
                tab.map((item,index)=> {
                    return (
                        <TabPane tab={<Typography.Text className={'!mk-text-xs'}>{item?.title}</Typography.Text>} key={`${item?.key}`} c>
                                {typeof(item?.render) === 'function' ? (
                                    item?.render({current:tabsActive,onChange:onTabs})
                                ):null}

                        </TabPane>
                    )
                })
            }
        </Tabs>
    )
}

CustomTab.propTypes = {
    paramsKey:PropTypes.string.isRequired,
    defaultTab: PropTypes.string.isRequired,
    mode: PropTypes.oneOf(['top','left']),
    tab: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired,
        render: PropTypes.func.isRequired
    }).isRequired).isRequired
}
CustomTab.defaultProps = {
    paramsKey: 'tab',
    defaultTab:null,
    mode: 'top'
}

export default CustomTab
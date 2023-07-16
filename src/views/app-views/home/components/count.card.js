import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {Button, Card, Col, Modal, Row} from "antd";
import ContainerTailwind from "components/layout-components/ContainerTailwind";
import ApiService from "../../../../services/api.service";

function CountCard({active, onChange}) {
	
	
	const [data, setData] = useState([])
	const [loading, setLoading] = useState(false)
	const [params, setParams] = useState({
		page: 1,
		limit: 20
	})
	const [isActive, setIsActive] = useState(false)
	
	function WhiteTextActive(actived, {classes = '', classesActive = ''}) {
		if (actived) {
			return ['text-white', classesActive, classes].join(' ')
		}
		return classes
	}
	
	function ThisOnChange(val, active = false) {
		onChange(val)
		setIsActive(active)
	}
	
	
	useEffect(() => {
		setLoading(true)
		new ApiService({
			url: `/api/v1/master-data/airline-type`,
			config: {
				params: {
					...params,
				}
			}
		}).get()
			.then((response) => {
				setLoading(false)
				setData([...response?.data.sort((a, b) => -1)])
			})
			.catch((err) => {
				setLoading(false)
				setData([])
			})
	}, [params])
	return (
		<React.Fragment>
			<Modal
				closable={false}
				visible={isActive}
				onCancel={() => setIsActive(!isActive)}
				onOk={() => setIsActive(false)}
				style={{minWidth: 620}}
				footer={null}
			>
				<Row gutter={10}>
          {
            data.slice(4).map((item)=> (
              <Col
                xs={{
                  span: 24
                }}
                sm={{span: 24}}
                md={{span: 8}}
                lg={{span: 8}}>
                <div
                  onClick={() => ThisOnChange(item?.identifier, false)}
                  
                  className={WhiteTextActive(
                    active === item?.identifier,
                    {
                      classes: 'mk-cursor-pointer mk-w-full mk-min-h-[140px] !mk-rounded-xl mk-bg-white !mk-shadow-xl d-flex align-items-center justify-content-center',
                      classesActive: '!mk-bg-blue-500 !mk-bg-opacity-50 !mk-border !mk-border-blue-500'
                    })}
                >
                  <h4
                    className={
                      WhiteTextActive(
                        active === item?.identifier,
                        {
                          classesActive: "!mk-text-white"
                        })
                    }
                  >{item?.data?.name ?? "-"}</h4>
                </div>
              </Col>
            ))
          }
				</Row>
			</Modal>
			<ContainerTailwind>
				<Row gutter={10}>
					<Col
						xs={{span: 24}}
						sm={{span: 24}}
						md={{span: 20}}
						lg={{span: 20}}
					>
						<Row gutter={10}>
							{
								data.slice(0, 4).map((item, index) => (
									<Col
										xs={{
											span: 24
										}}
										sm={{span: 24}}
										md={{span: 6}}
										lg={{span: 6}}>
										<Card
											bordered={false}
											onClick={() => onChange(item?.identifier)}
											title={
												<h4
													className={
														WhiteTextActive(
															active === item?.identifier,
															{
																classes: '',
																classesActive: ''
															})
													}>{item?.data?.name ?? "-"} </h4>}
											className={WhiteTextActive(active === item?.identifier, {
												classesActive: 'bg-primary',
												classes: "mk-cursor-pointer"
											})}
										>
											<h3 className={WhiteTextActive(active === item?.identifier, {
												classes: ''
											})}>1</h3>
										</Card>
									</Col>
								))
							}
							
							{/*<Col*/}
							{/*    xs={{*/}
							{/*        span: 24*/}
							{/*    }}*/}
							{/*    sm={{span: 24}}*/}
							{/*    md={{span:6}}*/}
							{/*    lg={{span:6}}>*/}
							{/*    <Card*/}
							{/*        bordered={false}*/}
							{/*        onClick={()=> onChange('departure')}*/}
							{/*        title={*/}
							{/*            <h4*/}
							{/*                className={*/}
							{/*                    WhiteTextActive(*/}
							{/*                        active === 'departure',*/}
							{/*                        {*/}
							{/*                            classes: '',*/}
							{/*                            classesActive: ''*/}
							{/*                        })*/}
							{/*                }>Departures</h4>}*/}
							{/*        className={WhiteTextActive(active === 'departure', {*/}
							{/*            classesActive:'bg-primary',*/}
							{/*            classes:"mk-cursor-pointer"*/}
							{/*        })}*/}
							{/*    >*/}
							{/*        <h3 className={WhiteTextActive(active === 'departure', {*/}
							{/*            classes: ''*/}
							{/*        })}>1</h3>*/}
							{/*    </Card>*/}
							{/*</Col>*/}
							{/*<Col*/}
							{/*    xs={{*/}
							{/*        span: 24*/}
							{/*    }}*/}
							{/*    sm={{span: 24}}*/}
							{/*    md={{span:6}}*/}
							{/*    lg={{span:6}}>*/}
							{/*    <Card*/}
							{/*        bordered={false}*/}
							{/*        onClick={()=> onChange('checkin')}*/}
							{/*        title={*/}
							{/*            <h4*/}
							{/*                className={*/}
							{/*                    WhiteTextActive(*/}
							{/*                        active === 'checkin',*/}
							{/*                        {*/}
							{/*                            classes: '',*/}
							{/*                            classesActive: ''*/}
							{/*                        })*/}
							{/*                }>Check-In</h4>}*/}
							{/*        className={WhiteTextActive(active === 'checkin', {*/}
							{/*            classesActive:'bg-primary',*/}
							{/*            classes:"mk-cursor-pointer"*/}
							{/*        })}*/}
							{/*    >*/}
							{/*        <h3 className={WhiteTextActive(active === 'checkin', {*/}
							{/*            classes: ''*/}
							{/*        })}>1</h3>*/}
							{/*    </Card>*/}
							{/*</Col>*/}
							{/*<Col*/}
							{/*    xs={{*/}
							{/*        span: 24*/}
							{/*    }}*/}
							{/*    sm={{span: 24}}*/}
							{/*    md={{span:6}}*/}
							{/*    lg={{span:6}}>*/}
							{/*    <Card*/}
							{/*        bordered={false}*/}
							{/*        onClick={()=> onChange('belt')}*/}
							{/*        title={*/}
							{/*            <h4*/}
							{/*                className={*/}
							{/*                    WhiteTextActive(*/}
							{/*                        active === 'belt',*/}
							{/*                        {*/}
							{/*                            classes: '',*/}
							{/*                            classesActive: ''*/}
							{/*                        })*/}
							{/*                }>Belt</h4>}*/}
							{/*        className={WhiteTextActive(active === 'belt', {*/}
							{/*            classesActive:'bg-primary',*/}
							{/*            classes:'mk-cursor-pointer'*/}
							{/*        })}*/}
							{/*    >*/}
							{/*        <h3 className={WhiteTextActive(active === 'belt', {*/}
							{/*            classes: ''*/}
							{/*        })}>1</h3>*/}
							{/*    </Card>*/}
							{/*</Col>*/}
						</Row>
					</Col>
					{
						data.length > 4 && (
							<Col
								xs={{
									span: 24
								}}
								sm={{span: 24}}
								md={{span: 4}}
								lg={{span: 4}}>
								
								<div
									onClick={() => setIsActive(true)}
									className={`!mk-bg-blue-500 !mk-bg-opacity-50 mk-cursor-pointer mk-w-full mk-min-h-[130px] !mk-rounded-xl mk-bg-white !mk-shadow-xl d-flex align-items-center justify-content-center`}>
									<h4
										className={`!mk-text-white`}
									>More</h4>
								</div>
							</Col>
						)
					}
				
				</Row>
			</ContainerTailwind>
		</React.Fragment>
	)
}

CountCard.propTypes = {
	active: PropTypes.string.isRequired
}
CountCard.defaultProps = {
	active: 'arrival'
}

export default CountCard
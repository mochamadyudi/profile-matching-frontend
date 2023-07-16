import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import SettingLayout from "../../setting.layout";
import {Button, Divider, Form, Input, Select} from "antd";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import {findKey} from "../../../../../../utils";
import Flex from "../../../../../../components/shared-components/Flex";
import {DeleteOutlined, EllipsisOutlined, PlusOutlined} from "@ant-design/icons";
import ApiService from "../../../../../../services/api.service";

function mapStateToProps(state) {
	return {};
}

function Index({...props}) {
	const [form] = Form.useForm()
	const [loading, setLoading] = useState(false)
	const [pagination, setPagination] = useState({
		page: 1,
		limit: 20
	});
	const [params, setParams] = useState({
		page: 1,
		limit: 20
	});
	
	const [data, setData] = useState([{
		order: 0,
		text: "Covid in China: US imposes Covid testing for visitors from China"
	},
		{
			order: 1,
			text: "Follow the next update in Great News one hour ahead. I am Sandra Liem, good evening and see you."
		},])
	
	useEffect(() => {
		setLoading(true)
		new ApiService({
			url: `/api/v1/announcement/marquee`,
			config: {
				params: {
					...params
				}
			}
		}).get()
			.then((response) => {
				setPagination({
					...pagination,
					...response?.pagination
				})
				setData([...response?.data])
				setLoading(false)
			})
			.catch((err) => {
				setData([])
				setLoading(false)
			})
	}, [params])
	
	
	function onDragEnd(result, va, a) {
		
		if (!result.destination) return;
		let fieldsValue = form.getFieldsValue()
		
		let items = Array.from(findKey(fieldsValue, ['marquee']));
		let [reorderedItem] = items.splice(result.source.index, 1);
		reorderedItem.order = result.destination.index
		
		
		items.splice(result.destination.index, 0, reorderedItem);
		
		for (let i = 0; i < items.length; i++) {
			items[i].order = typeof (items[i]?.order) === 'undefined' ? 0 : i
			items[i] = {
				...items[i],
			}
		}
		form.setFieldsValue({
			marquee: items ?? []
		})
	}
	
	return (
		<SettingLayout name={"Announcement"} positionName={'Settings'}>
			<div>
				<h1>Announcement Marquee</h1>
				<p>Lorem ipsum dolor sit amet </p>
			</div>
			<Divider/>
			<Form form={form} layout={'vertical'} initialValues={{marquee: data ?? [] }}>
				<DragDropContext onDragEnd={onDragEnd}>
					<Droppable
						droppableId="marquee"
					>
						{(provided) => {
							return (
								<div
									{...provided.droppableProps}
									className={'droppable'}
									ref={provided.innerRef}
								>
									<Form.List
										initialValue={data ?? []}
										name={'marquee'}>
										{(fields, {add, remove}, test) => {
											return (
												<div className="mb-3">
													{fields.map((field, index) => (
														<Draggable fields={fields} key={['audio', field.name].join('-')}
														           draggableId={['language', field.name].join('-')} index={index}>
															{(provided) => (
																<div className={'bg-white p-2 rounded'}
																     ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
																	<Flex alignItems={'center'} justifyContent={'between'} mobileFlex
																	      className={'mk-gap-4'}>
																		<div style={{
																			display: "flex",
																			alignItems: "center",
																			lineHeight: 0,
																			width: 30,
																			height: 30,
																			position: "relative"
																		}}>
																			<EllipsisOutlined style={{
																				position: "absolute",
																				left: -7.5,
																				fontSize: 25,
																				transform: "rotate(90deg)"
																			}}/>
																			<EllipsisOutlined
																				style={{position: "absolute", fontSize: 25, transform: "rotate(90deg)"}}/>
																		</div>
																		<Form.Item
																			{...field}
																			name={[field.name, 'order']}
																			fieldKey={[field.fieldKey, 'order']}
																			rules={[{required: true, message: "Can't be empty!"}]}
																			hidden
																			initialValue={index}
																		>
																			<Input value={index}/>
																		</Form.Item>
																		<Form.Item
																			{...field}
																			name={[field.name, 'text']}
																			fieldKey={[field.fieldKey, 'text']}
																			rules={[{required: true, message: "Can't be empty!"}]}
																			className="w-100 m-0"
																		>
																			<Input placeholder={'Input your text'}/>
																		</Form.Item>
																		<Flex alignItems={'center'} justifyContent={'between'} mobileFlex
																		      className={'mk-gap-2'}>
																			{
																				(fields.length - 1) === index && (
																					<Button type={'primary'} shape={'circle'} size={'small'}
																					        onClick={() => {
																						        add()
																					        }}
																					        icon={<PlusOutlined/>}/>
																				)
																			}
																			<Button type={'primary'} danger shape={'circle'} size={'small'}
																			        onClick={() => {
																				        remove(field.name)
																			        }}
																			        icon={<DeleteOutlined/>}/>
																		</Flex>
																	
																	</Flex>
																
																</div>
															)}
														</Draggable>
													))}
												</div>
											)
										}}
									</Form.List>
								</div>
							)
						}}
					</Droppable>
				</DragDropContext>
				
				<Divider/>
				
				<div>
					<Button type={'primary'} ghost>Save</Button>
				</div>
			
			</Form>
		
		</SettingLayout>
	);
}

export default connect(
	mapStateToProps,
)(Index);
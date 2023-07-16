import {FAILURE, REQUEST, SUCCESS} from "../actions/action.type";
import {LIST_CRITERIA, LIST_USER_CRITERIA, SHOW_TRAVEL} from "../constants/global";

const initialState = {
	travel: {
		show: {
			loading: false,
			params: {},
			data: null,
		},
		list: {
			loading: true,
			params: {},
			pagination: {},
			data: []
		}
	},
	criteria: {
		show: {
			loading: false,
			params: {},
			data: null,
		},
		list: {
			loading: true,
			params: {},
			pagination: {},
			data: []
		}
	},
	user_criteria: {
		show: {
			loading: false,
			params: {},
			data: null,
		},
		list: {
			loading: true,
			params: {},
			pagination: {},
			data: []
		}
	}
	
}

export default function (state = initialState, action) {
	let {type, payload} = action
	switch (type) {
		case REQUEST(SHOW_TRAVEL):
			return {
				...state,
				travel: {
					...state.travel,
					show: {
						...state.travel.show,
						loading: true,
						data: null
					}
				}
			}
		case SUCCESS(SHOW_TRAVEL):
			return {
				...state,
				travel: {
					...state.travel,
					show: {
						...state.travel.show,
						loading: false,
						params: payload?.params,
						data: payload?.data
					}
				}
			}
		case FAILURE(SHOW_TRAVEL):
			return {
				...state,
				travel: {
					...state.travel,
					show: {
						...state.travel.show,
						loading: false,
						params: payload?.params ?? null,
						data: null
					}
				}
			}
		case REQUEST(LIST_CRITERIA):
			return {
				...state,
				criteria: {
					...state.criteria,
					list: {
						...state.criteria.list,
						loading: true,
						data: []
					}
				}
			}
		case SUCCESS(LIST_CRITERIA):
			return {
				...state,
				criteria: {
					...state.criteria,
					list: {
						...state.criteria.list,
						loading: false,
						pagination: {
							...state.criteria.list.pagination,
							...payload?.pagination
						},
						params: {
							...state.criteria.list.params,
							...payload?.params
						},
						data: payload?.data ?? []
					}
				}
			}
		case FAILURE(LIST_CRITERIA):
			return {
				...state,
				criteria: {
					...state.criteria,
					list: {
						...state.criteria.list,
						loading: false,
						pagination: {
							...state.criteria.list.pagination,
							...payload?.pagination
						},
						params: {
							...state.criteria.list.params,
							...payload?.params
						},
						data: []
					}
				}
			}
		case REQUEST(LIST_USER_CRITERIA):
			return {
				...state,
				user_criteria: {
					...state.user_criteria,
					list: {
						...state.user_criteria.list,
						loading: true,
						params: {
							...payload?.params,
						},
						data: []
					}
				}
			}
		case SUCCESS(LIST_USER_CRITERIA):
			return {
				...state,
				user_criteria: {
					...state.user_criteria,
					list: {
						...state.user_criteria.list,
						loading: false,
						pagination: {
							...state.user_criteria.list.pagination,
							...payload?.pagination
						},
						params: {
							...state.user_criteria.list.params,
							...payload?.params
						},
						data: payload?.data ?? []
					}
				}
			}
		case FAILURE(LIST_USER_CRITERIA):
			return {
				...state,
				user_criteria: {
					...state.user_criteria,
					list: {
						...state.user_criteria.list,
						loading: false,
						pagination: {
							...state.user_criteria.list.pagination,
							...payload?.pagination
						},
						params: {
							...state.user_criteria.list.params,
							...payload?.params
						},
						data: []
					}
				}
			}
		default:
			return state
	}
}
import React, {useState} from 'react'
import { connect } from 'react-redux'
import CountCard from "./components/count.card";
import TableArrival from "../components/table-arrival";
import ContainerTailwind from "components/layout-components/ContainerTailwind";
import TableDepartures from "../components/table-departures";
import TableCheckIn from "../components/table-check-in";
import TableBelt from "../components/table-belt";
import TableOnBoarding from "../components/table-on-boarding";
import {useLocation} from "react-router-dom";
import TableGate from "../components/table-gate";
import TableLuggage from "../components/table-luggage";

function SwitchingActive({active}){
	switch (active){
		case "arrival":
			return <TableArrival title={'Arrival'}/>
		case "departures":
			return <TableDepartures title={'Departures'}/>
		case "check-in":
			return <TableCheckIn title={'Check In'}/>
		case "belt":
			return <TableBelt title={'Belt'}/>
		case "on-boarding":
			return <TableOnBoarding title={'On Boarding'}/>
		case "gate":
			return <TableGate title={'Gate'}/>
		case "luggage":
			return <TableLuggage title={'Luggage'}/>
		default:
			return null
	}
}
const Home = (props ) => {
	const locations = useLocation()
	const [active, setActive] = useState(()=> {
		let value = new URLSearchParams(locations.search).get('tab')
		if (value) {
			return value.toString()?.toLowerCase()
		}
		return 'arrival'
	})

	function setUp(value) {
		if (window) {

			const urlSearch = new URLSearchParams(window.location.search)
			if(urlSearch.get('tab')){
				urlSearch.delete('tab')
				urlSearch.append('tab', value)
			}else{
				urlSearch.append('tab', value)
			}
			let query = []
			urlSearch.forEach((value, key) => {
				query.push(`${key}=${value}`)
			})

			let newUrl = [window.origin, locations.pathname].join("")
			window.history.pushState({article: 'read-all'}, 'Read All Article', [newUrl, query.join("&")].join("?"));

		}
	}
	const onSetActive = (actived)=> {
		if(actived !== active){
			setActive(actived)
			setUp(actived)
		}
	}
	return (
		<>
			<CountCard active={active} onChange={onSetActive}/>
			<ContainerTailwind>
				<SwitchingActive active={active}/>
			</ContainerTailwind>
		</>
	)
}

export default connect(({ theme }) => {
	const { sideNavTheme, topNavColor } = theme;
	return { sideNavTheme, topNavColor,theme };
},{})(Home)

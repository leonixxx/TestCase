import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React, { useEffect, useState } from 'react';
import WebSocketStr from '../../Utils/WebSoketStr';
import getTime from '../../Utils/getTime';
import styles from './Event.module.css';

export default function Event() {
	const [events, setEvents] = useState([]);
	console.log(events[0]);

	useEffect(() => {
		const socket = new WebSocket('wss://test.dev-relabs.ru/event');

		socket.onmessage = event => {
			setEvents(prevEvents => [...prevEvents, event.data]);
		};
		return () => {
			socket.close();
		};
	}, []);

	return (
		<div className={styles.wrap}>
			<h2>События</h2>
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }} aria-label='simple table'>
					<TableHead>
						<TableRow>
							<TableCell>Дата</TableCell>
							<TableCell align='left'>События</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{WebSocketStr(events).map(row => (
							<TableRow
								key={row.date}
								sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
							>
								<TableCell component='th' scope='row'>
									{getTime(row.date)}
								</TableCell>
								<TableCell align='left'>{row.action}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	);
}

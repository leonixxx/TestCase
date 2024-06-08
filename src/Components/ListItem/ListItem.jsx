import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React, { useEffect, useState } from 'react';
import getTime from '../../Utils/getTime';
import { useGetBaseByNameQuery } from '../../services/card';
import styles from './ListItem.module.css';

export default function ListItem() {
	const [offSet, setoffSet] = useState(0);
	const { data, error, isLoading } = useGetBaseByNameQuery(offSet);
	const [dataF, setDataF] = useState(data);

	useEffect(() => {}, [offSet]);
	useEffect(() => {
		setDataF(data);
	}, [data]);

	const handleDelete = id => {
		setDataF({ ...dataF, items: dataF.items.filter(item => item.id !== id) });
	};
	const handlePagination = page => setoffSet(page * 5 - 5);

	return (
		<div className={styles.wrap}>
			<h2>Список пользователей</h2>
			<div className={styles.list}>
				{error ? (
					<>Oh no, there was an error</>
				) : isLoading ? (
					<>Loading...</>
				) : dataF ? (
					<>
						<TableContainer component={Paper}>
							<Table sx={{ minWidth: 650 }} aria-label='simple table'>
								<TableHead>
									<TableRow>
										<TableCell>ID</TableCell>
										<TableCell align='right'>Имя</TableCell>
										<TableCell align='right'>Роль</TableCell>
										<TableCell align='right'>Дата создания</TableCell>
										<TableCell align='right'>Действия</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{dataF.items.map(row => (
										<TableRow
											key={row.id}
											sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
										>
											<TableCell component='th' scope='row'>
												{row.id}
											</TableCell>
											<TableCell align='right'>{row.name}</TableCell>
											<TableCell align='right'>{row.role}</TableCell>
											<TableCell align='right'>{getTime(row.ctime)}</TableCell>
											<TableCell align='right'>
												<Button
													onClick={() => handleDelete(row.id)}
													size='small'
													color='error'
													variant='contained'
												>
													Удалить
												</Button>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
					</>
				) : null}
			</div>
			<Stack
				spacing={2}
				sx={{
					marginTop: 5,
				}}
			>
				<Pagination
					onChange={(e, page) => handlePagination(page)}
					count={3}
					color='primary'
				/>
			</Stack>
		</div>
	);
}

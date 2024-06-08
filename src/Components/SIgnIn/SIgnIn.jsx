import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../../context/LoginContext';
import { validationEmail, validationPassword } from '../../Utils/validation';
import './SIgnIn.css';

const defaultTheme = createTheme();
let email = true;
let pass = true;

export default function SignIn() {
	const navigate = useNavigate();
	const value = useContext(LoginContext);
	const [emailValid, setEmailValid] = useState(email);
	const [passValid, setPassValid] = useState(pass);
	const [loading, setLoading] = useState(false);
	const [loader, setLoader] = useState('');
	const [disabl, setDisabl] = useState(false);

	const handleSubmit = event => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		let dataEmail = data.get('email');
		let dataPass = data.get('password');
		if (!validationEmail(dataEmail)) {
			setEmailValid(false);
		} else {
			setEmailValid(true);
		}
		if (!validationPassword(dataPass)) {
			setPassValid(false);
		} else {
			setPassValid(true);
		}
		if (validationPassword(dataPass) && validationEmail(dataEmail)) {
			setEmailValid(true);
			setPassValid(true);
			setLoading(true);
			setLoader();
			setDisabl(true);
			setTimeout(() => {
				value.setValue();
				navigate('/');
			}, 2000);
		}
	};

	return (
		<ThemeProvider theme={defaultTheme}>
			{loading ? (
				<div className='loader'>
					<div className='loader-inner'>
						<span className='loader-icon'>Loading...</span>
					</div>
				</div>
			) : (
				<></>
			)}
			<Container component='main' maxWidth='xs' className={loader}>
				<CssBaseline />
				<Box
					sx={{
						marginTop: 8,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component='h1' variant='h5'>
						Авторизация
					</Typography>
					<Box
						component='form'
						onSubmit={handleSubmit}
						noValidate
						sx={{ mt: 1 }}
					>
						<TextField
							margin='normal'
							required
							fullWidth
							id='email'
							label='Email Address'
							name='email'
							autoComplete='email'
							autoFocus
							disabled={disabl}
						/>
						{emailValid ? (
							<></>
						) : (
							<span style={{ color: 'red' }}>Email введён некорректно</span>
						)}
						<TextField
							margin='normal'
							required
							fullWidth
							name='password'
							label='Password'
							type='password'
							id='password'
							autoComplete='current-password'
							disabled={disabl}
						/>
						{passValid ? (
							<></>
						) : (
							<span style={{ color: 'red' }}>Пароль введён некорректно</span>
						)}
						<Button
							type='submit'
							fullWidth
							variant='contained'
							sx={{ mt: 3, mb: 2 }}
						>
							Авторизация
						</Button>
					</Box>
				</Box>
			</Container>
		</ThemeProvider>
	);
}

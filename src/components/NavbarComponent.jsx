// import { Box, , , Divider, Drawer, , Menu, MenuItem, , Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Toolbar from '@mui/material/Toolbar'
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
// import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import SwitchThemeComponent from './SwitchThemeComponent';
import { useGetMeQuery } from '../services/authService';


const navItems = [
	{ text: 'Home', href: '/' },
];


const Navbar = (props) => {
	const { data, } = useGetMeQuery()
	const navigate = useNavigate();

	//isn't best practice
	const token = localStorage.getItem('access_token')

	const logout = () => {
		localStorage.clear()
		setTimeout(() => {
			navigate('/auth/signin')
		})
	}

	return (
		<>
			<AppBar component="nav" elevation={0}>
				<Container fixed>
					<Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }} >
						<Typography color={'default'} variant="h5">blogiseng</Typography>
						<Divider />
						<Box sx={{ display: 'flex', gap: '2em', alignItems: 'center' }}>
							{navItems.map((item) => (
								<Link to={item.href} style={{ textDecoration: 'none', }} key={item.href} >
									<Button sx={{ textTransform: 'capitalize', color: 'text.primary' }}>
										<Typography color={'inherit'}>{item.text}
										</Typography>
									</Button>
								</Link>
							))}
							{
								token && (
									data && (
										<>
											<Link to={'/profile'} style={{ textDecoration: 'none' }}>
												<Typography sx={{ textTransform: 'capitalize', color: 'text.primary' }} color={'inherit'} disableElevation>{data.username}</Typography>
											</Link>
											<Button onClick={() => logout()} sx={{ textTransform: 'capitalize', color: 'text.primary' }} color={'inherit'} disableElevation>signout</Button>
										</>
									)
								)
							}
							<SwitchThemeComponent />
						</Box>
					</Toolbar>
				</Container>
			</AppBar>
		</>
	)
}

export default Navbar;
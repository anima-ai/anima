import { Container, Center, Stack, Title } from '@mantine/core';

import { Auth, ThemeSupa } from '@supabase/auth-ui-react';
import { supabase } from '@anima/supabase';
import { ROUTES } from '@anima/core';

const SigninPage = () => {
	return (
		<div style={{ height: '100vh', width: '100vw', overflow: 'hidden' }}>
			<Container
				size="sm"
				sx={theme => ({
					marginTop: '5%',
					display: 'flex',
					flexDirection: 'column',
					boxShadow: theme.shadows.lg,
					outline: '1px solid #aaaa',
					borderRadius: theme.radius.sm,
					paddingInline: 48,
					paddingBlock: 56,
				})}
			>
				<Center>
					<Stack
						align="center"
						spacing={0}
						mb="xl"
						sx={{ width: 240, height: 100 }}
					>
						<Title>Anima</Title>
					</Stack>
				</Center>

				<Auth
					redirectTo={ROUTES.origin}
					appearance={{ theme: ThemeSupa }}
					supabaseClient={supabase}
					providers={['google']}
					socialLayout="horizontal"
				/>
			</Container>
		</div>
	);
};

export default SigninPage;

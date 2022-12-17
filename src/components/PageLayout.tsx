import {
  AppShell,
  Aside,
  Burger,
  Button,
  Footer,
  Group,
  Header,
  MediaQuery,
  Navbar,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Login from './Login';

const PageLayout = () => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const navigate = useNavigate();

  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      header={
        <Header height={70} p="md">
          <div
            style={{ display: 'flex', alignItems: 'center', height: '100%' }}
          >
            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>

            <Group sx={{ width: '100%' }} position="apart">
              <Text>PRONO</Text>
              <Group>
                <Button onClick={() => navigate('/')} variant="subtle">
                  MY BETS
                </Button>
                <Button onClick={() => navigate('/result')} variant="subtle">
                  RESULTS
                </Button>
                <Button onClick={() => navigate('/standings')} variant="subtle">
                  STANDINGS
                </Button>
              </Group>
              <Login />
            </Group>
          </div>
        </Header>
      }
    >
      <Outlet />
    </AppShell>
  );
};

export default PageLayout;

/*
  footer={
    <Footer height={60} p="md">
      <Text ta="center">Made with love</Text>
    </Footer>
  }
*/

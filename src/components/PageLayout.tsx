import {
  AppShell,
  Burger,
  Button,
  Group,
  Header,
  MediaQuery,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { ScrollArea } from '@mantine/core';
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
              <Text
                variant="gradient"
                gradient={{ from: '#4DABF7', to: '#3BC9DB', deg: 45 }}
                sx={{
                  fontSize: 25,
                  fontWeight: 'bold',
                }}
              >
                StarkProno
              </Text>
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
      <ScrollArea style={{ height: '90vh' }} type="auto" offsetScrollbars>
        <Outlet />
      </ScrollArea>
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

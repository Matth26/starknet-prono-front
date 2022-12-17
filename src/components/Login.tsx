import { Group } from '@mantine/core';
import { useAccount, useConnectors } from '@starknet-react/core';
import Connectors from './Connectors';
import { ActionIcon } from '@mantine/core';
import { IconLogout } from '@tabler/icons';

const Login = () => {
  const { account, address, status } = useAccount();
  const { disconnect } = useConnectors();

  if (status === 'disconnected') return <Connectors />;
  if (address)
    return (
      <Group>
        <p>{address.substring(0, 5) + '...' + address.slice(-4)}</p>
        <ActionIcon variant="subtle" onClick={disconnect}>
          <IconLogout size={18} />
        </ActionIcon>
      </Group>
    );
  return null;
};

export default Login;

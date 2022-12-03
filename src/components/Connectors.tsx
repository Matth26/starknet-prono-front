import { useConnectors } from '@starknet-react/core';
import { useEffect } from 'react';
import { Button, Group } from '@mantine/core';

const Connectors = () => {
  const { connect, available, refresh } = useConnectors();

  useEffect(() => {
    const interval = setInterval(refresh, 5000);
    return () => clearInterval(interval);
  }, [refresh]);

  return (
    <Group>
      {available.map((connector) =>
        connector.available() ? (
          <Button key={connector.id()} onClick={() => connect(connector)}>
            {connector.name()}
          </Button>
        ) : null
      )}
    </Group>
  );
};

export default Connectors;

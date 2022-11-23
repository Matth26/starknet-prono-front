import { Table } from '@mantine/core';
import { useStarknetTransactionManager } from '@starknet-react/core';

const TxTable = () => {
  const {
    transactions,
    addTransaction,
    removeTransaction,
    refreshTransaction,
  } = useStarknetTransactionManager();

  console.log(transactions);
  const rows = transactions.map((e) => (
    <tr key={e.transactionHash}>
      <td>{e.transactionHash}</td>
      <td>{e.status}</td>
    </tr>
  ));

  if (transactions.length === 0) return null;

  return (
    <Table highlightOnHover mt={5}>
      <thead>
        <tr>
          <th>Tx Hash</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
};

export default TxTable;

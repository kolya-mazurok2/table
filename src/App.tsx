import { useEffect, useState } from 'react';
import Table from './components/table/Table';
import { getAll } from './services/http/fake-authors';
import { Author } from './types/author';
import { authorColumns } from './utils/table/constants';

const App = () => {
  const [authors, setAuthors] = useState<Author[]>([]);

  useEffect(() => {
    (async () => {
      const response = await getAll();

      setAuthors(response.data);
    })();
  }, []);

  return <Table<Author> columns={authorColumns} data={authors} hasGlobalSearch={true} />;
};

export default App;

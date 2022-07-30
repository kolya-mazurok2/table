import { Container } from '@mui/system';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authorColumns } from '../../components/table/constants';
import Table from '../../components/table/Table';
import { AppDispatch } from '../../redux';
import { getAuthors } from '../../redux/authors/actions';
import { setSelectedEntities } from '../../redux/authors/reducer';
import { getAuthorsSelector, getSelectedAuthorsIdsSelector } from '../../redux/authors/selectors';
import { Author } from '../../types/author';
import StyledHome from './StyledHome';

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();

  const authors = useSelector(getAuthorsSelector);
  const selectedAuthorsIds = useSelector(getSelectedAuthorsIdsSelector);

  const handleRowsSelected = (ids: (string | number)[]) => {
    dispatch(setSelectedEntities(ids));
  };

  useEffect(() => {
    dispatch(getAuthors());
  }, []);

  return (
    <StyledHome>
      <Container>
        <Table<Author>
          columns={authorColumns}
          data={authors}
          hasGlobalSearch={true}
          hasSortBy={true}
          hasRowSelection={true}
          onRowsSelected={handleRowsSelected}
          selectedIds={selectedAuthorsIds}
        />
      </Container>
    </StyledHome>
  );
};

export default Home;

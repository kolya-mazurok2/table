import { Container } from '@mui/material';
import { useSelector } from 'react-redux';
import { authorColumns } from '../../components/table/constants';
import Table from '../../components/table/Table';
import { getSelectedAuthorsSelector } from '../../redux/authors/selectors';
import { Author } from '../../types/author';
import StyledSelectedAuthors from './StyledSelectedAuthors';

const SelectedAuthors = () => {
  const authors = useSelector(getSelectedAuthorsSelector);

  return (
    <StyledSelectedAuthors>
      <Container>
        <Table<Author> columns={authorColumns} data={authors} />
      </Container>
    </StyledSelectedAuthors>
  );
};

export default SelectedAuthors;

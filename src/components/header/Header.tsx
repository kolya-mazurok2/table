import { AppBar, List, ListItem, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { pathes } from '../../routing/constants';
import StyledHeader from './StyledHeader';

const Header = () => {
  return (
    <StyledHeader>
      <AppBar position="relative" className="nav-header">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            <Link to={pathes.home}>Table</Link>
          </Typography>
        </Toolbar>

        <List className="pages-menu">
          <ListItem className="pages-menu--item">
            <Link to={pathes.home}>Home</Link>
          </ListItem>

          <ListItem className="pages-menu--item">
            <Link to={pathes.selectedAuthors}>Selected Authors</Link>
          </ListItem>
        </List>
      </AppBar>
    </StyledHeader>
  );
};

export default Header;

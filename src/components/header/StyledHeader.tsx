import styled from 'styled-components';

const StyledHeader = styled.div`
  header.nav-header {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    align-items: center;
  }

  .nav-header .MuiToolbar-root a,
  .nav-header .MuiList-root a {
    font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
    color: #fff;
    text-decoration: none;
  }

  .pages-menu {
    display: inline-flex;
    flex-wrap: wrap;
  }

  .pages-menu .pages-menu--item {
    display: inline-flex;
    width: auto;
  }
`;

export default StyledHeader;

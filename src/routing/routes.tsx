import SelectedAuthors from '../pages/Authors/SelectedAuthors';
import Home from '../pages/Home/Home';
import { pathes } from './constants';

interface IAppRoutes {
  path: string;
  element: React.ReactNode;
}

export const appRoutes: Array<IAppRoutes> = [
  {
    path: pathes.home,
    element: <Home />,
  },
  {
    path: pathes.selectedAuthors,
    element: <SelectedAuthors />,
  },
];

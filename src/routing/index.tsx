import { Route } from 'react-router-dom';
import { appRoutes } from './routes';

const appRouteElements = appRoutes.map(({ path, element }, index) => {
  return <Route key={index} path={path} element={element} />;
});

export { appRouteElements };

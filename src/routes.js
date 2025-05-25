import {
  createHashRouter,
  createPanel,
  createRoot,
  createView,
  RoutesConfig
} from '@vkontakte/vk-mini-apps-router';

export const DEFAULT_ROOT = 'default_root';
export const DEFAULT_VIEW = 'default_view';

export const DEFAULT_VIEW_PANELS = {
  HOME: 'home',
  PERSIK: 'persik',
  SMESHARIKI: 'smeshariki',
};

export const routes = RoutesConfig.create([
  createRoot(DEFAULT_ROOT, [
    createView(DEFAULT_VIEW, [
      createPanel(DEFAULT_VIEW_PANELS.HOME, '/', []),
      createPanel(DEFAULT_VIEW_PANELS.PERSIK, '/persik', []),
      createPanel(DEFAULT_VIEW_PANELS.SMESHARIKI, '/smeshariki', []),
    ]),
  ]),
]);

export const router = createHashRouter(routes.getRoutes());
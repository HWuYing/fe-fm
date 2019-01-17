import enumGlobalRouter from 'fe-library/lib/enumGlobal/router';
import { javaGlobalAPI } from '../../core/remoteInterface';
import * as api from './api.config';

export default enumGlobalRouter(javaGlobalAPI, api);

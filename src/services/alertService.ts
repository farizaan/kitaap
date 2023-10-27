import { Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

export const alertService = {
  onAlert,
  success,
  error,
  info,
  warn,
  alertBasic,
  clear,
};

export interface AlertType {
  Success: string;
  Error: string;
  Info: string;
  Warning: string;
}

export const AlertType = {
  Success: 'success',
  Error: 'error',
  Info: 'info',
  Warning: 'warning',
};

export interface alertInstanceProps {
  autoClose: boolean;
  keepAfterRouteChange: boolean;
  id?: string;
  type?: string;
  message?: string;
}

const initialOption = {
  autoClose: false,
  keepAfterRouteChange: true,
};

const alertSubject = new Subject();
const defaultId = 'default-alert';

function onAlert(id = defaultId) {
  // @ts-ignore
  return alertSubject.asObservable().pipe(filter((x) => x && x.id === id));
}

function success(message: string, options = initialOption) {
  alertBasic({ ...options, type: AlertType.Success, message });
}

function error(message: string, options = initialOption) {
  alertBasic({ ...options, type: AlertType.Error, message });
}

function info(message: string, options = initialOption) {
  alertBasic({ ...options, type: AlertType.Info, message });
}

function warn(message: string, options = initialOption) {
  alertBasic({ ...options, type: AlertType.Warning, message });
}

function alertBasic(alertInstance: alertInstanceProps) {
  alertInstance.id = alertInstance.id || defaultId;
  alertInstance.autoClose = alertInstance.autoClose === undefined ? true : alertInstance.autoClose;
  alertSubject.next(alertInstance);
}

function clear(id = defaultId) {
  alertSubject.next({ id });
}

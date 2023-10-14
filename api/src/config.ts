import { type LogLevelString } from 'bunyan';

export interface IApiConfig {
  port: string | null;
}

export interface ILevels {
  trace: string | null;
  debug: string | null;
  info: string | null;
  warn: string | null;
  error: string | null;
  fatal: string | null;
}

export interface ILoggerConfig {
  name: string | null;
  level: LogLevelString;
  levels: ILevels;
}

export interface IKeyVaultConfig {
  name: string | null;
  clientSecret: string | null;
  clientId: string | null;
  tenantId: string | null;
}

export interface IApplicationInsights {
  connectionString: string | null;
}

export interface IAzureConfig {
  keyvault: IKeyVaultConfig;
  applicationinsights: IApplicationInsights;
}

export default interface IConfig {
  api: IApiConfig;
  logger: ILoggerConfig;
  azure: IAzureConfig;
}

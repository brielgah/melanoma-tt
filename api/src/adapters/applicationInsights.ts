import * as appInsights from 'applicationinsights';
import config from '../lib/config';

const connString = config.azure.applicationinsights.connectionString;
if (connString == null) {
  throw new Error('config.azure.applicationinsights.connectionString is empty');
}
appInsights
  .setup(connString)
  .setAutoDependencyCorrelation(true)
  .setAutoCollectRequests(true)
  .setAutoCollectPerformance(true, true)
  .setAutoCollectExceptions(true)
  .setAutoCollectDependencies(true)
  .setAutoCollectConsole(true, false)
  .setUseDiskRetryCaching(true)
  .setAutoCollectPreAggregatedMetrics(true)
  .setSendLiveMetrics(true)
  .setAutoCollectHeartbeat(true)
  .setAutoCollectIncomingRequestAzureFunctions(true)
  .setInternalLogging(false, true)
  .setDistributedTracingMode(appInsights.DistributedTracingModes.AI_AND_W3C)
  .enableWebInstrumentation(false)
  .start();

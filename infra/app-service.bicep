param location string = 'eastus'
param projectName string
param environment string = 'prod'
param appServicePlanId string
param storageAccountName string
param applicationInsightsInstrumentationKey string

// App Service for Next.js application
resource appService 'Microsoft.Web/sites@2023-01-01' = {
  name: '${projectName}-${environment}'
  location: location
  kind: 'app,linux'
  identity: {
    type: 'SystemAssigned'
  }
  properties: {
    serverFarmId: appServicePlanId
    siteConfig: {
      linuxFxVersion: 'NODE|18-lts'
      alwaysOn: true
      http20Enabled: true
      minTlsVersion: '1.2'
      numberOfWorkers: 1
      defaultDocuments: []
      appSettings: [
        {
          name: 'WEBSITE_RUN_FROM_PACKAGE'
          value: '1'
        }
        {
          name: 'NODE_ENV'
          value: 'production'
        }
        {
          name: 'PORT'
          value: '3000'
        }
        {
          name: 'APPLICATIONINSIGHTS_CONNECTION_STRING'
          value: 'InstrumentationKey=${applicationInsightsInstrumentationKey}'
        }
        {
          name: 'ApplicationInsightsAgent_EXTENSION_VERSION'
          value: '~3'
        }
      ]
      connectionStrings: []
    }
    httpsOnly: true
    virtualNetworkSubnetId: null
  }
}

// Configure deployment slot for blue-green deployment
resource deploymentSlot 'Microsoft.Web/sites/slots@2023-01-01' = {
  parent: appService
  name: 'staging'
  location: location
  kind: 'app,linux'
  identity: {
    type: 'SystemAssigned'
  }
  properties: {
    serverFarmId: appServicePlanId
    siteConfig: {
      linuxFxVersion: 'NODE|18-lts'
      alwaysOn: true
      appSettings: appService.properties.siteConfig.appSettings
    }
    httpsOnly: true
  }
}

// Configure HTTPS binding and custom domain support
resource appServiceConfig 'Microsoft.Web/sites/config@2023-01-01' = {
  parent: appService
  name: 'web'
  properties: {
    numberOfWorkers: 1
    defaultDocuments: []
    netFrameworkVersion: 'v4.0'
    requestTracingEnabled: false
    remoteDebuggingEnabled: false
    httpLoggingEnabled: true
    detailedErrorLoggingEnabled: true
    publishingUsername: '@${projectName}-${environment}'
    scmType: 'GitHub'
    use32BitWorkerProcess: false
    managedPipelineMode: 'Integrated'
    virtualApplications: [
      {
        virtualPath: '/'
        physicalPath: 'site\\wwwroot'
        preloadEnabled: true
      }
    ]
  }
}

// Outputs
output appServiceUrl string = 'https://${appService.properties.defaultHostName}'
output appServiceName string = appService.name
output principalId string = appService.identity.principalId
output stagingSlotUrl string = 'https://${deploymentSlot.properties.defaultHostName}'

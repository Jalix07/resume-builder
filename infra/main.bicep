targetScope = 'subscription'

param location string = 'eastus'
param projectName string = 'resume-builder'
param environment string = 'prod'
param resourceGroupName string = '${projectName}-${environment}-rg'

// Create resource group
resource resourceGroup 'Microsoft.Resources/resourceGroups@2023-01-01' = {
  name: resourceGroupName
  location: location
}

// App Service Plan (shared for multiple apps to optimize costs)
module appServicePlan 'app-service-plan.bicep' = {
  scope: resourceGroup
  name: 'appServicePlan'
  params: {
    location: location
    projectName: projectName
    environment: environment
  }
}

// Storage Account
module storage 'storage.bicep' = {
  scope: resourceGroup
  name: 'storage'
  params: {
    location: location
    projectName: projectName
    environment: environment
  }
}

// Monitoring
module monitoring 'monitoring.bicep' = {
  scope: resourceGroup
  name: 'monitoring'
  params: {
    location: location
    projectName: projectName
    environment: environment
  }
}

// Key Vault
module keyVault 'keyvault.bicep' = {
  scope: resourceGroup
  name: 'keyVault'
  params: {
    location: location
    projectName: projectName
    environment: environment
  }
}

// App Service
module appService 'app-service.bicep' = {
  scope: resourceGroup
  name: 'appService'
  params: {
    location: location
    projectName: projectName
    environment: environment
    appServicePlanId: appServicePlan.outputs.appServicePlanId
    storageAccountName: storage.outputs.storageAccountName
    applicationInsightsInstrumentationKey: monitoring.outputs.instrumentationKey
  }
}

// Outputs
output resourceGroupName string = resourceGroup.name
output appServiceUrl string = appService.outputs.appServiceUrl
output appServiceName string = appService.outputs.appServiceName
output keyVaultUri string = keyVault.outputs.keyVaultUri

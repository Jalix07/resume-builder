param location string = 'eastus'
param projectName string
param environment string = 'prod'

// App Service Plan for hosting
resource appServicePlan 'Microsoft.Web/serverfarms@2023-01-01' = {
  name: '${projectName}-${environment}-asp'
  location: location
  sku: {
    name: 'B2'
    capacity: 1
  }
  kind: 'linux'
  properties: {
    reserved: true
  }
}

// Outputs
output appServicePlanId string = appServicePlan.id
output appServicePlanName string = appServicePlan.name

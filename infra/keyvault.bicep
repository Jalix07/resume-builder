param location string = 'eastus'
param projectName string
param environment string = 'prod'

// Key Vault for secure secrets management
resource keyVault 'Microsoft.KeyVault/vaults@2023-02-01' = {
  name: '${replace(projectName, '-', '')}${environment}kv'
  location: location
  properties: {
    enabledForDeployment: true
    enabledForTemplateDeployment: true
    enabledForDiskEncryption: false
    tenantId: subscription().tenantId
    sku: {
      name: 'standard'
      family: 'A'
    }
    accessPolicies: []
    publicNetworkAccess: 'Enabled'
  }
}

// Grant access to App Service identity (referenced by principal ID)
resource keyVaultAccessPolicy 'Microsoft.KeyVault/vaults/accessPolicies@2023-02-01' = {
  parent: keyVault
  name: 'add'
  properties: {
    accessPolicies: [
      {
        tenantId: subscription().tenantId
        objectId: 'placeholder-principal-id' // Will be replaced by deployment script
        permissions: {
          secrets: [
            'get'
            'list'
          ]
          keys: []
          certificates: []
        }
      }
    ]
  }
}

// Outputs
output keyVaultId string = keyVault.id
output keyVaultName string = keyVault.name
output keyVaultUri string = keyVault.properties.vaultUri
